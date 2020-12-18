export default function makeSubDB({ dbOps, CONFIG }) {
  const { dbOpen, dbWrite, dbRead, dbUpdate, dbDelete } = dbOps;

  var db;

  async function openSubDB() {
    db = await dbOpen(CONFIG.hydra.db);
  }

  async function writeSubscrptn(data) {
    let prop = {
      db: "ethioflix",
      table: "subscrptn",
    };

    await dbWrite(db, prop, data);

    return 1;
  }

  async function readSubscrptn(f, doc) {
    let ret,
      filter = {};

    if (!f) {
      f = {};
    }

    if (f.user_id) {
      filter["user_id"] = f.user_id;
    }

    if (f.account_id) {
      filter["account_id"] = f.account_id;
    }

    if (f.type) {
      filter["type"] = f.type;
    }

    let prop = {
      db: "ethioflix",
      table: "subscrptn",
      filter: filter,
    };

    let p = await dbRead(db, prop);

    return p;
  }

  async function updateSubscrptn(f, data) {
    let filter = {};

    if (f.user_id) {
      filter["user_id"] = f.user_id;
    }

    if (f.account_id) {
      filter["account_id"] = f.account_id;
    }

    let prop = {
      db: "ethioflix",
      table: "subscrptn",
      filter: filter,
    };

    await dbUpdate(db, prop, data);

    return 1;
  }

  async function deleteSubscrptn(f) {
    let filter = {};

     if (f.user_id) {
       filter["user_id"] = f.user_id;
     }

     if (f.account_id) {
       filter["account_id"] = f.account_id;
     }

    let prop = {
      db: "ethioflix",
      table: "subscrptn",
      filter: filter,
    };

    await dbDelete(db, prop);

    return 1;
  }




   return {
     openSubDB,
     writeSubscrptn,
     readSubscrptn,
     updateSubscrptn,
     deleteSubscrptn,
   };
}
