const Joi = require("joi");
const router = require("express").Router();
const Cart = require('./models/Cart');
const Product = require('./models/Product');

router.get("/topSold/:quantity", async (req, res) => {
  const products_counts = {};
  const carts = await Cart.find();
  let i = 0;
  for (let i = 0; i < carts.length; i++) {
    const products = carts[i].products;
    for (let j = 0; j < products.length; j++) {
      products_counts[products[j].id]===undefined ? products_counts[products[j].id]=products[j].amount : products_counts[products[j].id]+=products[j].amount;
    }
  }
  const sorted_products_amounts = Object.keys(products_counts).map(id => [id, products_counts[id]]).sort((a, b) => b[1] - a[1]).slice(0,req.params.quantity);
  const result = [];
  for (let i = 0; i < sorted_products_amounts.length; i++) {
    const p = await Product.findById(sorted_products_amounts[i][0]);
    if(!p)
      return res.status(404).send(`product with the ID ${sorted_products_amounts[i][0]} does not exist`);
    result.push({
      "title": p.title,
      "amount": sorted_products_amounts[i][1]
    });
  }
  res.send(result);
});

router.get("/topUniqueSold/:quantity", async (req, res) => {
  const products_counts = {};
  const carts = await Cart.find();
  let i = 0;
  for (let i = 0; i < carts.length; i++) {
    const products = carts[i].products;
    for (let j = 0; j < products.length; j++) {
      products_counts[products[j].id]===undefined ? products_counts[products[j].id]=1 : products_counts[products[j].id]++;
    }
  }
  const sorted_products_amounts = Object.keys(products_counts).map(id => [id, products_counts[id]]).sort((a, b) => b[1] - a[1]).slice(0,req.params.quantity);
  const result = [];
  for (let i = 0; i < sorted_products_amounts.length; i++) {
    const p = await Product.findById(sorted_products_amounts[i][0]);
    if(!p)
      return res.status(404).send(`product with the ID ${sorted_products_amounts[i][0]} does not exist`);
    result.push({
      "title": p.title,
      "amount": sorted_products_amounts[i][1]
    });
  }
  res.send(result);
});

router.get("/topDays/:quantity", async (req, res) => {
  const dates_counts = {};
  const carts = await Cart.find();
  let i = 0;
  for (let i = 0; i < carts.length; i++) {
    const current_date = `${carts[i].time_stamp
      .getDate()}/${carts[i].time_stamp.getMonth()+1}/${carts[i].time_stamp.getFullYear()}`;
    const products = carts[i].products;
    for (let j = 0; j < products.length; j++) {
      dates_counts[current_date] === undefined ? dates_counts[current_date]=products[j].cost*products[j].amount : dates_counts[current_date]+=products[j].cost*products[j].amount;
    }
  }
  const sorted_dates_counts = Object.keys(dates_counts).map(date => [date, dates_counts[date]]).sort((a, b) => b[1] - a[1]).slice(0,req.params.quantity);
  const result = [];
  for (let i = 0; i < sorted_dates_counts.length; i++) {
    result.push({
      "date": sorted_dates_counts[i][0],
      "paid": sorted_dates_counts[i][1]
    });
  }
  res.send(result);
});

router.get("/pastDays/:quantity", async (req, res) => {
  const dates_counts = {};
  const last_date = new Date();
  last_date.setDate(last_date.getDate() - req.params.quantity);
  const carts = await Cart.find({"time_stamp":  {$gt: last_date}});
  for (let i = 0; i < carts.length; i++) {
    const current_date = `${carts[i].time_stamp
      .getDate()}/${carts[i].time_stamp.getMonth()+1}/${carts[i].time_stamp.getFullYear()}`;
    const products = carts[i].products;
    for (let j = 0; j < products.length; j++) {
      dates_counts[current_date] === undefined ? dates_counts[current_date]=products[j].cost*products[j].amount : dates_counts[current_date]+=products[j].cost*products[j].amount;
    }
  }
  const dates_counts_array = Object.keys(dates_counts).map(date => [date, dates_counts[date]]);
  const result = [];
  for (let i = 0; i < dates_counts_array.length; i++) {
    result.push({
      "date": dates_counts_array[i][0],
      "paid": dates_counts_array[i][1]
    });
  }
  res.send(result);
});

module.exports = router;