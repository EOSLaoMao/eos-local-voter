const express = require('express');
const EOS = require('eosjs');
const VotingCtl = require('../controllers/votingController');
const _ = require('lodash')

const router = express.Router();

router.post('/', async (req, res, next) => {
  const data = req.body;
  const eosConfig = {
    httpEndpoint: data.httpEndpoint,
    keyProvider: [data.secretKey],
    chainId: data.chainId,
  }

  const eos = EOS(eosConfig);
  const votingCtl = new VotingCtl(eos);
  try {
    if (_.isEmpty(data.proxy)) data.proxy = "";
    const result = await votingCtl.vote(data.account, data.producers, data.proxy);
    if (!_.isEmpty(reuslt)) res.sendStatue(200);
    console.log(result);
  } catch (error) {
    next(error)
  }
});


module.exports = router;