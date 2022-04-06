const axios = require('axios');
const constant = require("./constant.json");
import {publish_metric} from './cloudwatch';
var AWS = require('aws-sdk');
const {getUrls} = require("./mongourl")

exports.webhandler = async function(event:any,context:any) {
    var cw = new AWS.CloudWatch();
    let values:any;

        // Getting URLs from mongo db
        const resUrl = await getUrls()
        
        // Iterate each URL
        for(var urls of resUrl) {
            const geturl = "https://"+urls.url+"/"; 
            console.log(`urls value are = ${urls}`)
           var avail = await get_availability(geturl);
           var latency = await get_latency(geturl);
           
           //publishing metric of availability and latency
           let cw_avail=publish_metric(constant.url_namespace,constant.Metricname_avail,urls.url,avail)
           let cw_latency=publish_metric(constant.url_namespace,constant.Metricname_latency,urls.url,latency)
           
                values={
                "url":urls,
                "availability":avail,
                "latency":latency};
               
                console.log(values);
          }

          return values
  };



// Get Availability
async function get_availability(url:string){

    const res = await axios.get(url);
    if (res.status==200 || res.status==201){ // If status will return 200 & 201, website is available
        return 1
    }
    else{
        return 0
    }
}

// Get Latency
async function get_latency(url:string){
    const strt_time=new Date().getTime();
    const res = await axios.get(url);
    const end_time=new Date().getTime();
    const diff = end_time-strt_time
    const latency = diff / 1000; // Calculating difference between start & end time
    console.log(latency)
    return latency
}