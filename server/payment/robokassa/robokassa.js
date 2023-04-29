const robokassa = require('./RobokassaHelper');
// const robokassa = require('node-robokassa')
module.exports = new robokassa({

    // REQUIRED OPTIONS:
    merchantLogin: 'smarthome16',
    hashingAlgorithm: 'sha256',
    password1: 'AA1GE75TW6YUekcQT2Ss', // Test password !!!
    password2: 'd2S0xctK3G9D0xBRmTOJ', // Test password !!!
    culture: 'ru',
    // OPTIONAL CONFIGURATION
    testMode: true, // Whether to use test mode globally
    resultUrlRequestMethod: 'GET' // HTTP request method selected for "ResultURL" requests

});

//GEyWackbfGP93Nwy354h
//u4DaJ40d1WQ×aUORWG8H
