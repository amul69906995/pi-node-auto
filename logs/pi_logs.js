//here we will write code which will log error and analytics every 20sec to pi_log.txt

const fs = require('node:fs');
const path = require('path');
const log_to_pi_logs = async (logData) => {
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(logData)}\n`;
    // console.log("writing to file",logEntry)
     const logFilePath = path.join(__dirname, './pi_logs.txt');
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        } else {
            console.log('Log saved successfully!');
        }
    });
};
module.exports = { log_to_pi_logs }