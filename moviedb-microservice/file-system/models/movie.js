import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  mid: String,
  title: String,
  genre: String,
  location: String,
  producer: String
});

movieSchema.statics.fetchMovie = async function (mid) {
  const r = await this.findOne({
    mid: mid
  });

  return r;
}





const Movie = mongoose.model("movie", movieSchema);

export default Movie;