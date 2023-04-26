class ExecPHP {
    /**
     *
     */
    constructor() {
        this.phpPath = '/usr/local/etc/php/8.2/conf.d/ext-opcache.ini';
        this.phpFolder = '';
    }
    /**
     *
     */
    parseFile(fileName,callback) {
        var realFileName = this.phpFolder + fileName;

        console.log('parsing file: ' + realFileName);

        var exec = require('child_process').exec;
        // var cmd = this.phpPath + ' ' + realFileName;
        var cmd = 'php -f ' + realFileName;


        exec(cmd, function(error, stdout, stderr) {
            callback(stdout);
        });
    }
}
module.exports = function() {
    return new ExecPHP();
};
