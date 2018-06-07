const express = require('express');
const fs = require('fs');
const EOS = require('eosjs');
const util = require('util')
const router = express.Router();
const configFile = './config.json';
const utils = require('../utils');
const SetingCtl =



router.post('/', async (req, res, next) => {
  const data = req.body;
  const eosConfig = {
    httpEndpoint: data.httpEndpoint,
    chainId: data.chainId,
    account: data.account,
  }
  console.log(eosConfig);
  utils.writeConfig(eosConfig);
  // const eos = EOS(eosConfig);
  res.sendStatus(200)
});

router.get('/', async (req, res, next) => {
  try {
    config = utils.readConfig();
    res.send(JSON.stringify(config));
  }
  catch(error) {
    res.sendStatus(404)
  }
})

async function sendTransaction(eos, netToUnstake, cpuToUnstake, account) {
  return await eos.transaction(tr => {
    tr.undelegatebw({
      from: account,
      receiver: account,
      unstake_net_quantity: netToUnstake,
      unstake_cpu_quantity: cpuToUnstake,
    })
  })
}
module.exports = router;
