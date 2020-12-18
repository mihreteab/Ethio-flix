export default function makeCreateSubscrptn({ subDB, Subscrptn, generateId, moment }) {
  return async function createSubscrptn(user_id, scheme) {
    let sid = generateId(12);
    let date = moment().unix();

    let s = new Subscrptn(user_id, scheme, date);

    await subDB.writeSubscrptn(s);

    return s;
  }
}
