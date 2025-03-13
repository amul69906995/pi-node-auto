const { spawn } = require("child_process");
const { execSync } = require("child_process");

//close all pinode before starting new one
// check if pinetwork is running `tasklist /FI "IMAGENAME eq Pi Network.exe"`
//if running close all taskkill /IM "Pi Network.exe" /F and start a pi network
// try {
//     const piNetworkRunning = execSync('tasklist /FI "IMAGENAME eq Pi Network.exe"').toString();
//     console.log("what pi network is running",piNetworkRunning);
// if (piNetworkRunning) {
//     console.log("Pi Network is running, closing all instances");
//     execSync('taskkill /IM "Pi Network.exe" /F')
// }else{
//     console.log('✅ Pi Network is not running');
// }
// } catch (error) {
//     console.log("❌ Error checking or stopping Pi Network:", error.message);
// }

// // Start Pi Network in detached mode
// const piNode = spawn("C:\\Users\\amul7\\AppData\\Local\\Programs\\pi-network-desktop\\Pi Network.exe", [], {
//     detached: true,
//     stdio: "ignore"
// });

// piNode.unref(); // Ensures process stays alive even if Node.js exits
// console.log("✅ Pi Network started successfully!");

// check if container is running docker ps -q --filter "name=testnet2"  if not restart constiner docker start testnet2
const dockerCheckRun = () => {
    
    const testnet2RunningId = execSync('docker ps -q --filter "name=testnet2"').toString();
    if (testnet2RunningId) {
        console.log(`✅ Docker container is running container id ${testnet2RunningId} restarting....`);
        //restart container
        execSync('docker restart testnet2')
    } else {
        execSync('docker restart testnet2')
    }
}
dockerCheckRun();

// Function to fetch and log Pi Node metrics
const fetchPiNodeMetrics = () => {
    try {
        const info = execSync('docker exec testnet2 curl -s http://127.0.0.1:11626/info').toString();
        const jsonData = JSON.parse(info);

        console.log("\n📊 **Pi Node Metrics**:");
        console.log(`🔹 State: ${jsonData.info.state}`);
        console.log(`📦 Latest Block: ${jsonData.info.ledger.num}`);
        console.log(`⏳ Sync Age: ${jsonData.info.ledger.age} seconds ago`);
        console.log(`🔗 Outgoing Connections: ${jsonData.info.peers.authenticated_count}`);
        console.log(`🔗 pending Connections: ${jsonData.info.peers.pending_count}`);
        console.log("\n✅ Monitoring complete!\n");
    } catch (error) {
        console.log("❌ Error fetching Pi Node metrics:", error.message);
    }
};
setInterval(fetchPiNodeMetrics, 20000);


// // Run all tasks sequentially
// const main = () => {
//     preventSleep();  // Prevent system from sleeping when lid is closed
//     stopPiNetwork();
//     startPiNetwork();
//     restartDockerContainer();
//     setTimeout(fetchPiNodeMetrics, 20000); // Delay to ensure container is running before fetching data
// };

// // Run the script
// main();
