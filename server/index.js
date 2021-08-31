const config = require('./config.json');

const Joi = require("joi");
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use("/api/products", require("./products"));
app.use("/api/carts", require("./carts"));
app.use("/api/sales", require("./sales"));

const url = `${config.DB_URL}`;
mongoose.connect(url, { useNewUrlParser: true },
    () => console.log('connected to DB'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
