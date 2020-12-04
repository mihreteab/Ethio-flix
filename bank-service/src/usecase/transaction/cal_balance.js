export default function makeCalBalance({ bankDB }) {
  const calculate = (txns) => {
    const net = txns.reduce((prev, curr) => {
      return { amount: prev.amount + curr.amount };
    });

    return net.amount;
  };

  return async function calBalance(user_id, account_id) {
    let txns = await bankDB.readTransaction({ user_id, account_id }, null);

    if (!txns.length) {
      return 0;
    }


    return calculate(txns);
  };
}
