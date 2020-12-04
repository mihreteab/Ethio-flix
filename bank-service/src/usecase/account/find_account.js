export default function makeFindAccount({ bankDB }) {
  return async function findAccount(account_id) {
    let a = await bankDB.readAccount({ account_id: account_id }, null);

    if (!a.length) {
      return 0;
    }

    return a[0];
  };
}
