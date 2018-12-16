const Transaction = require("../models").Transaction;
const CreditCard = require("../models").CreditCard;
const User = require("../models").User;
const moment = require("moment");
const Op = require("sequelize").Op;
const UserService = require("../services/user");

module.exports = {
  async findByUser(req, res) {
    try {
      const { user } = req;

      const transactions = await Transaction.findAll({
        where: {
          [Op.or]: [
            { UserId: user.get("id") },
            { DestinationId: user.get("id") }
          ]
        },
        include: [{ all: true }],
        order: [["createdAt", "DESC"]]
      });

      res.json({ data: transactions });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao carregar as transações" });
    }
  },
  async save(req, res) {
    try {
      const { user } = req;
      const { destination, amount, creditCard } = req.body;
      if (destination === user.get("email")) {
        return res
          .status(400)
          .send({ message: "Não é possivel transferir para si mesmo" });
      }
      if (user.get("balance") < amount && !creditCard) {
        return res.status(400).send({
          message: "Saldo insuficiente, cartão de crédito deve ser informado"
        });
      }

      const favorite = await User.findOne({ where: { email: destination } });
      if (!favorite) {
        return res.status(400).send({ message: "Favorecido não encontrado" });
      }
      const oldTransaction = await Transaction.findOne({
        where: {
          DestinationId: favorite.get("id"),
          UserId: user.get("id"),
          amount: amount,
          createdAt: {
            [Op.between]: [
              moment()
                .subtract("2", "minutes")
                .toDate(),
              moment().toDate()
            ]
          }
        }
      });
      let transaction = {
        DestinationId: favorite.get("id"),
        UserId: user.get("id"),
        amount: amount,
        status: "COMPLETED",
        description: "Transferencia",
        amountPayedWithCreditCard: 0
      };
      if (oldTransaction) {
        await oldTransaction.update({ status: "CANCELED" });
        await UserService.updateBalance(oldTransaction, user, favorite);
      }
      if (creditCard) {
        const myCreditCard = await CreditCard.findByPk(creditCard);
        if (!myCreditCard) {
          return res
            .status(400)
            .send({ message: "Cartão de crédito não encontrado" });
        }
        const amountPayedWithCreditCard = amount - user.get("balance");
        transaction = {
          ...transaction,
          amountPayedWithCreditCard: amountPayedWithCreditCard,
          description: "Pago com o cartão" + myCreditCard.get("description")
        };
      }
      await Transaction.create(transaction);

      const source = await UserService.updateBalance(
        transaction,
        user,
        favorite
      );

      res.json({ data: source });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao salvar, tente novamente" });
    }
  }
};
