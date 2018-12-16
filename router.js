const Authentication = require("./src/controllers/authentication");
const User = require("./src/controllers/user");
const CreditCard = require("./src/controllers/creditCard");
const Favorite = require("./src/controllers/favorite");
const Transaction = require("./src/controllers/transaction");
const passportService = require("./src/services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send({ hi: "there", userId: req.userId });
  });
  app.post("/auth", requireSignin, Authentication.signin);
  app.post("/user/register", Authentication.signup);
  app.post("/user/forgotPassword", User.forgotPassword);
  app.post("/user/validatePassword", requireAuth, User.validatePassword);
  app.get("/user/me", requireAuth, User.me);
  app.get("/user", requireAuth, User.findUser);
  app.post("/user/changePassword", User.changePassword);
  app.post("/credit-card", requireAuth, CreditCard.save);
  app.get("/credit-card/user", requireAuth, CreditCard.findByUser);
  app.put("/credit-card/:id", requireAuth, CreditCard.update);
  app.delete("/credit-card/:id", requireAuth, CreditCard.delete);
  app.post("/favorite", requireAuth, Favorite.save);
  app.get("/favorite/user", requireAuth, Favorite.findByUser);
  app.put("/favorite/:id", requireAuth, Favorite.update);
  app.delete("/favorite/:id", requireAuth, Favorite.delete);
  app.get("/transaction/user", requireAuth, Transaction.findByUser);
  app.post("/transaction", requireAuth, Transaction.save);
};
