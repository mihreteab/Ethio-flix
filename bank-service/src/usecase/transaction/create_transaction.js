export default function makeCreateTransaction({ bankDB, Transaction, generateId, moment }) {
  return async function createTransaction(user_id, account_id, transaction) {
    let transaction_id = generateId(12);
    let date = moment().unix();
    
    let txn = new Transaction(user_id, transaction_id, account_id, transaction, date);

    await bankDB.writeTransaction(txn);

    return txn;
  }
}