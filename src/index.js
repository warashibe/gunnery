import GUN from "gun"
require("gun/sea")
import {
  values,
  mapObjIndexed,
  compose,
  sortBy,
  prop,
  slice,
  propSatisfies,
  allPass,
  mergeLeft,
  defaultTo,
  has,
  propEq,
  o,
  ifElse,
  both,
  always,
  isNil,
  clone,
  assoc,
  is,
  last,
  pathEq,
  when,
  init,
  pathSatisfies,
  complement,
} from "ramda"

export class page {
  constructor(d, type, ...args) {
    this.type = type
    this.node = d
    ;[this.opt, this.keys] = d._args(args)
    this.items = {}
    this.arr = {}
    this.last = null
    this.cursor = 1
    this.isNext = true
  }
  async put(id, data) {
    return this.type === "u"
      ? null
      : this.type === "g"
      ? await this.node.gput(
          data,
          ...this.keys,
          `${Date.now()}:${id}${this.opt.hash ? "#" : ""}`,
          this.opt
        )
      : await this.node.put(
          data,
          ...this.keys,
          `${Date.now()}:${id}${this.opt.hash ? "#" : ""}`,
          this.opt
        )
  }
  async init(limit = 10, to = 1000) {
    return new Promise(async ret => {
      let returned = false
      await this.fetch("0", data => {
        if (!returned && this.items.length >= limit) {
          returned = true
          ret(true)
        }
      })
      setTimeout(() => {
        returned = true
        ret(true)
      }, to)
    })
  }
  parse(data, cb) {
    try {
      const key = data._key
      this.items[key] = data
      this.arr = compose(
        sortBy(prop("_key")),
        values,
        mapObjIndexed((v, key) => assoc("_key", key)(v))
      )(this.items)
      this.last = last(this.arr)._key
      if (is(Function)(cb)) cb(data)
    } catch (e) {
      console.log(e)
    }
  }
  async fetch(start = "0", cb) {
    this.type === "g"
      ? await this.node.gmap(
          ...this.keys,
          { ".": { ">": start || "0" }, "%": 50000 },
          this.opt,
          data => this.parse(data, cb)
        )
      : this.type === ""
      ? await this.node.map(
          ...this.keys,
          { ".": { ">": start || "0" }, "%": 50000 },
          this.opt,
          data => this.parse(data, cb)
        )
      : await this.node.umap(
          this.type,
          ...this.keys,
          { ".": { ">": start || "0" }, "%": 50000 },
          this.opt,
          data => this.parse(data, cb)
        )
  }
  async next(limit = 10, start) {
    start = defaultTo(this.cursor)(start)
    const arr = slice(start - 1, start - 1 + limit)(this.arr)
    this.cursor += arr.length
    this.fetch(this.last)
    this.isNext = !isNil(this.arr[this.cursor - 1])
    return arr
  }
}

export default class db {
  constructor(opt = {}) {
    this.gun = GUN(opt)
    this.users = {}
    this.pairs = {}
    this.auth_user = null
  }
  upage(pub, ...args) {
    return new page(this, pub, ...args)
  }
  gpage(...args) {
    return new page(this, "g", ...args)
  }
  page(...args) {
    return new page(this, "", ...args)
  }
  async _user(pub) {
    const user = this.gun.user(pub)
    await new Promise(ret => {
      user.once(async _user => {
        this.pairs[pub] = _user
        ret(_user)
      })
    })
    this.users[pub] = user
    return pub
  }

  async _getUser(opt) {
    if (
      both(has("enc"), complement(propEq)("enc", true))(opt) &&
      isNil(this.users[opt.enc.pub])
    ) {
      await this._user(opt.enc)
    }
  }

  node(node, ...keys) {
    for (let v of keys) node = node.get(v)
    return node
  }

  async _enc(val, epub, pair) {
    return {
      data: await SEA.encrypt(
        val,
        await SEA.secret(epub, defaultTo(await this.auth_user.pair())(pair))
      ),
    }
  }

  async _dec(val, epub, pair) {
    return await SEA.decrypt(
      val.data,
      await SEA.secret(epub, defaultTo(await this.auth_user.pair())(pair))
    )
  }

  _args(args) {
    const isOpt = o(
      allPass([
        propSatisfies(isNil, "#"),
        propSatisfies(isNil, "."),
        is(Object),
      ]),
      last
    )
    const opt = ifElse(isOpt, last, always({}))(args)
    const keys = when(isOpt, init)(args)
    return [opt, keys]
  }

  _onargs(args) {
    const cb = ifElse(
      o(is(Function), last),
      last,
      always(() => {})
    )(args)
    const _args = when(o(is(Function), last), init)(args)
    const [opt, keys] = this._args(_args)
    return [opt, cb, keys]
  }

  async gon(...args) {
    return await this._on({}, this.gun, ...args)
  }

  async gmap(...args) {
    return await this._on({ map: true }, this.gun, ...args)
  }

  async gmapon(...args) {
    return await this._on({ map: true, on: true }, this.gun, ...args)
  }

  async uon(pub, ...args) {
    if (isNil(this.users[pub])) await this._user(pub)
    return await this._on({}, this.users[pub], ...args)
  }

  async umap(pub, ...args) {
    console.log(pub)
    if (isNil(this.users[pub])) await this._user(pub)
    return await this._on({ map: true }, this.users[pub], ...args)
  }

  async umapon(pub, ...args) {
    if (isNil(this.users[pub])) await this._user(pub)
    return await this._on({ map: true, on: true }, this.users[pub], ...args)
  }

  async on(...args) {
    return await this._on({ on: true }, this.auth_user, ...args)
  }

  async map(...args) {
    return await this._on({ map: true }, this.auth_user, ...args)
  }

  async mapon(...args) {
    return await this._on({ map: true, on: true }, this.auth_user, ...args)
  }

  async _get(node, ...args) {
    const [opt, keys] = this._args(args)
    await this._getUser(opt)
    return new Promise(async ret => {
      this.node(node, ...keys).once(async data => {
        ret(await this._decrypt(data, opt))
      })
    })
  }

  async _decrypt(data, opt) {
    data = opt.hash ? JSON.parse(data) : data
    return propEq("enc", true)(opt)
      ? await this._dec(data, await this.auth_user.pair().epub)
      : has("enc")(opt)
      ? await this._dec(data, this.pairs[opt.enc].epub)
      : data
  }
  async _on(conf, node, ...args) {
    let [opt, cb, keys] = this._onargs(args)
    opt = mergeLeft(conf)(opt)
    await this._getUser(opt)
    let _node = this.node(node, ...keys)
    if (opt.map) _node = _node.map()
    _node[opt.on ? "on" : "once"](async (data, key, msg, ev) => {
      cb(
        mergeLeft({ _key: key }, await this._decrypt(data, opt)),
        opt.on ? ev.off : null
      )
    })
  }

  async gget(...args) {
    return await this._get(this.gun, ...args)
  }

  async uget(pub, ...args) {
    if (isNil(this.users[pub])) await this._user(pub)
    return await this._get(this.users[pub], ...args)
  }

  async get(...args) {
    return await this._get(this.auth_user, ...args)
  }

  async _put(node, val, ...args) {
    const [opt, keys] = this._args(args)
    await this._getUser(opt)
    let enc = propEq("enc", true)(opt)
      ? await this._enc(val, await this.auth_user.pair().epub)
      : has("enc")(opt)
      ? await this._enc(val, this.pairs[opt.enc].epub)
      : val
    const hash = opt.hash
      ? await SEA.work(JSON.stringify(enc), null, null, { name: "SHA-256" })
      : enc
    if (opt.hash) {
      keys[keys.length - 1] += hash
      enc = JSON.stringify(enc)
    }
    return new Promise(async ret => {
      this.node(node, ...keys).put(enc, data => ret(data))
    })
  }

  async put(val, ...args) {
    return await this._put(this.auth_user, val, ...args)
  }

  async gput(val, ...args) {
    return await this._put(this.gun, val, ...args)
  }

  async auth(alias, pass) {
    const user = this.gun.user()
    await new Promise((ret, rej) => {
      user.create(alias, pass, async ack => {
        if (!isNil(ack.err)) {
          user.auth(alias, pass, async ack => {
            if (!isNil(ack.err)) {
              rej(null)
            } else {
              ret(true)
            }
          })
        } else {
          ret(true)
        }
      })
    })
    this.pairs[user.is.pub] = user.is
    this.users[user.is.pub] = user
    this.auth_user = user
    return user.is.pub
  }
}
