const User = require("../models").User;
const Token = require("../models").Token;
const Email = require("../services/email");
const moment = require("moment");
const base64 = require("base-64");

module.exports = {
  validatePassword(req, res) {
    try {
      const { password } = req.body;
      const user = req.user;

      if (!user.validPassword(password)) {
        return res.status(400).send({ message: "Senha inválida" });
      }
      res.json({ message: "Validado com sucesso" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao salvar, tente novamente" });
    }
  },
  me(req, res) {
    res.json({ data: req.user.toJSON() });
  },
  async findUser(req, res) {
    try {
      const { username } = req.query;
      const user = await User.findOne({ where: { email: username } });
      if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado" });
      }
      res.json({ data: user });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao carregar, tente novamente" });
    }
  },
  async forgotPassword(req, res) {
    try {
      const { username } = req.body;

      const user = await User.findOne({ where: { email: username } });

      if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado" });
      }

      const token = {
        expiredAt: moment().add(1, "days"),
        UserId: user.get("id"),
        token: base64.encode(
          user.get("username") + moment() + user.get("name")
        ),
        used: false
      };

      await Token.create(token);

      const content = `http://localhost:3000/changePassword?token=${
        token.token
      }&email=${username}`;

      Email.sendEmail(user.get("email"), content);
      res.json({ success: true });
    } catch (err) {
      res.status(400).send({ message: "Erro ao salvar, tente novamente" });
    }
  },
  async changePassword(req, res) {
    try {
      const { password, confirmPassword, token, username } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).send({ message: "Senha precisam ser iguais" });
      }

      const myToken = await Token.findOne({ where: { token: token } });
      const user = await User.findOne({ where: { email: username } });

      if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado" });
      }

      if (!myToken) {
        return res.status(400).send({ message: "Token não encontrado" });
      }
      if (myToken.used) {
        return res.status(400).send({ message: "Token já utilizado" });
      }
      if (myToken.UserId !== user.get("id")) {
        return res.status(400).send({ message: "Token inválido" });
      }
      if (moment().isAfter(myToken.expiredAt)) {
        return res.status(400).send({ message: "Token expirado" });
      }

      await user.update({ password: password });
      await myToken.update({ used: true });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao salvar, tente novamente" });
    }
  }
};
