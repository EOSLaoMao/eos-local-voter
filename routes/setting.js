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
  console.log(config);
  utils.writeConfig(config);
  res.send(config);
});

router.get('/', async (req, res, next) => {
  console.log('local ip:', utils.getLocalIp());
  try {
    config = utils.readConfig();
    res.send(config);
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
