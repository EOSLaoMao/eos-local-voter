const express = require('express');
const fs = require('fs');
const EOS = require('eosjs');
const utils = require('../utils');
const AccountCtl = require('../controllers/accountController');
const _ = require('lodash');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const config = utils.readConfig();
    const account = config.account;
    const eos = new EOS(config);
    const accountCtl = new AccountCtl(eos);
    const result = await accountCtl.getInfo(account);
    if (_.isEmpty(result)) throw new Error('account is not exist.');
    res.send(result);
  } catch (error) {
    next(error)
  }
})


module.exports = router;