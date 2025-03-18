// this will contain how much computing power we are contributing to run the node
//how to get battery current Percentage
const { execSync } = require('child_process');

function getBatteryPercentage() {
  try {
    const output = execSync('wmic path Win32_Battery get EstimatedChargeRemaining').toString();
    const lines = output.trim().split('\n');
    const batteryPercentage = lines[1].trim();
    console.log(`Battery Percentage: ${batteryPercentage}%`);
    return batteryPercentage;
  } catch (error) {
    console.error('Error getting battery percentage:', error);
  }
}
function getCurrentNetwork() {
    try {
      const network = execSync('netsh wlan show interfaces').toString();
      const ssidMatch = network.match(/SSID\s*:\s*(.+)/);
      console.log(ssidMatch ? ssidMatch[1].trim() : 'Not connected')
      return ssidMatch ? ssidMatch[1].trim() : 'Not connected';
    } catch (error) {
      console.error('Error getting current network:', error);
    }
  }


module.exports={getBatteryPercentage,getCurrentNetwork}