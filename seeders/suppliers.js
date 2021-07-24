const faker = require("faker");
const { supplier } = require("../models");

// Seeder add
exports.addSuppliers = async () => {
  for (let i = 0; i < 10; i++) {
    await supplier.create({
      name: faker.name.findName(),
      photo: faker.image.people(),
    });
  }

  console.log("Suppliers have been added");
};

// Seeder undo
exports.deleteSuppliers = async () => {
  await supplier.remove();

  console.log("Suppliers have been deleted");
};
