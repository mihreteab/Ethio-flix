export default function makePostSubscrptn({ subLogic, assertType }) {
  return async function postSubscrptn(param) {
    if (!assertType(param.scheme, "scheme")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let s = await subLogic.createSubscrptn(param.user_id, param.scheme);

    if (!s) {
      return {
        status: 500,
        result: {
          msg: "Failed To Save Subscrptn Data.",
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
