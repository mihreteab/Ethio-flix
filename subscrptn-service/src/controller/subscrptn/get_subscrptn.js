export default function makeGetSubscrptn({ subLogic, assertType }) {
  return async function getSubscrptn(param) {
    if (!assertType(param.user_id, "user_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let s = await subLogic.findSubscrptn(param.user_id);

    if (!s) {
      return {
        status: 404,
        result: {
          msg: "Subscrptn Couldn't Be Found.",
        },
      };
    }

    return {
      status: 200,
      result: {
        subscrptn: s,
      },
    };
  };
}
