const redis = require("ioredis");

function open() {
  let conn = new redis(); //default port 6379

  return conn;
}

async function read(prop) {
  const response = await JSON.parse(await prop.conn.get(prop.key));

  //console.log(response);
  return response;
}

async function write(prop) {
  //console.log(prop);

  await prop.conn.set(prop.key, JSON.stringify(prop.value));

  return 1;
}

async function append(prop) {
  //console.log(prop);

  await prop.conn.rpush(prop.key, JSON.stringify(prop.value));

  return 1;
}

async function list(prop) {
  //console.log(prop);

  let response = await prop.conn.lrange(prop.key, 0, -1);

  return response;
}

async function remove(prop) {
  //console.log(prop);

  await prop.conn.lrem(prop.key, 0, JSON.stringify(prop.value));

  return 1;
}
// persist data
async function persist(prop) {
  await prop.conn.persist(prop.key);
  return 1;
}

async function update(prop) {
  await prop.conn.set(prop.key, JSON.stringify(prop.value));

  return 1;
}

async function del(prop) {
  await prop.conn.del(prop.key);

  return 1;
}

async function expire(prop) {
  await prop.conn.expireat(
    prop.key,
    parseInt(+new Date() / 1000) + prop.exp_after
  );

  return 1;
}

const redis_ops = {
  name: "redis",
  open: open,
  read: read,
  list: list,
  write: write,
  append: append,
  remove: remove,
  del: del,
  update: update,
  persist: persist,
  //
  expire: expire,
  //
  fd: null,
};

export default redis_ops;
