const MongoClient = require('mongodb').MongoClient;
const { mongo } = require("./config/config.json");
var db_conn;

export function db_open() {
  const conn_str = `mongodb://${mongo.addr}:${mongo.port}/${mongo.db_name}`
  MongoClient.connect(conn_str, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
      db_conn = db;
  })
}

export const db = db_conn;

