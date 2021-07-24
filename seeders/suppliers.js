const faker = require("faker");

const { supplier } = require("../models");

exports.addSuppliers = async () => {
  for (let i = 0; i < 10; i++) {
    await supplier.create({ name: faker.name.findName() });
  }

  console.log("Supplier has been added");
};

exports.deleteSuppliers = async () => {
  await supplier.remove();

  console.log("Supplier has been deleted");
};
