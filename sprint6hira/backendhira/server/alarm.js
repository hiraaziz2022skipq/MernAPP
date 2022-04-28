// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region:  'us-west-1'});

// Create CloudWatch service object
var cw = new AWS.CloudWatch();


async function latency_alarm(url){

    var params = {
        AlarmName: 'Hira_Latency_Alarm_'+url,      // Alarm name should be unique 
        ComparisonOperator: 'GreaterThanThreshold',     // After how many evaluation data will be compared to threshold.
        EvaluationPeriods: 1,                           // After how many datapoints breaches to trigger alarm
        MetricName: 'Latency',         // Metric name
        Namespace: 'Hira_Aziz_Sprint6',               // Namspace
        Period: 60,                                     // After how many minutes this will check datapoints in published metrics
        Statistic: 'Average',
        Threshold: 0.3,                                 // It is used to check if metric is breaching
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
            AlarmName: 'Hira_Availability_Alarm_'+url,    // Alarm name should be unique 
            ComparisonOperator: 'LessThanThreshold',        // After how many evaluation data will be compared to threshold.
            EvaluationPeriods: 1,                           // After how many datapoints breaches to trigger alarm
            MetricName: 'Availabilty',       // Metric name
            Namespace: 'Hira_Aziz_Sprint6',               // Namepsace
            Period: 60,                                     // After how many minutes this will check datapoints in published metrics
            Statistic: 'Average',
            Threshold: 1,                                   // It is used to check if metric is breaching
            AlarmDescription: 'Alarm_when_availability=0',
            Dimensions: [
            {
                Name: 'URL',
                Value: url
            },
            ]
        };
        
        // passing params to putMetricAalrm
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

        // Add availability and Latency aLarms
        AlarmNames: ['Hira_Latency_Alarm_'+url, 'Hira_Availability_Alarm_'+url]
      };
      
      // Passing params to deleteAlarms
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