const {
  User,
  Favorite,
  CreditCard,
  Transaction,
  Token
} = require("./src/models");

const test = async () => {
  // create broker
  const user1 = await User.create({
    name: "Renan",
    email: "r@r.com",
    password: "123456"
  });
  const user2 = await User.create({
    name: "Renan 2",
    email: "r2@r.com",
    password: "123456"
  });
  // create investment
  const favorite = await Favorite.create({
    description: "Tesouro Foo",
    UserId: user1.get("id"),
    FavoriteId: user2.get("id")
  });
  const creditCard = await CreditCard.create({
    cardNumber: 12123132132,
    cardName: "Renan da mascada",
    securityCode: 512,
    expiredAt: "2018-12-15",
    description: "Teste",
    UserId: user1.get("id")
  });
  const token = await Token.create({
    token: "sdfs12301sd0",
    expiredAt: "2018-12-16",
    used: false,
    UserId: user1.get("id")
  });
  const transaction = await Transaction.create({
    description: "pagamento",
    status: "completo",
    amountPayedWithCreditCard: 0,
    amount: 10,
    UserId: user1.get("id"),
    DestinationId: user2.get("id")
  });

  await user1
    .update({ name: "steves" })
    .then(() => {})
    .catch(err => {
      console.log(err);
    });
  // select all
  const brokerWithDetails = await User.findAll({
    where: { id: user1.get("id") },
    include: [{ all: true }]
  });
  console.log(JSON.stringify(brokerWithDetails));
};

test();
