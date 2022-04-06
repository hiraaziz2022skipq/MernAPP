"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendhiraStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const s3 = require("aws-cdk-lib/aws-s3");
const s3deployment = require("aws-cdk-lib/aws-s3-deployment");
const events = require("aws-cdk-lib/aws-events");
const targets = require("aws-cdk-lib/aws-events-targets");
const path = require("path");
const constant = require("../resources/constant.json");
class BackendhiraStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const roles = this.create_role(); // Calling create_role function
        /*
          Layer Version ()
                id -> id(str)
                removal policy -> RETAIN
                code -> Directory of layer code
                compatibleRuntimes -> NODEJS_!$_X
        */
        const layer = new lambda.LayerVersion(this, 'MyLayer', {
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.RETAIN,
            code: lambda.Code.fromAsset('./layers'),
            compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
        });
        /*------------Calling API lambda function-------------*/
        const api_lambda_func = this.weblambdas(roles, "api_lambda", "./server", "api_lambda.handler", layer);
        /*----------Create an API Gateway to invoke lambda function----------*/
        const api = new apigateway.LambdaRestApi(this, 'hiraapi', {
            handler: api_lambda_func
        });
        /*-----------Calling web health lambda function-----------*/
        var lambda_func = this.weblambdas(roles, "WebHealthLambda", "./resources", "webHealthLambda.webhandler", layer);
        var function_name = lambda_func.functionName;
        // Run Lambda periodically
        const rule = new events.Rule(this, 'Rule', {
            schedule: events.Schedule.rate(aws_cdk_lib_1.Duration.minutes(1)),
            targets: [new targets.LambdaFunction(lambda_func)],
        });
        // const mybucket = this.create_bucket()                                 // Creating an s3 bucket
        // this.s3upload(mybucket)                                               // Uploading files to s3 bucket
    }
    create_role() {
        const role = new aws_iam_1.Role(this, 'example-iam-role', {
            assumedBy: new aws_iam_1.ServicePrincipal('lambda.amazonaws.com'),
            description: 'An example IAM role in AWS CDK',
            managedPolicies: [
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess'),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayInvokeFullAccess'),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayAdministrator'),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
            ],
        });
        return role;
    }
    // Calling Lambda Function
    weblambdas(roles, id, asset, handler, layer) {
        /* create_lambda()
              
        id -> string value
        asset -> Folder that contains code
        runtime -> Language
        handler -> Lambda function
        timeout -> After how long lambda will end
        
        Return : Lambda Function */
        const hello = new lambda.Function(this, id, {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset(asset),
            handler: handler,
            timeout: aws_cdk_lib_1.Duration.seconds(180),
            layers: [layer],
            role: roles,
        });
        return hello;
    }
    create_bucket() {
        const mybucket = new s3.Bucket(this, 'Hirabucket', {
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            publicReadAccess: true,
        });
        return mybucket;
    }
    s3upload(mybucket) {
        new s3deployment.BucketDeployment(this, 'Deploywebsite', {
            sources: [s3deployment.Source.asset(path.join(__dirname, "../../frontendhira/hiracrud_app/build/"))],
            destinationBucket: mybucket,
        });
    }
}
exports.BackendhiraStack = BackendhiraStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZGhpcmEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWNrZW5kaGlyYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBeUU7QUFFekUsaURBQWdEO0FBQ2hELGlEQUE0RTtBQUM1RSx5REFBeUQ7QUFDekQseUNBQXlDO0FBQ3pDLDhEQUE4RDtBQUM5RCxpREFBaUQ7QUFDakQsMERBQTBEO0FBQzFELDZCQUE2QjtBQUU3QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUd2RCxNQUFhLGdCQUFpQixTQUFRLG1CQUFLO0lBQ3pDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQXdDLCtCQUErQjtRQUVyRzs7Ozs7O1VBTUU7UUFFRixNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNyRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxNQUFNO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDdkMsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUNqRCxDQUFDLENBQUM7UUFFSCx3REFBd0Q7UUFDeEQsTUFBTSxlQUFlLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxvQkFBb0IsRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUcvRix1RUFBdUU7UUFDdkUsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDeEQsT0FBTyxF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YXRpb24sIFJlbW92YWxQb2xpY3ksIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSdcbmltcG9ydCB7IE1hbmFnZWRQb2xpY3ksIFJvbGUsIFNlcnZpY2VQcmluY2lwYWwgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcbmltcG9ydCAqIGFzIHMzZGVwbG95bWVudCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMtZGVwbG95bWVudCc7XG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWV2ZW50cyc7XG5pbXBvcnQgKiBhcyB0YXJnZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1ldmVudHMtdGFyZ2V0cyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnOyBcbmltcG9ydCB7IEJ1Y2tldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5jb25zdCBjb25zdGFudCA9IHJlcXVpcmUoXCIuLi9yZXNvdXJjZXMvY29uc3RhbnQuanNvblwiKTtcblxuXG5leHBvcnQgY2xhc3MgQmFja2VuZGhpcmFTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCByb2xlcz10aGlzLmNyZWF0ZV9yb2xlKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbGluZyBjcmVhdGVfcm9sZSBmdW5jdGlvblxuXG4gICAgLypcbiAgICAgIExheWVyIFZlcnNpb24gKClcbiAgICAgICAgICAgIGlkIC0+IGlkKHN0cilcbiAgICAgICAgICAgIHJlbW92YWwgcG9saWN5IC0+IFJFVEFJTlxuICAgICAgICAgICAgY29kZSAtPiBEaXJlY3Rvcnkgb2YgbGF5ZXIgY29kZVxuICAgICAgICAgICAgY29tcGF0aWJsZVJ1bnRpbWVzIC0+IE5PREVKU18hJF9YXG4gICAgKi9cblxuICAgIGNvbnN0IGxheWVyID0gbmV3IGxhbWJkYS5MYXllclZlcnNpb24odGhpcywgJ015TGF5ZXInLCB7ICAgICAgICAgICAgICAvLyBDcmVhdGUgTGF5ZXIgVmVyc2lvblxuICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5SRVRBSU4sXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJy4vbGF5ZXJzJyksXG4gICAgICBjb21wYXRpYmxlUnVudGltZXM6IFtsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWF0sXG4gICAgfSk7XG5cbiAgICAvKi0tLS0tLS0tLS0tLUNhbGxpbmcgQVBJIGxhbWJkYSBmdW5jdGlvbi0tLS0tLS0tLS0tLS0qL1xuICAgIGNvbnN0IGFwaV9sYW1iZGFfZnVuYz10aGlzLndlYmxhbWJkYXMocm9sZXMsXCJhcGlfbGFtYmRhXCIsXCIuL3NlcnZlclwiLFwiYXBpX2xhbWJkYS5oYW5kbGVyXCIsbGF5ZXIpXG5cblxuICAgIC8qLS0tLS0tLS0tLUNyZWF0ZSBhbiBBUEkgR2F0ZXdheSB0byBpbnZva2UgbGFtYmRhIGZ1bmN0aW9uLS0tLS0tLS0tLSovXG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhUmVzdEFwaSh0aGlzLCAnaGlyYWFwaScsIHtcbiAgICAgIGhhbmRsZXI6IGFwaV9sYW1iZGFfZnVuY30pO1xuXG4gICAgXG4gICAgLyotLS0tLS0tLS0tLUNhbGxpbmcgd2ViIGhlYWx0aCBsYW1iZGEgZnVuY3Rpb24tLS0tLS0tLS0tLSovXG4gICAgdmFyIGxhbWJkYV9mdW5jPXRoaXMud2VibGFtYmRhcyhyb2xlcyxcIldlYkhlYWx0aExhbWJkYVwiLFwiLi9yZXNvdXJjZXNcIixcIndlYkhlYWx0aExhbWJkYS53ZWJoYW5kbGVyXCIsbGF5ZXIpXG4gICAgdmFyIGZ1bmN0aW9uX25hbWU9bGFtYmRhX2Z1bmMuZnVuY3Rpb25OYW1lXG4gICAgXG5cbiAgICAvLyBSdW4gTGFtYmRhIHBlcmlvZGljYWxseVxuICAgIGNvbnN0IHJ1bGUgPSBuZXcgZXZlbnRzLlJ1bGUodGhpcywgJ1J1bGUnLCB7XG4gICAgICAgICAgICAgICAgICBzY2hlZHVsZTogZXZlbnRzLlNjaGVkdWxlLnJhdGUoRHVyYXRpb24ubWludXRlcygxKSksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRzOiBbbmV3IHRhcmdldHMuTGFtYmRhRnVuY3Rpb24obGFtYmRhX2Z1bmMpXSxcbiAgICB9KTtcblxuXG4gICAgLy8gY29uc3QgbXlidWNrZXQgPSB0aGlzLmNyZWF0ZV9idWNrZXQoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0aW5nIGFuIHMzIGJ1Y2tldFxuICAgIC8vIHRoaXMuczN1cGxvYWQobXlidWNrZXQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGxvYWRpbmcgZmlsZXMgdG8gczMgYnVja2V0XG4gICAgXG4gIH1cblxuICBjcmVhdGVfcm9sZSgpOmFueXtcblxuICAgIGNvbnN0IHJvbGUgPSBuZXcgUm9sZSh0aGlzLCAnZXhhbXBsZS1pYW0tcm9sZScsIHtcbiAgICAgIGFzc3VtZWRCeTogbmV3IFNlcnZpY2VQcmluY2lwYWwoJ2xhbWJkYS5hbWF6b25hd3MuY29tJyksXG4gICAgICBkZXNjcmlwdGlvbjogJ0FuIGV4YW1wbGUgSUFNIHJvbGUgaW4gQVdTIENESycsXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0Nsb3VkV2F0Y2hGdWxsQWNjZXNzJyksXG4gICAgICAgIE1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25EeW5hbW9EQkZ1bGxBY2Nlc3MnKSxcbiAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnKSxcbiAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvbkFQSUdhdGV3YXlJbnZva2VGdWxsQWNjZXNzJyksXG4gICAgICAgIE1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25BUElHYXRld2F5QWRtaW5pc3RyYXRvcicpLFxuICAgICAgICBNYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uUzNGdWxsQWNjZXNzJyksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIHJldHVybiByb2xlXG4gICAgfVxuXG4gICAgLy8gQ2FsbGluZyBMYW1iZGEgRnVuY3Rpb25cbndlYmxhbWJkYXMocm9sZXM6YW55LGlkOnN0cmluZyxhc3NldDpzdHJpbmcsaGFuZGxlcjpzdHJpbmcsbGF5ZXI6YW55KTphbnl7XG5cbiAgLyogY3JlYXRlX2xhbWJkYSgpXG4gICAgICAgIFxuICBpZCAtPiBzdHJpbmcgdmFsdWVcbiAgYXNzZXQgLT4gRm9sZGVyIHRoYXQgY29udGFpbnMgY29kZVxuICBydW50aW1lIC0+IExhbmd1YWdlXG4gIGhhbmRsZXIgLT4gTGFtYmRhIGZ1bmN0aW9uXG4gIHRpbWVvdXQgLT4gQWZ0ZXIgaG93IGxvbmcgbGFtYmRhIHdpbGwgZW5kXG4gIFxuICBSZXR1cm4gOiBMYW1iZGEgRnVuY3Rpb24gKi9cblxuICBjb25zdCBoZWxsbyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgaWQsIHtcbiAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCwgICAgXG4gICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KGFzc2V0KSwgIFxuICAgIGhhbmRsZXI6IGhhbmRsZXIsICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcygxODApLFxuICAgIGxheWVyczpbbGF5ZXJdLFxuICAgIHJvbGU6cm9sZXMsXG4gICAgICAgICAgICBcbiAgfSk7XG4gIHJldHVybiBoZWxsb1xufVxuXG4gICAgY3JlYXRlX2J1Y2tldCgpOmFueXtcbiAgICAgICAgY29uc3QgbXlidWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdIaXJhYnVja2V0Jyx7XG4gICAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgICAgYXV0b0RlbGV0ZU9iamVjdHM6IHRydWUsXG4gICAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IHRydWUsXG4gICAgICB9KVxuICAgICAgcmV0dXJuIG15YnVja2V0XG4gICAgfVxuXG4gICAgczN1cGxvYWQobXlidWNrZXQ6QnVja2V0KTphbnl7XG4gICAgICAgIG5ldyBzM2RlcGxveW1lbnQuQnVja2V0RGVwbG95bWVudCh0aGlzLCAnRGVwbG95d2Vic2l0ZScse1xuICAgICAgICBzb3VyY2VzOltzM2RlcGxveW1lbnQuU291cmNlLmFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vZnJvbnRlbmRoaXJhL2hpcmFjcnVkX2FwcC9idWlsZC9cIikpXSxcbiAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IG15YnVja2V0LFxuICAgICAgfSk7XG4gICAgfVxufVxuIl19