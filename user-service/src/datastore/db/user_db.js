export default function makeMovieDB({ dbOps, CONFIG }) {
  const { dbOpen, dbWrite, dbRead, dbUpdate, dbDelete } = dbOps;

  var db;

  async function openUserDB() {
    db = await dbOpen(CONFIG.hydra.db);
  }

  // user db ops

  async function writeUser(data) {
    let prop = {
      db: "ethioflix",
      table: "user",
    };

    await dbWrite(db, prop, data);

    return 1;
  }

  async function readUser(f, doc) {
    let ret,
      filter = {};

    if (!f) {
      f = {};
    }

    if (f.user_id) {
      filter["user_id"] = f.user_id;
    }

    if (f.username) {
      filter["security"] = {
        username: f.username,
      };
    }

    if (f.email) {
      filter["security"] = {
        email: f.email,
      };
    }

    let prop = {
      db: "ethioflix",
      table: "user",
      filter: filter,
    };

    let p = await dbRead(db, prop);

    return p;
  }

  async function updateUser(f, d, field) {
    let data;
    let filter = {};

    if (f.user_id) {
      filter["user_id"] = f.user_id;
    }

    let prop = {
      db: "ethioflix",
      table: "user",
      filter: filter,
    };

    switch (field) {
      case "pii":
        data = { pii: d };
        break;
      case "token":
        data = { token: d };
        break;
      case "security":
        data = { security: { password: d } };
        break;
      default:
        data = d;
        break;
    }

    await dbUpdate(db, prop, data);

    return 1;
  }

  async function deleteUser(f) {
    let filter = {};

    if (f.mid) {
      filter["user_id"] = f.user_id;
    }

    let prop = {
      db: "ethioflix",
      table: "user",
      filter: filter,
    };

    await dbDelete(db, prop);

    return 1;
  }

  return {
    openUserDB,
    writeUser,
    readUser,
    updateUser,
    deleteUser,
  };
}
