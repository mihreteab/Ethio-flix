export default function makeModifySubscrptn({ subDB, moment }) {
  return async function modifySubscrptn(user_id) {
    let s = await subDB.readSubscrptn({ user_id }, null);

    if (s.length != 1) {
      return 0;
    }

    s[0].date = moment().unix();

    await subDB.updateSubscrptn({ user_id }, s[0]);

    return s;
  };
}
