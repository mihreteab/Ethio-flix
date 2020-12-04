export default function makeRemoveAccount({ bankDB }) {
  return async function removeAccount(account_id) {
    let a = await bankDB.readAccount({ account_id: account_id }, null);

    if (a.length != 1) {
      return 0;
    }

    await bankDB.deleteAccount({ account_id: account_id });

    return a[0];
  };
}
