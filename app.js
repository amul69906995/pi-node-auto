const { getOsType } = require('./detect_os/test');
const { isConnectedToInternet } = require('./internet_health/test')
const { isDockerInstalled } =require('./core/test');
const { execSync } = require("child_process");

require('dotenv').config()
    //first check for os detect_os if Windows_NT proceed else show
    //check for internet if availabel proceed if not available show them to connect to internet

   
const main = async () => {
    const osType = getOsType();
    console.log("os_type:",osType)
    if (osType !== "Windows_NT") {
        throw new Error("Sorry, this app is only available for Windows");
    }

    const isInternet = await isConnectedToInternet();
    if (!isInternet) {
        throw new Error("You are not connected to internet. You have to manually connect it. Later we may come with auto reconnection")
    }
    //check if docker is installed if not set error manually install later we may come up with auto download
    const isDockerAvailable=isDockerInstalled();
   if(!isDockerAvailable){
    throw new Error("Docker is not installed. Please install it manually. Later we may come up with auto installing of Docker");
   } 
   //we have to check if image exist or not if yes run the container if not download image and run the container
}
main();