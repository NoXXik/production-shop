const robokassa = require('./RobokassaHelper');
// const robokassa = require('node-robokassa')
module.exports = new robokassa({

    // REQUIRED OPTIONS:
    merchantLogin: 'smarthome16',
    hashingAlgorithm: 'sha256',
    password1: 'Kd7MHoJ7Jb7uonghB4M0', // Test password !!!
    password2: 'OHWJqRUwl65JkRW378SU', // Test password !!!
    culture: 'ru',
    // OPTIONAL CONFIGURATION
    testMode: true, // Whether to use test mode globally
    resultUrlRequestMethod: 'POST' // HTTP request method selected for "ResultURL" requests

});

//GEyWackbfGP93Nwy354h
//u4DaJ40d1WQ×aUORWG8H
