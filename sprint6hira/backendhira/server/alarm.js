// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region:  'us-west-1'});

// Create CloudWatch service object
var cw = new AWS.CloudWatch();


async function latency_alarm(url){

    var params = {
        AlarmName: process.env.lat_alarm_name+url,
        ComparisonOperator: 'GreaterThanThreshold',
        EvaluationPeriods: 1,
        MetricName: process.env.lat_metricname,
        Namespace: process.env.Namespace,
        Period: 60,
        Statistic: 'Average',
        Threshold: 0.3,
        AlarmDescription: 'Alarm_when_threshold_exceed_0.3',
        Dimensions: [
        {
            Name: 'URL',
            Value: url
        },
        ]
        
    };
    
    cw.putMetricAlarm(params, function(err, data) {
        if (err) {
        console.log("Error", err);
        } else {
        console.log("Success", data);
        }
    }).promise();

}

async function avail_alarm(url){
    
        var params = {
            AlarmName: process.env.avail_alarm_name+url,
            ComparisonOperator: 'LessThanThreshold',
            EvaluationPeriods: 1,
            MetricName: process.env.avail_metricname,
            Namespace: process.env.Namespace,
            Period: 60,
            Statistic: 'Average',
            Threshold: 1,
            AlarmDescription: 'Alarm_when_availability=0',
            Dimensions: [
            {
                Name: 'URL',
                Value: url
            },
            ]
        };
        
        cw.putMetricAlarm(params, function(err, data) {
            if (err) {
            console.log("Error", err);
            } else {
            console.log("Success", data);
            }
        }).promise();

}

async function Delete_alarm(url){
  
    var params = {
        AlarmNames: [process.env.avail_alarm_name+url, process.env.lat_alarm_name+url]
      };
      
      cw.deleteAlarms(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      }).promise();
}

module.exports.latency_alarm = latency_alarm
module.exports.avail_alarm = avail_alarm
module.exports.Delete_alarm = Delete_alarm