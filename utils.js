const fs = require('fs');
const configFile = './config.json'

writeConfig = function(config) {
  fs.writeFileSync(configFile, JSON.stringify(config), 'utf8');
}

readConfig = function() {
  let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  console.log('17: config in file', config);
  return config;
}

module.exports = {
  writeConfig: writeConfig,
  readConfig: readConfig
};
