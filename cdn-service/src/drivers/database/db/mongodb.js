import { getQuery } from "../../../tools/utils";
import { isArray } from "../../../tools/utils";

var m = require("mongodb").MongoClient;

var url = "";

async function open(conf) {
  url = `mongodb://${conf.host}:${conf.port}/`;
  let conn;
  conn = await m.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return conn;
}

async function setupDB(prop) {
  let p = {
    conn: prop.conn,
    db: prop.db,
  };

  await createDB(p);

  for (let i = 0; i < prop.tables.length; i++) {
    let p = {
      conn: prop.conn,
      db: prop.db,
      table: prop.tables[i],
    };

    await createTable(p);
  }
}

async function cleanDB(prop) {
  let p = {
    conn: prop.conn,
    db: prop.db,
  };

  await deleteDB(p);
}

async function createDB(prop) {
  try {
    await m.connect(url + prop.db, { useNewUrlParser: true });
    console.log(`[DB]  created ${prop.db}`);
  } catch (e) {
    console.log(`[DB] couldn't create ${prop.db}`);
  }
}

async function createTable(prop) {
  try {
    await prop.conn.db(prop.db).createCollection(prop.table);
    console.log(`[DB] created ${prop.db}, ${prop.table}`);
  } catch (e) {
    console.log(`[DB] couldn't create ${prop.db}, ${prop.table}`);
  }
}

/*
  prop.index  is as string representing attribute over which a table gets indexed.
  If an attribute is a nested one, we need to concatinate the keys. E.g. "pii.name".
*/
async function createIndex(prop) {
  try {
    await prop.conn
      .db(prop.db)
      .collection(prop.table)
      .createIndex({ [prop.index]: 1 });

    console.log(
      "[fs] created an index %s for /%s/%s",
      prop.index,
      prop.db,
      prop.table
    );
  } catch (e) {
    console.log("couldn't create index!");
  }
}

async function deleteDB(prop) {
  await prop.conn.db(prop.db).dropDatabase();

  console.log(`[DB] deleted ${prop.db}`);
}

async function write(prop, data) {
  let a = data;

  if (!isArray(data)) a = [data];

  let response = prop.conn.db(prop.db).collection(prop.table).insertMany(a);
  return response;
}

async function readOne(prop) {
  let response;
  let query = getQuery(prop.filter);

  response = await prop.conn
    .db(prop.db)
    .collection(prop.table)
    .find(query)
    .limit(1)
    .toArray();
  return response;
}

async function read(prop) {
  let response;
  let query = getQuery(prop.filter);

  if (prop.pagin) {
    let skip = prop.pagin.size * (prop.pagin.page - 1);
    let limit = prop.pagin.size;
    let order_type =
      prop.pagin.order_type && prop.pagin.order_type === "desc" ? -1 : 1;

    response = await prop.conn
      .db(prop.db)
      .collection(prop.table)
      .find(query)
      .sort({ [prop.pagin.index]: order_type })
      .skip(skip)
      .limit(limit)
      .toArray();
  } else {
    response = await prop.conn
      .db(prop.db)
      .collection(prop.table)
      .find(query)
      .toArray();
  }
  return response;
}

async function update(prop, data) {
  let query = getQuery(prop.filter);

  let response = await prop.conn
    .db(prop.db)
    .collection(prop.table)
    .updateOne(query, { $set: data });

  return response;
}

async function replace(prop, data) {
  data["id"] = prop.id;
  let response = await prop.conn
    .db(prop.db)
    .collection(prop.table)
    .updateOne({ _id: prop.id }, { $set: data }, true);

  return response;
}

async function del(prop) {
  let query = getQuery(prop.filter);

  let response = await prop.conn
    .db(prop.db)
    .collection(prop.table)
    .remove(query);

  return response;
}

async function watch(prop, _callback) {
  const change_stream = await prop.conn
    .db(prop.db)
    .collection(prop.table)
    .watch();

  /*FIXME: mongodb ver 3.6 and older required creating mongo db replica to use change stream*/

  change_stream.on("change", function (new_val) {
    _callback(new_val);
  });
}

const mongodbWrapper = {
  name: "mongodb",
  open: open,
  setupDB: setupDB,
  cleanDB: cleanDB,
  write: write,
  readOne: readOne,
  read: read,
  update: update,
  replace: replace,
  del: del,
  watch: watch,
  //
  createDB: createDB,
  deleteDB: deleteDB,
  createTable: createTable,
  createIndex: createIndex,
  //
  conn: null,
};

export default mongodbWrapper;
