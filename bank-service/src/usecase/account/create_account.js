export default function makeCreateAccount({ bankDB, Account, generateId, moment }) {
  return async function createAccount(user_id, scheme) {
    let account_id = generateId(12);
    let date = moment().unix();
    
    let account = new Account(user_id, account_id, date);

    let a = await bankDB.readAccount({ account_id: account.account_id });
    if (a.length) {
      return null;
    }

    await bankDB.writeAccount(account);

    return account;
  }
}