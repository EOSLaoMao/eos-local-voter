const express = require('express');
const fs = require('fs');
const EOS = require('eosjs');
const util = require('util')
const router = express.Router();
const configFile = './config.json';
const utils = require('../utils');

router.post('/', async (req, res, next) => {
  const data = req.body;
  const config = {
    httpEndpoint: data.httpEndpoint,
    chainId: data.chainId,
    account: data.account,
  }
  utils.writeConfig(config);
  res.send(config);
});

router.get('/', async (req, res, next) => {
  try {
    config = utils.readConfig();
    res.send(config);
  } catch (error) {
    res.sendStatus(404)
  }
})
module.exports = router;
