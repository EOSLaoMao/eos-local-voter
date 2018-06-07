const express = require('express');
const fs = require('fs');
const createError = require('http-errors');
const _ = require('lodash');
const EOS = require('eosjs');

const AccountCtl = require('../controllers/accountController');
const utils = require('../utils');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const config = utils.readConfig();
    const account = config.account;
    const eos = new EOS(config);
    const accountCtl = new AccountCtl(eos);
    const result = await accountCtl.getInfo(account);
    if (_.isEmpty(result)) throw createError(404);
    res.send(result);
  } catch (error) {
    next(error)
  }
})


module.exports = router;