const { execSync } = require("child_process");
const {log_to_pi_logs}=require('../logs/pi_logs')
const {getCurrentNetwork,getBatteryPercentage}=require('../system_resource_use/test')
// // check if container is running docker ps -q --filter "name=testnet2"  if not restart constiner docker start testnet2
// const dockerCheckRun = () => {    
//     const testnet2RunningId = execSync('docker ps -q --filter "name=testnet2"').toString();
//     if (testnet2RunningId) {
//         console.log(`✅ Docker container is running container id ${testnet2RunningId} restarting....`);
//         //restart container
//         execSync('docker restart testnet2')
//     } else {
//         execSync('docker restart testnet2')
//     }
// }
//dockerCheckRun();
 
// Function to fetch and log Pi Node metrics
const fetchPiNodeMetrics = async() => {
    try {
        //console.log("inside fetchnodeMatrix")
        const info = execSync('docker exec testnet2 curl -s http://127.0.0.1:11626/info').toString();
        const jsonData = JSON.parse(info);
        const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
         //console.log(now,jsonData.info.state)
         const logData = {
            timestamp: new Date().toISOString(),
            network: getCurrentNetwork(),
            battery: getBatteryPercentage(),
            state: jsonData.info.state,
            status: jsonData.info.status,
            authenticatedConnections: jsonData.info.peers.authenticated_count,
            pendingConnections: jsonData.info.peers.pending_count,
        };
        
        await log_to_pi_logs(logData);
        if(jsonData.info.ledger.age>90&&jsonData.info.peers.authenticated_count==0&&jsonData.info.peers.pending_count==0){
           // console.log("🚨 Pi Node is not syncing try changing network restarting docker...")
           await log_to_pi_logs({"date":now,"message":"🚨 Pi Node is not syncing try changing network restarting docker..."})
                // restart docker container
                execSync('docker restart testnet2')
        }
     if(jsonData.info.ledger.age>60){
        console.log("\n📊 **Pi Node Metrics indicating failure**:");

         console.log(`\n📊 **Pi Node Metrics** (Logged at: ${now} IST)`);
        console.log(`🔹 status: ${jsonData.info.status}`);
        console.log(`latest block:${jsonData.info.quorum.qset.ledger}`)
        console.log(`🔹 State: ${jsonData.info.state}`);
        console.log(`📦 Local Block: ${jsonData.info.ledger.num}`);
        console.log(`⏳ Sync Age: ${jsonData.info.ledger.age} seconds ago`);
        console.log(`🔗 Incoming Connections: ${jsonData.info.peers.authenticated_count}`);
        console.log(`🔗 pending Connections: ${jsonData.info.peers.pending_count}`);
        console.log("\n✅ Monitoring complete!\n");
       }
    } catch (error) {
        console.log("❌ Error fetching Pi Node metrics:", error.message);
    }
};

//setInterval(fetchPiNodeMetrics,20000);
//related to docker installation
const isDockerInstalled = () => {
    try {
        execSync('docker --version', { stdio: 'ignore' }); // Ignore output, only check success/fail
        console.log('✅ Docker is installed');
        return true;
    } catch (error) {
        console.log('❌ Docker is not installed OR if u have installed u may try addeding docker to enviorment variable');
        return false;
    }
};
const isDockerImageExist=(image)=>{
   try {
    const result=execSync(`docker images -q ${image}`).toString().trim();
    if(result)return true;
    else return false;
   } catch (error) {
    console.log("error in isDockerImageExist",error)
    throw new Error(error)
   }
}
const isContainerExist=(image)=>{
 try {
    const result = execSync(`docker ps -a --filter "ancestor=${image}" --format "{{.ID}}"`).toString().trim();
    if(result)return true;
    else return false;
 } catch (error) {
    console.log("error in isDockerImageExist",error)
    throw new Error(error)
 }
}
const downloadImageMakeContainer=(image,containerName="testnet2")=>{
    let isImage=isDockerImageExist(image);
    if (!isImage) {
        console.log("📦 Downloading Docker image...");
        execSync(`docker pull ${image}`, { stdio: "inherit" }); // Pull the image
        isImage = true; // Update the flag
     }
  
     const isContainer = isContainerExist(image);
  
     if (!isContainer) {
        console.log(`🚀 Creating a Docker container (${containerName})...`);
        execSync(`docker run -d --name ${containerName} ${image}`, { stdio: "inherit" });
        console.log("✅ Container created successfully.");
     } else {
        console.log("✅ Docker image and container already exist.");
     }
}
// start docker container testnet2
const isDockerRunning=()=>{
    try {
        execSync('docker ps', { encoding: 'utf8' });
        return true
      } catch (error) {
        return false;
      }        
}
const isContainerRunning=()=>{
    try {
        const result = execSync(`docker ps -q --filter "name=testnet2"`).toString().trim();
        if(result)return true;
    }
    catch(error){
        return false;
    }   
}
//we will check if docker is running or not if not we will start using start command
//we need to wait until docker is started and ready to run container
//this will run 
const startDocker=()=>{
    console.log("starting docker...")
    try{
        //killing all docker instances
        execSync(`start " " "C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe"`)
    }catch(error){
        console.log("error in starting docker",error)
    }

}
module.exports={isContainerRunning,fetchPiNodeMetrics,isDockerRunning,isDockerInstalled,downloadImageMakeContainer,startDocker}