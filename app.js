const { getOsType } = require('./detect_os/test');
const { isConnectedToInternet } = require('./internet_health/test')
const { isDockerInstalled,isContainerRunning,fetchPiNodeMetrics,downloadImageMakeContainer, isDockerRunning,startDocker} =require('./core/test');
const { execSync } = require("child_process");
const { disableSleepModeAndLidClosingAction } = require('./background_run/test');

require('dotenv').config()
    //first check for os detect_os if Windows_NT proceed else show
    //check for internet if availabel proceed if not available show them to connect to internet

   
const main =  () => {


    //check if docker is installed if not set error manually install later we may come up with auto download
   const isDockerAvailable=isDockerInstalled();
   if(!isDockerAvailable){
    throw new Error("Docker is not installed. Please install it manually. Later we may come up with auto installing of Docker");
   }
   if(!isDockerRunning()){
    console.log("docker is not running.....")
    //we have to close all task then start docker and wait till initilized
    //we need to wait until isDockerRunning becomes true
     startDocker();
   }
   //we can only apply command if docker deamon is running
   //we have to check if image exist or not if yes check for container if yes run it if not make it and run it
   //if not exist download image make container and run it 
  //now we have to download image and container testnet2 if not available
  if(isDockerRunning()){
    //killAndReStart()
    downloadImageMakeContainer(process.env.LATEST_DOCKER_IMAGE,"testnet2");
  }
  if(isDockerRunning()){
    console.log("docker is running checking container testnet2 status...")
    if(!isContainerRunning()){
        console.log("testnet2 starting....")
        execSync('docker start testnet2')
    }
    console.log("testnet2 is already running fetching metrices...")
    fetchPiNodeMetrics();
    setInterval(fetchPiNodeMetrics,20000)
  }
//now we hae to make sure that is docker container is running  
}
const script=async()=>{
  const isInternet = await isConnectedToInternet();
  const isMainRunning=false;
  if (!isInternet) {
      console.log("You are not connected to internet. You have to manually connect it. Later we may come with auto reconnection,aborting...")
  }
  else{
    isMainRunning=true;
    main();
  }
}
const osType = getOsType();
  console.log("os_type:",osType)
  if (osType !== "Windows_NT") {
      throw new Error("Sorry, this app is only available for Windows");
  }else{
    disableSleepModeAndLidClosingAction();
    script();
  }

