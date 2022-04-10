// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region:  'us-west-1'});

// Create CloudWatch service object
var cw = new AWS.CloudWatch();


async function latency_alarm(url){

    var params = {
        AlarmName: process.env.l_alarm_name+url,
        ComparisonOperator: 'GreaterThanThreshold',
        EvaluationPeriods: 1,
        MetricName: 'Latency',
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
            AlarmName: 'Hira_Availability_Alarm_'+url,
            ComparisonOperator: 'LessThanThreshold',
            EvaluationPeriods: 1,
            MetricName: 'Availabilty',
            Namespace: 'Hira_Aziz_Sprint6',
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
        AlarmNames: ['Hira_Availability_Alarm_'+url, 'Hira_Latency_Alarm_'+url]
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