export default class User {
  constructor(user_id, email, password, role, pii, date) {
    this.user_id = user_id;
    this.role = role;
    this.pii = pii;
    this.security = new Security(email, password);
    this.date = date;
  }
}


class Security {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
