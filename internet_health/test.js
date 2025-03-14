// here i will write code to check internet and based on that run core module(process management + monitorin logic)

//first look for internet connection dns lookup
const dns=require('dns');
const { promisify } = require('util');
const lookup=promisify(dns.lookup)
const isConnectedToInternet = async () => {
    try {
        await lookup('google.com');
        console.log('Internet connection available');
        return true;
    } catch (err) {
        console.log('No internet connection');
        return false;
    }
};






//get all available internet loop through eah and try connection and retry every 20-30 seconds
const retryConnectingToInternet=async()=>{
 console.log("currently u have to manually connect with wifi and it make sense cause our aim is to automate when ever we open our pc and we typically enable wifi")
}

//check for internet every 5 second increase time in production to 60sec
const internetHealthCheckAndRetry=async ()=>{
    const isInternet=await isConnectedToInternet();
    if(!isInternet){
        retryConnectingToInternet();
    }
    else{
        console.log("connection looks fine we can measure internet speed")
    }
}
 
module.exports={internetHealthCheckAndRetry,retryConnectingToInternet,isConnectedToInternet}