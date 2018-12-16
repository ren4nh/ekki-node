const CreditCard = require("../models").CreditCard;

module.exports = {
  async save(req, res) {
    try {
      const { user } = req;
      const {
        cardNumber,
        cardName,
        securityCode,
        expiredAt,
        description
      } = req.body;

      if (!cardNumber) {
        return res
          .status(400)
          .send({ message: "Numero do cartão não informado" });
      }
      if (!cardName) {
        return res
          .status(400)
          .send({ message: "Nome no cartão não informado" });
      }
      if (!securityCode) {
        return res
          .status(400)
          .send({ message: "Código de segurança não informado" });
      }
      if (!expiredAt) {
        return res
          .status(400)
          .send({ message: "Data de expiração não informada" });
      }
      if (!description) {
        return res.status(400).send({ message: "Descrição inválida" });
      }

      const creditCard = await CreditCard.create({
        ...req.body,
        UserId: user.get("id")
      });

      res.json({ data: creditCard });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao salvar" });
    }
  },
  async update(req, res) {
    try {
      const {
        cardNumber,
        cardName,
        securityCode,
        expiredAt,
        description
      } = req.body;
      const { id } = req.params;

      if (!cardNumber) {
        return res
          .status(400)
          .send({ message: "Numero do cartão não informado" });
      }
      if (!cardName) {
        return res
          .status(400)
          .send({ message: "Nome no cartão não informado" });
      }
      if (!securityCode) {
        return res
          .status(400)
          .send({ message: "Código de segurança não informado" });
      }
      if (!expiredAt) {
        return res
          .status(400)
          .send({ message: "Data de expiração não informada" });
      }
      if (!description) {
        return res.status(400).send({ message: "Descrição inválida" });
      }

      const card = await CreditCard.findByPk(id);
      if (!card) {
        return res
          .status(400)
          .send({ message: "Cartão de crédito não encontrado" });
      }
      await card.update(req.body);
      res.json({ data: card });
    } catch (err) {
      res.status(500);
    }
  },
  async findByUser(req, res) {
    try {
      const { user } = req;

      const cards = await CreditCard.findAll({
        where: { UserId: user.get("id") }
      });
      res.json({ data: cards });
    } catch (err) {
      res.status(500);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const card = await CreditCard.findByPk(id);
      if (!card) {
        return res
          .status(400)
          .send({ message: "Cartão de crédito não encontrado" });
      }
      await card.destroy();
      res.json({ success: true });
    } catch (err) {
      res.status(500);
    }
  }
};
