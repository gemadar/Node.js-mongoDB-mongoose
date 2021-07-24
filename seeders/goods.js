const faker = require("faker");
const { good, supplier } = require("../models");

exports.addGoods = async () => {
  const suppliers = await supplier.find();

  for (let i = 0; i < 10; i++) {
    await good.create({
      name: faker.commerce.productName(),
      price: faker.commerce.price() * 14000,
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)]._id,
      photo: faker.image.imageUrl(),
    });
  }

  console.log("Good has been added");
};

exports.deleteGoods = async () => {
  await good.remove();

  console.log("Good has been deleted");
};
