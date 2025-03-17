//here we will have code to start this script when pc boots up and when we close lid the process should run in background
//5 cases


const {execSync}=require('child_process')
//hack disable sleep mode not good for performance 
const disableSleepModeAndLidClosingAction=()=>{
    try {
        console.log("disabling sleep mode and lid closing action to do nothing for both ac and dc")
         // Set sleep timeout to never (0) for both AC and DC works fine checked in terminal
  execSync(`powercfg /change /standby-timeout-ac 0`);
  execSync(`powercfg /change /standby-timeout-dc 0`);
  //set lid close action to "do nothing" (0) for both AC and DC
  execSync(`powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_BUTTONS LIDACTION 0`);
  execSync(`powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_BUTTONS LIDACTION 0`);
    } catch (error) {
        console.log("error in disableSleepmodeand lid closing action",error)
    }
 
}
module.exports={disableSleepModeAndLidClosingAction}