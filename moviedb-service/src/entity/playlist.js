export default class Playlist {
  constructor(user_id, name, movie, pid, date) {
    this.user_id = user_id;
    this.pid = pid;
    this.name = name;
    this.movies = [ movie ];
    this.date = date;
  }
}
