export default function makeBankDB({ dbOps, CONFIG }) {
  const { dbOpen, dbWrite, dbRead, dbUpdate, dbDelete } = dbOps;

  var db;

  async function openBankDB() {
    db = await dbOpen(CONFIG.hydra.db);
  }

  async function writeAccount(data) {
    let prop = {
      db: "ethioflix",
      table: "account",
    };

    await dbWrite(db, prop, data);

    return 1;
  }

  async function readAccount(f, doc) {
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
      table: "account",
      filter: filter,
    };

    let p = await dbRead(db, prop);

    return p;
  }

  async function updateAccount(f, data) {
    let filter = {};

    if (f.user_id) {
      filter["user_id"] = f.user_id;
    }

    if (f.account_id) {
      filter["account_id"] = f.account_id;
    }

    let prop = {
      db: "ethioflix",
      table: "account",
      filter: filter,
    };

    await dbUpdate(db, prop, data);

    return 1;
  }

  async function deleteAccount(f) {
    let filter = {};

     if (f.user_id) {
       filter["user_id"] = f.user_id;
     }

     if (f.account_id) {
       filter["account_id"] = f.account_id;
     }

    let prop = {
      db: "ethioflix",
      table: "account",
      filter: filter,
    };

    await dbDelete(db, prop);

    return 1;
  }

  // transaction db ops
  async function writeTransaction(data) {
    let prop = {
      db: "ethioflix",
      table: "transaction",
    };

    await dbWrite(db, prop, data);

    return 1;
  }

  async function readTransaction(f, doc) {
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


    let prop = {
      db: "ethioflix",
      table: "transaction",
      filter: filter,
    };

    let p = await dbRead(db, prop);

    return p;
  }


   return {
     openBankDB,
     writeAccount,
     readAccount,
     updateAccount,
     deleteAccount,
     writeTransaction,
     readTransaction,
   };
}
