export default class Playlist {
  constructor(user_id, movie, pid, date) {
    this.user_id = user_id;
    this.pid = pid;
    this.movies = [ movie ];
    this.date = date;
  }
}
