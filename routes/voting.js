const express = require('express');
const EOS = require('eosjs');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const data = req.body;
  const eosConfig = {
    httpEndpoint: data.httpEndpoint,
    keyProvider: [data.secretKey],
    chainId: data.chainId,
  }
  const eos = EOS(eosConfig);
  try {
    const result = await stake(eos, data.netToUnstake, data.cpuToUnstake, data.account);
    if (result !== null) res.sendStatus(200);
    console.log(result);
  } catch (e) {
    next(e);
  }
});

async function stake(eos, netToUnstake, cpuToUnstake, account) {
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