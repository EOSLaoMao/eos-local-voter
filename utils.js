const path = require('path');
const fs = require('fs');
const EOS = require('eosjs');
const configFile = path.join(__dirname, 'config.json');

writeConfig = function(config) {
  fs.writeFileSync(configFile, JSON.stringify(config), 'utf8');
}

readConfig = function() {
  if (fs.existsSync(configFile)) {
    let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    console.log("file does exists!")
    return config;
  } else {
    let config = "";
    console.log("file does not exists!")
    fs.writeFile(configFile, "", (err) => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
    });
    throw new Error("config file does not exist!");
  }
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
