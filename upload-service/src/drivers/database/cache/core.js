import redis_ops from "./drivers/redis";

var cachefs_ops = [];

function cachefs_getOps(driver_name) {
  for (let i = 0; i < cachefs_ops.length; i++) {
    if (cachefs_ops[i].name == driver_name) {
      return cachefs_ops[i];
    }
  }

  return null;
}

export async function cachefs_open(conf) {
  let cfs = cachefs_getOps(conf.name);

  if (!cfs) return 0;

  cfs.fd = await cfs.open(conf);

  return cfs;
}

export async function cachefs_write(cfs, prop) {
  if (!cfs) return 0;

  prop.conn = cfs.fd;
  await cfs.write(prop);

  return 1;
}

export async function cachefs_append(cfs, prop) {
  if (!cfs) return 0;

  prop.conn = cfs.fd;
  await cfs.append(prop);

  return 1;
}

export async function cachefs_remove(cfs, prop) {
  if (!cfs) return 0;

  prop.conn = cfs.fd;
  await cfs.remove(prop);

  return 1;
}

export async function cachefs_persist(cfs, prop) {
  if (!cfs) return 0;

  prop.conn = cfs.fd;
  await cfs.persist(prop);

  return 1;
}

export async function cachefs_read(cfs, prop) {
  if (!cfs) return null;

  /*FIXME*/
  prop.conn = cfs.fd;
  let data = cfs.read(prop);

  return data;
}

export async function cachefs_list(cfs, prop) {
  if (!cfs) return null;

  /*FIXME*/
  prop.conn = cfs.fd;
  let data = cfs.list(prop);

  return data;
}

export async function cachefs_update(cfs, prop) {
  if (!cfs) return 0;

  /*FIXME*/
  prop.conn = cfs.fd;
  await cfs.update(prop);

  return 1;
}

export async function cachefs_del(cfs, prop) {
  if (!cfs) return 0;

  /*FIXME*/
  prop.conn = cfs.fd;

  await cfs.del(prop);

  return 1;
}

export async function cachefs_expire(cfs, prop) {
  if (!cfs) return 0;

  /*FIXME*/
  prop.conn = cfs.fd;
  await cfs.expire(prop);

  return 1;
}

export function cachefs_register(cfs) {
  for (let i = 0; i < cachefs_ops.length; i++) {
    if (cachefs_ops[i].name == cfs.name) {
      return 0;
    }
  }

  cachefs_ops.push(cfs);

  return 1;
}

export function cachefs_unregister(cfs) {
  for (let i = 0; i < cachefs_ops.length; i++) {
    if (cachefs_ops[i].name == cfs.name) {
      cachefs_ops.splice(i, 1);
      return 1;
    }
  }

  return 0;
}

/* loads all drivers */
export async function cachefs_load() {
  cachefs_register(redis_ops);
}

/* unload file drivers */
export async function cachefs_unload() {
  cachefs_unregister(redis_ops);
}
