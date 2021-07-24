const { addCustomers, deleteCustomers } = require("./customers");
const { addSuppliers, deleteSuppliers } = require("./suppliers");
const { addGoods, deleteGoods } = require("./goods");
const { transaction } = require("../models");

async function add() {
  await Promise.all([addCustomers(), addSuppliers()]);
  await addGoods();
}

async function remove() {
  await Promise.all([
    deleteCustomers(),
    deleteSuppliers(),
    deleteGoods(),
    transaction.remove(),
  ]);
}

if (process.argv[2] === "add") {
  add().then(() => {
    console.log("Seedes success");
    process.exit(0);
  });
} else if (process.argv[2] === "remove") {
  remove().then(() => {
    console.log("Delete data success");
    process.exit(0);
  });
}
