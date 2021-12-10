# Gunnery.js

Gunnery.js makes [GUN](https://gun.eco) easier to use. It is still under heavy construction.

## Installation

```bash
yarn add gunnery
```

## Quick Example

```js
import gunnery from "gunnery"

const db = new gunnery({ peers: ["http://localhost:8765/gun"] })

// only one authenticated user per instance is possible
const pub = await db.auth("alias", "password")

// but you can use multiple instances at the same time
const db2 = new gunnery({ peers: ["http://localhost:8765/gun"] })
const pub2 = await db2.auth("alias2", "password2")

const data = { example: 1 }

// save data to authenticated user
await db.put(data, "key1", "key2")
const my_data = await db.get("key1", "key2")

// get data from non-authenticated user with a public key (u of uget = user)
const user_data = await db.uget(pub2, "key1", "key2")

// save data to a public path (g of gget = global)
await db.gput(data, "key1", "key2")
const public_data = await db.gget("key1", "key2")

// encrypt the data so only the currently authenticated user can read
await db.put(data, "key1", "key2", {enc: true})
const enc_data = await db.get("key1", "key2", {enc: true})

// encrypt the data so only a specified user can read
await db.gput(data, "key1", "key2", {enc: pub2})
const enc_data2 = await db2.gget("key1", "key2", {enc: pub})

// save frozen data with hash, hash will be appended to the last key
await db.gput(data, "#", "", {hash: true})
await db.gput(data, "#inbox", "2021/August#", {hash: true})

// map child nodes
await db.map("key1",(data)=>{
  console.log(data)
})

// listen to data changes
await db.on("key1","key2", (data)=>{
  console.log(data)
})

// pagination
const page = await db.page("key1")
await page.put("key2", data)
const p1 = await page.next()
const p2 = await page.next()
const p3 = await page.next()

```

## API

### arguments

#### pub

A public key of a non-authenticated user. There is no writing (`uput`) to other users' nodes.

```js
const data = await db.uget(pub, "key1", "key2")
```

#### opt* (optional)

Most functions take an optional `opt` object.

##### `enc`
- `true` encrypt the data so only the currently authenticated user can read
- *`public key`* encrypt the data so only the specified user can read

##### `sign`
- `true` sign the data, so the data owner can be verified later

##### `aec`
- `true` encrypt the data with AEC-GCM key

##### `hash`
- `true` freeze the data with hash, this option has to be used with `#` in the keys

You can freeze encrypted data by setting both options `true`.

```js
// save frozen data only you can read.
// the last key is empty but the hash will be appended here, so you still need it.
await db.gput(data, "#", "", { enc: true, hash: true })
```

#### cb* (optional)

In case of `on` functions, `cb` (callback function to receive the data) also receives a `off` function to remove the listener. This appies to `on` `gon` `uon` `mapon` `gmapon` `umapon`.

```js
await db.on("key1", "key2", (data, off)=>{ console.log(data) })
```

#### path

`path` can be any length (depth).

```js
await db.get("key1", "key2", "key3", "key4", opt })
```

##### `desc`
- `true` save data in reverse order, only applicable to page instances.

### Authentication

#### auth (alias, password)

There can be only one authenticated user per instance, but you can use multiple instances at the same time.
```js
const pub = await db.auth("alias", "password")
```

### Write Operations

#### put (data, opt*, ...path)

Put data to the authenticated user.
```js
await db.put(data, "key1", "key2")
```

#### gput (data, opt*, ...path)

Put data to public.
```js
await db.gput(data, "key1", "key2")
```

#### share (pub, ...path)

Share encrypted data with another user with `pub`.
```js
await db.share(pub, "key1", "key2")
```

### Single Node Read Operations

#### get (opt*, ...path)

Get data stored to the authenticated user.
```js
const data = await db.get("key1", "key2")
```

#### uget (pub , opt*, ...path)

Get data stored to a specified user.
```js
const data = await db.uget(pub, "key1", "key2")
```

#### gget (opt*, ...path)

Get public data.
```js
const data = await db.gget("key1", "key2")
```

#### sget (pub, ...path)

Get shared data. `pub` is the user who shared the data with you.
```js
const data = await db.sget(pub, "key1", "key2")
```

#### on (opt*, cb* ...path)

Get and listen to changes of data stored to the authenticated user.
```js
await db.on("key1", "key2", (data, off)=>{ console.log(data) })
```

#### uon (pub, opt*, cb* ...path)

Get and listen to changes of data stored to a specified user.
```js
await db.uon(pub, "key1", "key2", (data, off)=>{ console.log(data) })
```

#### gon (opt*, cb* ...path)

Get and listen to changes of public data.
```js
await db.gon("key1", "key2", (data, off)=>{ console.log(data) })
```

### Child Nodes Map Read Operations

#### map (opt*, cb* ...path)

Map child nodes stored to the currently authenticated user.
```js
await db.map("list", (data)=>{ console.log(data) })
```

#### umap (pub, opt*, cb* ...path)

Map child nodes stored to a specified user.
```js
await db.umap("list", (data)=>{ console.log(data) })
```

#### gmap (opt*, cb* ...path)

Map public child nodes.
```js
await db.umap("list", (data)=>{ console.log(data) })
```

#### mapon (opt*, cb* ...path)

Map and listen to changes of child nodes stored to the currently authenticated user.
```js
await db.mapon("list", (data, off)=>{ console.log(data) })
```

#### umapon (pub, opt*, cb* ...path)

Map and listen to changes of child nodes stored to a specified user.
```js
await db.umapon(pub, "list", (data, off)=>{ console.log(data) })
```

#### gmapon (opt*, cb* ...path)

Map and listen to changes of public child nodes.
```js
await db.gmapon("list", (data, off)=>{ console.log(data) })
```
### pagination

Pagination is hard with graph database, but gunnery makes it simple.

### page (...path)

### upage (pub, ...path)

### gpage (...path)

```js
const page = await db.page("articles")
await page.init()
const page.put(data)
const page1 = await page.next()
const page2 = await page.next()

// listen for new items (only effective with { desc: true })
page.on((data)=> console.log("new item", data))
```
