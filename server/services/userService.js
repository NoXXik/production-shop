const bcrypt = require('bcrypt')
const {BCRYPT_SALT} = require("../config/config_");

class UserService {
    async hashPassword (password) {
        const hashPassword = await bcrypt.hash(password, 10)
        return hashPassword;
    }

    async checkPassword (password, hashPassword) {
        return await bcrypt.compare(password, hashPassword)
    }
}

module.exports = new UserService();
