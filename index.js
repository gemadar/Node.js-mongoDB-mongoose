require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment
const express = require("express"); // Import express
const fileUpload = require("express-fileupload");

const app = express(); // Make express app

/* Import routes */
const transactions = require("./routes/transactions");

/* Import errorHandler */
const errorHandler = require("./middlewares/errorHandler");

/* Enable req.body */
app.use(express.json()); // Enable req.body JSON
// Enable url-encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

/* Enable req.body and req.files (form-data) */
app.use(fileUpload());

/* Make public folder as static */
app.use(express.static("public"));

/* Use routes */
app.use("/transactions", transactions);

/* If routes not found */
app.all("*", (req, res, next) => {
  try {
    next({ message: "Endpoint not Found", statusCode: 404 });
  } catch (error) {
    next(error);
  }
});

/* User errorHandler */
app.use(errorHandler);

/* Running server */
app.listen(3000, () => console.log(`Server running on port 3000!`));
