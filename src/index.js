import GUN from "gun"
require("gun/sea")
import {
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

export default class db {
  constructor(opt = {}) {
    this.gun = GUN(opt)
    this.users = {}
    this.pairs = {}
    this.auth_user = null
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
    const isOpt = allPass([
      propSatisfies(isNil, "#"),
      propSatisfies(isNil, "."),
      o(is(Object), last),
    ])
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
      cb(await this._decrypt(data, opt), opt.on ? ev.off : null)
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
    const [opt, keys] = this._args(args)
    return await this._get(this.auth_user, opt, ...keys)
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
    console.log(hash)
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
    const [opt, keys] = this._args(args)
    return await this._put(this.gun, val, opt, ...keys)
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
