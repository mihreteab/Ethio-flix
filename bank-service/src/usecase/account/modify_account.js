export default function makeModifyAccount({ bankDB }) {
  return async function modifyAccount(account_id, ad) {
    let a = await bankDB.readAccount({ account_id: account_id }, null);

    if (a.length != 1) {
      return 0;
    }

    a[0].ad = ad;

    await bankDB.updateAccount({ account_id: account_id }, a[0]);

    return a;
  };
}
