export default class Transaction {
  constructor(user_id, transaction_id, account_id, transaction, date) {
    this.user_id = user_id;
    this.transaction_id = transaction_id;
    this.account_id = account_id;
    this.type = transaction.type;
    this.amount = transaction.amount;
    this.date = date;
  }
}
