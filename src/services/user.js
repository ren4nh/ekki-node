const User = require("../models").User;

module.exports = {
  async updateBalance(transaction, source, destination) {
    const balanceAmount =
      transaction.amount - transaction.amountPayedWithCreditCard;
    const sourceBalance =
      transaction.status === "COMPLETED"
        ? source.balance - balanceAmount
        : source.balance + balanceAmount;
    source = await source.update({ balance: sourceBalance });

    const destinationBalance =
      transaction.status === "COMPLETED"
        ? destination.balance + balanceAmount
        : destination.balance - balanceAmount;
    await destination.update({ balance: destinationBalance });
    return source;
  }
};
