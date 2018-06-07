const path = require('path');
const fs = require('fs');
const EOS = require('eosjs');
const configFile = path.join(__dirname, 'config.json');

writeConfig = function(config) {
  fs.writeFileSync(configFile, JSON.stringify(config), 'utf8');
}

readConfig = function() {
  let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  return config;
}

getLocalIp = function() {
    const os = require('os');

    for(let addresses of Object.values(os.networkInterfaces())) {
        for(let add of addresses) {
            if(add.address.startsWith('192.168.')) {
                return add.address;
            }
        }
    }
}

module.exports = {
  writeConfig: writeConfig,
  readConfig: readConfig,
  getLocalIp: getLocalIp,
};
