const fs = require('fs');

var logMessage = (message) => {
    var date = new Date();
    var fileName = `log_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.txt`;
    var timestamp = date.toISOString();

    try {
        var filePath = __dirname + `/log/${fileName}`;
        var stream = fs.createWriteStream(__dirname + `/log/${fileName}`, {flags:'a'});
        stream.write(`${timestamp}: ${message}` + "\r\n");
        stream.close();
    } catch (e) {
        console.log(`ERROR: Unable to write to ${filePath}; ${e.message}`);
    }
};

module.exports = {logMessage};