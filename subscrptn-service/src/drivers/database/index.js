import mongodbWrapper from "./db/mongodb";

var dbOps = [];

function getDbOps(driverName) {
  for (let i = 0; i < dbOps.length; i++) {
    if (dbOps[i].name == driverName) {
      return dbOps[i];
    }
  }

  return null;
}

/*
 * ARCH
 */
export async function dbOpen(dbConf) {
  let db = getDbOps(dbConf.name);
  if (!db) {
    return 0;
  }
  db.conn = await db.open(dbConf);
  return db;
}

export async function dbSetup(db, prop) {
  if (!db) {
    return 0;
  }
  prop.conn = db.conn;
  await db.setupDB(prop);
  return 1;
}

export async function dbClean(db, prop) {
  if (!db) {
    return 0;
  }

  prop.conn = db.conn;
  await db.rmfs(prop);

  return 1;
}

export async function dbWrite(db, prop, data) {
  if (!db) {
    return 0;
  }
  /*FIXME*/
  prop.conn = db.conn;
  let r = await db.write(prop, data);

  return r;
}

export async function dbRead(db, prop) {
  if (!db) {
    return null;
  }
  /*FIXME*/
  prop.conn = db.conn;
  let data = db.read(prop);

  return data;
}

export async function dbUpdate(db, prop, data) {
  if (!db) {
    return 0;
  }

  /*FIXME*/
  prop.conn = db.conn;
  let r = await db.update(prop, data);

  return r;
}

export async function dbReplace(db, prop, data) {
  if (!db) {
    return 0;
  }
  /*FIXME*/
  prop.conn = db.conn;
  let r = await db.replace(prop, data);

  return r;
}

export async function dbDelete(db, prop) {
  if (!db) {
    return 0;
  }

  /*FIXME*/
  prop.conn = db.conn;

  let r = await db.del(prop);
  console.log(r);
  return r;
}

export async function dbWatch(db, prop, _ucallback) {
  if (!db) {
    return 0;
  }

  /*FIXME*/
  prop.conn = db.conn;
  await db.watch(prop, _ucallback);

  return 1;
}

export async function dbCreateDB(db, prop) {
  if (!db) {
    return 0;
  }

  /*FIXME*/
  prop.conn = db.conn;
  await db.createDB(prop);

  return 1;
}

export async function dbDeleteDB(db, prop) {
  if (!db) {
    return 0;
  }

  /*FIXME*/
  prop.conn = db.conn;
  await db.deleteDB(prop);

  return 1;
}

export async function dbCreateTable(db, prop) {
  if (!db) {
    return 0;
  }

  /*FIXME*/
  prop.conn = db.conn;
  await db.createTable(prop);

  return 1;
}

export async function dbCreateIndex(db, prop) {
  if (!db) {
    return 0;
  }

  /*FIXME*/
  prop.conn = db.conn;
  await db.createIndex(prop);
}

export function dbRegisterDriver(db) {
  for (let i = 0; i < dbOps.length; i++) {
    if (dbOps[i].name == db.name) {
      return 0;
    }
  }

  dbOps.push(db);

  return 1;
}

export function dbUnregisterDriver(db) {
  for (let i = 0; i < fs_ops.length; i++) {
    if (dbOps[i].name == db.name) {
      dbOps.splice(i, 1);
      return 1;
    }
  }

  return 0;
}

/* loads all drivers */
export async function dbLoad() {
  dbRegisterDriver(mongodbWrapper);
}

/* unload file drivers */
export async function dbUnload() {
  dbUnregisterDriver(mongodbWrapper);
}

export default {
  dbOpen,
  dbRead,
  dbWrite,
  dbDelete,
  dbUpdate,
  dbReplace,
};
