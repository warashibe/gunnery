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
    const date = this.opt.desc
      ? `r-${253370732400000 - Date.now()}`
      : Date.now()
    return this.type === "u"
      ? null
      : this.type === "g"
      ? await this.node.gput(
          data,
          ...this.keys,
          `${date}:${id}${this.opt.hash ? "#" : ""}`,
          this.opt
        )
      : await this.node.put(
          data,
          ...this.keys,
          `${date}:${id}${this.opt.hash ? "#" : ""}`,
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
    const cond = this.opt.desc
      ? { ".": { ">": `r-${start}`, "<": `r-253370732400000` }, "%": 1000000 }
      : { ".": { ">": start, "<": "253370732400000" }, "%": 1000000 }
    this.type === "g"
      ? await this.node.gmap(...this.keys, cond, this.opt, data =>
          this.parse(data, cb)
        )
      : this.type === ""
      ? await this.node.map(...this.keys, cond, this.opt, data =>
          this.parse(data, cb)
        )
      : await this.node.umap(this.type, ...this.keys, cond, this.opt, data =>
          this.parse(data, cb)
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
    this.me = null
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

  async sget(pub, ...args) {
    const pair = await this.auth_user.pair()
    if (isNil(this.users[pub])) await this._user(pub)
    const key_data = await this.uget(pub, "_share", pair.pub, ...args)
    const dec = await SEA.decrypt(
      key_data,
      await SEA.secret(this.pairs[pub], pair)
    )
    const rawKey = Buffer.from(dec, "hex").buffer
    const key = await window.crypto.subtle.importKey(
      "raw",
      rawKey,
      "AES-GCM",
      true,
      ["encrypt", "decrypt"]
    )
    const data = await this.uget(pub, ...args)
    const iv = Buffer.from(data.iv, "hex").buffer
    const mess = Buffer.from(await SEA.verify(data.data, pub), "hex").buffer
    let tx = new TextDecoder()
    return JSON.parse(tx.decode(await this.decryptMessage(key, iv, mess)))
  }
  async share(pub, ...args) {
    const item = await this.get(...args)
    const key = item.key
    const id = item.id
    const pair = await this.auth_user.pair()
    const msg = await SEA.verify(key, pair.pub)
    const hex = await SEA.decrypt(msg, pair)
    if (isNil(this.users[pub])) await this._user(pub)
    const enc = await SEA.encrypt(
      hex,
      await SEA.secret(this.pairs[pub].epub, pair)
    )
    await this.put(enc, "_share", pub, ...args)
  }

  async getKey() {
    const key = await this.get("_key", { enc: true, sign: true })
    if (isNil(key)) {
      return await this.createKey()
    } else {
      const rawKey = Buffer.from(key, "hex").buffer
      return await window.crypto.subtle.importKey(
        "raw",
        rawKey,
        "AES-GCM",
        true,
        ["encrypt", "decrypt"]
      )
    }
  }

  _buf2hex(buffer) {
    return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")
  }

  async createKey() {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    )
    const result = await window.crypto.subtle.exportKey("raw", key)
    const hex = this._buf2hex(result)
    await this.put(hex, "_key", { enc: true, sign: true })
    return key
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
    return isNil(val)
      ? val
      : await SEA.decrypt(
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
  async decryptMessage(key, iv, ciphertext) {
    return await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      ciphertext
    )
  }

  async _decrypt(data, opt) {
    data = opt.hash ? JSON.parse(data) : data
    if (isNil(data)) return data
    if (opt.aes) {
      const tx = new TextDecoder()
      const pair = await this.auth_user.pair()
      const msg = await SEA.verify(data.key, pair.pub)
      const key = await window.crypto.subtle.importKey(
        "raw",
        Buffer.from(await SEA.decrypt(msg, pair), "hex").buffer,
        "AES-GCM",
        true,
        ["encrypt", "decrypt"]
      )
      const iv = Buffer.from(data.iv, "hex").buffer
      const mess = Buffer.from(await SEA.verify(data.data, pair.pub), "hex")
        .buffer
      const buf = await this.decryptMessage(key, iv, mess)
      data = JSON.parse(tx.decode(await this.decryptMessage(key, iv, mess)))
    }
    if (opt.sign) {
      data = await SEA.verify(data, await this.auth_user.pair())
    }
    let dec = propEq("enc", true)(opt)
      ? await this._dec(data, await this.auth_user.pair().epub)
      : has("enc")(opt)
      ? await this._dec(data, this.pairs[opt.enc].epub)
      : data
    return dec
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

  async genKey() {
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    let key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    )
    return { iv, key }
  }
  getMessageEncoding(mess) {
    const enc = new TextEncoder()
    return enc.encode(mess)
  }

  async encryptMessage(key, iv, mess) {
    return await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      this.getMessageEncoding(mess)
    )
  }

  async _put(node, val, ...args) {
    const [opt, keys] = this._args(args)
    await this._getUser(opt)
    let enc = propEq("enc", true)(opt)
      ? await this._enc(val, await this.auth_user.pair().epub)
      : has("enc")(opt)
      ? await this._enc(val, this.pairs[opt.enc].epub)
      : val
    if (opt.sign) {
      enc = await SEA.sign(enc, await this.auth_user.pair())
    }
    if (opt.aes) {
      const { iv, key } = await this.genKey()
      const enc2 = await this.encryptMessage(key, iv, JSON.stringify(enc))
      const pair = await this.auth_user.pair()
      const _data = await SEA.sign(this._buf2hex(enc2), pair)
      const key_data = await SEA.sign(
        await SEA.encrypt(
          this._buf2hex(await window.crypto.subtle.exportKey("raw", key)),
          pair
        ),
        pair
      )
      enc = {
        data: _data,
        id: last(keys),
        iv: this._buf2hex(iv),
        key: key_data,
      }
    }
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
    this.me = user.is
    this.pairs[user.is.pub] = user.is
    this.users[user.is.pub] = user
    this.auth_user = user
    return user.is.pub
  }
}
