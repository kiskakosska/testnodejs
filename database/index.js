'use strict';

const Client = require('./client');
const Admin = require('./admin');
const Anketa = require('./anketa');
const Currency = require('./currency');
const Executors = require('./executors');
const Log = require('./log');
const Offer = require('./offer');
const Order = require('./order');
const Review = require('./review');
const Services = require('./services');
const Tarif = require('./tarif');
const Transaction = require('./transaction');

module.exports = {
  Admin,
  Anketa,
  Client,
  Currency,
  Executors,
  Log,
  Offer,
  Order,
  Review,
  Services,
  Tarif,
  Transaction
}