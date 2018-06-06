Eos = require('eosjs') // Eos = require('./src')

const chainId = "";
const secretKey = "";
const account = "";
const httpEndPoint = "";
const netToUnstake = "100 EOS";
const config = { httpEndpoint: httpEndPoint,
                 keyProvider: [ secretKey ],
                 chainId: chainId }

eos = Eos(config)

eos.transaction(tr => {
  tr.undelegatebw({
    from: account,
    receiver: account,
    unstake_net_quantity: netToUnstake,
    unstake_cpu_quantity: cpuToUnstake,
  })
}).then(result => {console.log(result)})
