const express = require('express');
const app = express();
const searcherRoutes = express.Router();

//
let Product = require('../models/Product');

/**
 * Do search
 */
searcherRoutes.route('/').get(function (req, res) {
  if (!req.query.kw) {
    console.log("Must provide keyword");
  }

  if (!req.query.kw) {
    console.log("Must provide keyword");
  }
  Product.find({$text : {$search: req.query.kw}, source: req.query.sr}, 
    { score: { $meta: "textScore" } }
  ).sort( { score: { $meta: "textScore" } } ).limit(100).exec(function (err, items) {
    if (err) {
      mess = "Fail when exec query";
      console.log(mess);
      res.status(400).send(mess);
    } else {
      res.json(items);
    }
  });
});

/**
 * Return all sources available
 */
searcherRoutes.route('/sources/all').get(function (req, res) {
  Product.distinct("source").lean().exec(function (err, items) {
    if (err) {
      console.log("Error");
    } else {
      res.json(items);
    }
  });
});

module.exports = searcherRoutes;