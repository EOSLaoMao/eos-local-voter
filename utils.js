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

let eos;
try {
  eos = EOS(readConfig());
} catch(error) {
  eos = undefined;
}

module.exports = {
  writeConfig: writeConfig,
  readConfig: readConfig,
  eos: eos,
};
