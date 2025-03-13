// here is code will be written to get to know what os we are on and based on that it will chose core module
//currently support only windows
const os = require("os");

//based on this it will run core module of windows max or linux
function getOsType() {
    return os.type(); 
    // Returns the OS type (e.g., 'Windows_NT', 'Linux', 'Darwin')
}

console.log('Operating System:',getOsType(),getUptime());

//this will be used to monitor and may be used to restart the pc after giving 1hr -30 mins rest
function getUptime() {
    const uptimeInSeconds = os.uptime(); // Get uptime in seconds

    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

   return `PC Uptime: ${hours}h ${minutes}m ${seconds}s`;
}
//later functionalities
// write a function which will make sure that in 24 hr pc shut down from Xpm to ypm and coount 94% uptime in 24 hr
//write a function based on getOsType to download docker and container and pinetwork connect to app 
//before downloading check if pinetwork or docker exist in system probably i can use exec to execute specific cmd
module.exports={getUptime,getOsType}
