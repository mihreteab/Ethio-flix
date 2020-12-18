export default function makeFindSubscrptn({ subDB, moment }) {
  return async function findSubscrptn(user_id) {
    let s = await subDB.readSubscrptn({ user_id }, null);

    if (!s.length) {
      return 0;
    }

    return s;
  };
}
