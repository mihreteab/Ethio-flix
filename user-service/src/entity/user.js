export default class User {
  constructor(user_id, email, username, password, role, pii, date) {
    this.user_id = user_id;
    this.role = role;
    this.pii = pii;
    this.security = new Security(username, email, password);
    this.date = date;
  }
}


class Security {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
