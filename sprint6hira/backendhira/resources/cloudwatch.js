"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish_metric = void 0;
var AWS = require('aws-sdk');
async function publish_metric(namespace, metricname, url, value) {
    // Create CloudWatch service object
    var cw = new AWS.CloudWatch();
    /*
        metric_Params
         
        MetricName -> name of metric
        Dimensions -> Key value pair
        Value -> Datapoints
    */
    var metric_Params = {
        MetricData: [
            {
                MetricName: metricname,
                Dimensions: [{ Name: "URL", Value: url },],
                Value: value
            },
        ],
        Namespace: namespace
    };
    // Putting Data into putMetricData function 
    cw.putMetricData(metric_Params, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", JSON.stringify(data));
        }
    });
}
exports.publish_metric = publish_metric;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWR3YXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsb3Vkd2F0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXRCLEtBQUssVUFBVSxjQUFjLENBQUMsU0FBZ0IsRUFBQyxVQUFpQixFQUFDLEdBQVUsRUFBQyxLQUFZO0lBRTNGLG1DQUFtQztJQUNuQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUU5Qjs7Ozs7O01BTUU7SUFFRixJQUFJLGFBQWEsR0FBRztRQUNoQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxVQUFVLEVBQUUsVUFBVTtnQkFDdEIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFLLEtBQUssRUFBRSxHQUFHLEVBQUcsRUFBRTtnQkFDOUMsS0FBSyxFQUFFLEtBQUs7YUFDYjtTQUNGO1FBQ0QsU0FBUyxFQUFFLFNBQVM7S0FDckIsQ0FBQztJQUVGLDRDQUE0QztJQUM1QyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxVQUFTLEdBQU8sRUFBRSxJQUFRO1FBQ3hELElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQWhDRCx3Q0FnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHB1Ymxpc2hfbWV0cmljKG5hbWVzcGFjZTpzdHJpbmcsbWV0cmljbmFtZTpzdHJpbmcsdXJsOnN0cmluZyx2YWx1ZTpudW1iZXIpe1xyXG5cclxuICAgIC8vIENyZWF0ZSBDbG91ZFdhdGNoIHNlcnZpY2Ugb2JqZWN0XHJcbiAgICB2YXIgY3cgPSBuZXcgQVdTLkNsb3VkV2F0Y2goKTtcclxuXHJcbiAgICAvKlxyXG4gICAgICAgIG1ldHJpY19QYXJhbXMgXHJcbiAgICAgICAgIFxyXG4gICAgICAgIE1ldHJpY05hbWUgLT4gbmFtZSBvZiBtZXRyaWNcclxuICAgICAgICBEaW1lbnNpb25zIC0+IEtleSB2YWx1ZSBwYWlyXHJcbiAgICAgICAgVmFsdWUgLT4gRGF0YXBvaW50c1xyXG4gICAgKi9cclxuXHJcbiAgICB2YXIgbWV0cmljX1BhcmFtcyA9IHtcclxuICAgICAgICBNZXRyaWNEYXRhOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIE1ldHJpY05hbWU6IG1ldHJpY25hbWUsXHJcbiAgICAgICAgICAgIERpbWVuc2lvbnM6IFt7IE5hbWU6IFwiVVJMXCIsICAgIFZhbHVlOiB1cmwgIH0sXSxcclxuICAgICAgICAgICAgVmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgTmFtZXNwYWNlOiBuYW1lc3BhY2VcclxuICAgICAgfTtcclxuICAgICAgXHJcbiAgICAgIC8vIFB1dHRpbmcgRGF0YSBpbnRvIHB1dE1ldHJpY0RhdGEgZnVuY3Rpb24gXHJcbiAgICAgIGN3LnB1dE1ldHJpY0RhdGEobWV0cmljX1BhcmFtcywgZnVuY3Rpb24oZXJyOmFueSwgZGF0YTphbnkpIHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxufSJdfQ==