export default function makePatchMovie({ movieLogic, assertType }) {
  return async function patchSubscrptn(param) {
    if (!assertType(param.user_id, "user_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let s = await movieLogic.findSubscrptn(param.user_id);

    if (!s) {
      return {
        status: 404,
        result: {
          msg: "Subscrptn Could Not Be Found.",
        },
      };
    }
    console.log(param);

    s = await subLogic.modifySubscrptn(param.user_id);

    return {
      status: 200,
      result: {
        subscrptn: s,
      },
    };
  };
}
