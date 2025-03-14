const { getOsType } = require('./detect_os/test');
const { isConnectedToInternet } = require('./internet_health/test')
const { isDockerInstalled } =require('./core/test')

    //first check for os detect_os if Windows_NT proceed else show
    //check for internet if availabel proceed if not available show them to connect to internet

    let globalValToShowFinally = {
        err: null,
        age: null,
        status: null,
    }
const main = async () => {
    const osType = getOsType();
    console.log("os_type:",osType)
    if (osType !== "Windows_NT") {
        globalValToShowFinally.err = "Sorry, this app is only available for Windows";
    }

    const isInternet = await isConnectedToInternet();
    if (!isInternet) {
        globalValToShowFinally.err = "u are not connected to internet u have to manually connect it later we may come with auto reconnection"
    }
    //check if docker is installed if not set error manually install later we may come up with auto download
    const isDockerAvailable=isDockerInstalled();
   if(!isDockerAvailable){
    globalValToShowFinally.err="docker is not installed please install it manually later we may come up auto installing of docker";
   } else{
        //check if latest image of pi network node is there or not
   } 
}
main();