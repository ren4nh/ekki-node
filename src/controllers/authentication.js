const jwt = require("jwt-simple");
const User = require("../models").User;
const secret = require("../../config/secret");
const Op = require("sequelize").Op;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret.JWT_SECRET);
}

module.exports = {
  signin(req, res) {
    res.send({ data: { token: tokenForUser(req.user) } });
  },

  async signup(req, res, next) {
    try {
      const { username, password, name } = req.body;

      if (!username) {
        return res.status(400).send({ message: "Email deve ser informado" });
      }
      if (!password) {
        return res.status(400).send({ message: "Senha deve ser informado" });
      }
      if (!name) {
        return res.status(400).send({ message: "Nome deve ser informado" });
      }

      if (await User.findOne({ where: { email: { [Op.eq]: username } } })) {
        return res.status(400).send({ message: "Email já em uso" });
      }

      await User.create({
        email: username,
        password: password,
        name: name,
        balance: 0
      });

      res.json({ message: "Usuário salvo com sucesso" });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Erro "
      });
    }
  }
};
