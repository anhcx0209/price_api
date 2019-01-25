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

  Product.aggregate([{
    $match: {
      $and: [{
        source: req.query.sr
      }, {
        name: { $regex: req.query.kw, $options: 'i'}
      }]
    }
  }, {
    $project: {
      name: 1,
      price: 1,
      source: 1
    }
  }]).limit(100).exec(function (err, items) {
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