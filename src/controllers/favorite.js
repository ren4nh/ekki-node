const Favorite = require("../models").Favorite;
const User = require("../models").User;
const Op = require("sequelize").Op;

module.exports = {
  async save(req, res) {
    try {
      const { user } = req;
      const { description, email } = req.body;

      if (!email) {
        return res.status(400).send({ message: "Email não informado" });
      }
      if (!description) {
        return res.status(400).send({ message: "Descrição inválida" });
      }

      const favorite = await User.findOne({
        where: { email: { [Op.eq]: email } }
      });
      if (!favorite) {
        return res.status(400).send({ message: "Favorecido não encontrado" });
      }

      const myFavorite = await Favorite.create({
        ...req.body,
        UserId: user.get("id"),
        FavoriteId: favorite.get("id")
      });
      myFavorite.setDataValue("favorite", await myFavorite.getFavorite());
      res.json({ data: myFavorite });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao salvar, tente novamente" });
    }
  },
  async update(req, res) {
    try {
      const { description, email } = req.body;
      const { id } = req.params;

      if (!email) {
        return res.status(400).send({ message: "Email não informado" });
      }
      if (!description) {
        return res.status(400).send({ message: "Descrição inválida" });
      }

      const favoriteUser = await User.findOne({
        where: { email: { [Op.eq]: email } }
      });
      if (!favoriteUser) {
        return res.status(400).send({ message: "Favorecido não encontrado" });
      }

      const favorite = await Favorite.findByPk(id, {
        include: [{ all: true }]
      });
      if (!favorite) {
        return res.status(400).send({ message: "Favorecido não encontrado" });
      }
      await favorite.update(req.body);
      res.json({ data: favorite });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao salvar, tente novamente" });
    }
  },
  async findByUser(req, res) {
    try {
      const { user } = req;

      const favorites = await Favorite.findAll({
        where: { UserId: { [Op.eq]: user.get("id") } },
        include: [{ all: true }],
        order: [["id", "ASC"]]
      });
      res.json({ data: favorites });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao salvar, tente novamente" });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const favorite = await Favorite.findByPk(id);
      if (!favorite) {
        return res.status(400).send({ message: "Favorecido não encontrado" });
      }
      await favorite.destroy();
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Erro ao deletar, tente novamente" });
    }
  }
};
