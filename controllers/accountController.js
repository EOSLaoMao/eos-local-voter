class AccountCtl {
    constructor(eos) {
        this.eos = eos;
    }

    async getInfo(account) {
        return await this.eos.getAccount(account);
    }
}

module.exports = AccountCtl;