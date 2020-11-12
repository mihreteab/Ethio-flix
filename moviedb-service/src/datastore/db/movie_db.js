export default function makeMovieDB({ dbOps, CONFIG }) {
  const { dbOpen, dbWrite, dbRead, dbUpdate, dbDelete } = dbOps;

  var db;

  async function openMovieDB() {
    db = await dbOpen(CONFIG.hydra.db);
  }

  async function writeMovie(data) {
    let prop = {
      db: "ethioflix",
      table: "movie",
    };

    await dbWrite(db, prop, data);

    return 1;
  }

  async function readMovie(f, doc) {
    let ret,
      filter = {};

    if (!f) {
      f = {};
    }

    if (f.mid) {
      filter["mid"] = f.mid;
    }

    let prop = {
      db: "ethioflix",
      table: "movie",
      filter: filter,
    };

    let p = await dbRead(db, prop);

    return p;
  }

  async function updateMovie(f, data) {
    let filter = {};

    if (f.mid) {
      filter["mid"] = f.mid;
    }

    let prop = {
      db: "ethioflix",
      table: "movie",
      filter: filter,
    };

    await dbUpdate(db, prop, data);

    return 1;
  }

  async function deleteMovie(f) {
    let filter = {};

    if (f.mid) {
      filter["mid"] = f.mid;
    }

    let prop = {
      db: "ethioflix",
      table: "movie",
      filter: filter,
    };

    await dbDelete(db, prop);

    return 1;
  }

   return {
     openMovieDB,
     writeMovie,
     readMovie,
     updateMovie,
     deleteMovie,
   };
}
