export default class Movie {
  constructor(user_id, md, mid, date) {
    this.user_id = user_id;
    this.md = md;
    this.mid = mid;
    this.date = date;
  }
  stream_ready = false;
}
