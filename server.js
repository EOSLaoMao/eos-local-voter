const EOS = require('eosjs')
const express = require('express')
const bodyParser = require('body-parser')
const opn = require('opn');

const app = new express()

// parse application/json
app.use(bodyParser.json())

app.get('/api/trx', async (req, res) => {
  const result = await getTransaction();
  console.log(result);
})


app.post('/api/voting', async (req, res) => {
  const data = req.body;
  const eosConfig = {
    httpEndpoint: data.httpEndpoint,
    keyProvider: [data.secretKey],
    chainId: data.chainId,
  }
  const eos = EOS(eosConfig);
  try {
    const result = await sendTransaction(eos, data.netToUnstake, data.cpuToUnstake, data.account);
    if (result !== null) res.sendStatus(200);
  } catch (e) {
    console.error(e.stack);
  }
})

async function getTransaction(eos) {
  return await eos.getTransaction("5c051c9c0766b2ea7da52909309b66c2f85ac7b5b034eae1274c21dfd823165b")
}

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


app.listen(10000, () => {
  const host = "http://localhost:10000";
  console.log(host);
  opn(host);
});