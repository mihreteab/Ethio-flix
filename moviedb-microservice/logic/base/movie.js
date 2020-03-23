import Movie from "../../file-system/models/movie";
import { generateId } from "../../tools/utils";

export async function readMovie(mid) {
  let r;
  r = Movie.fetchMovie(mid);
  if(r.length){
    return 0;
  }

  return r;
}

export async function writeMovie({title, genre, url, producer}) {
  let r;
  const movieData = {
    title: title,
    mid: generateId(10, "numeric"),
    genre: genre,
    location: url,
    producer: producer
  };

  const movie = new Movie(movieData);
  r = await movie.save();
  if(!r){
    return 0;
  }

  return r;
}

