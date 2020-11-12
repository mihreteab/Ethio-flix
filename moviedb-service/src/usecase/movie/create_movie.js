export default function makeCreateMovie({ movieDB, Movie, generateId, moment }) {
  return async function createMovie(user_id, md) {
    let mid = generateId(8);
    let date = moment().unix();
    
    let movie = new Movie(user_id, md, mid, date);

    let m = await movieDB.readMovie({ mid: movie.mid });
    if (m.length) {
      return null;
    }

    await movieDB.writeMovie(movie);

    return movie;
  }
}