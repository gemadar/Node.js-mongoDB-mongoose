const faker = require("faker");
const { customer } = require("../models");

exports.addCustomers = async () => {
  for (let i = 0; i < 10; i++) {
    await customer.create({ name: faker.name.findName() });
  }

  console.log("Customer has been added");
};

exports.deleteCustomers = async () => {
  await customer.remove();

  console.log("Customer has been deleted");
};
