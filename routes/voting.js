const express = require('express');
const EOS = require('eosjs');
const createError = require('http-errors');
const _ = require('lodash')

const utils = require('../utils');
const VotingCtl = require('../controllers/votingController');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const data = req.body;
  let config = utils.readConfig();
  const account = config['account'];
  try {
    config['keyProvider'] = [data.secretKey];
    const votingCtl = new VotingCtl(EOS(config));
    if (_.isEmpty(data.proxy)) data.proxy = "";
    let producers = [];
    data.producers.split(' ').forEach(function (prod) {
      console.log('prod', prod);
      producers.push(prod.trim())
    });
    const result = await votingCtl.vote(account, producers, data.proxy);
    if (_.isEmpty(result)) throw createError(404);
    res.send(JSON.stringify(result));
  } catch (error) {
    next(error)
  }
});

module.exports = router;
