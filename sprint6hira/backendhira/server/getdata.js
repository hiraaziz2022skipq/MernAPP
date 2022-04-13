const AWS = require('aws-sdk');
const moment = require("moment");
// Create CloudWatch service object

// Set the region 
AWS.config.update({region: 'us-west-1'});


async function avail_datapoints(url){

  var cw = new AWS.CloudWatch();
      var params = {
        EndTime: moment().subtract(2, "minutes").utc().format(),
        MetricName:'Availabilty',
        Namespace: 'Hira_Aziz_Sprint6',
        Period: 300,
        StartTime: moment().subtract(300, "minutes").utc().format(),
        Dimensions: [
            {
                Name: 'URL',
                Value: url /* required */
            },
        ],
        Statistics: ['Maximum'],
        Unit: 'None'
      };

           let avail =await cw.getMetricStatistics(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    return {"Datapoints": "datapoints doesnot exists"}

                } // an error occurred
                else {
                  // return data;
                // successful response
            }}).promise();
            return avail.Datapoints;

}

async function latency_datapoints(url){

  var cw = new AWS.CloudWatch();
  var params = {
    EndTime: moment().subtract(2, "minutes").utc().format(),
    MetricName: 'Latency',
    Namespace: 'Hira_Aziz_Sprint6',
    Period: 300,
    StartTime: moment().subtract(30, "minutes").utc().format(),
    Dimensions: [
        {
            Name: 'URL',
            Value: url /* required */
        },
    ],
    Statistics: ['Maximum'],
    Unit: 'None'
  };

  
       let latency =await cw.getMetricStatistics(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                return {"Datapoints": "datapoints doesnot exists"}

            } // an error occurred
            else {
              
            // successful response
        }}).promise();
        // console.log(`points are ${latency_dp}`)
        return latency.Datapoints;

}

module.exports.avail_datapoints = avail_datapoints
module.exports.latency_datapoints = latency_datapoints
