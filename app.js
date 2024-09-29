const express = require("express");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Order Routes
app.use("/api", orderRoutes);

app.listen(port, () => {
  console.log(`Order Management Service running on port ${port}`);
});
