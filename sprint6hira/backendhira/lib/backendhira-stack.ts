import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as path from 'path'; 
import { Bucket } from 'aws-cdk-lib/aws-s3';
const constant = require("../resources/constant.json");


export class BackendhiraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const roles=this.create_role()                                        // Calling create_role function

    /*
      Layer Version ()
            id -> id(str)
            removal policy -> RETAIN
            code -> Directory of layer code
            compatibleRuntimes -> NODEJS_!$_X
    */

    const layer = new lambda.LayerVersion(this, 'MyLayer', {              // Create Layer Version
      removalPolicy: RemovalPolicy.RETAIN,
      code: lambda.Code.fromAsset('./layers'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
    });

    /*------------Calling API lambda function-------------*/
    const api_lambda_func=this.weblambdas(roles,"api_lambda","./server","api_lambda.handler",layer)


    /*----------Create an API Gateway to invoke lambda function----------*/
    const api = new apigateway.LambdaRestApi(this, 'hiraapi', {
      handler: api_lambda_func});

    
    /*-----------Calling web health lambda function-----------*/
    var lambda_func=this.weblambdas(roles,"WebHealthLambda","./resources","webHealthLambda.webhandler",layer)
    var function_name=lambda_func.functionName
    

    // Run Lambda periodically
    const rule = new events.Rule(this, 'Rule', {
                  schedule: events.Schedule.rate(Duration.minutes(60)),
                  targets: [new targets.LambdaFunction(lambda_func)],
    });


    // const mybucket = this.create_bucket()                                 // Creating an s3 bucket
    // this.s3upload(mybucket)                                               // Uploading files to s3 bucket
    
  }

  create_role():any{

    const role = new Role(this, 'example-iam-role', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      description: 'An example IAM role in AWS CDK',
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess'),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayInvokeFullAccess'),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayAdministrator'),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
      ],
    });
    return role
    }

    // Calling Lambda Function
weblambdas(roles:any,id:string,asset:string,handler:string,layer:any):any{

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
    timeout: Duration.seconds(180),
    layers:[layer],
    role:roles,
            
  });
  return hello
}

    create_bucket():any{
        const mybucket = new s3.Bucket(this, 'Hirabucket',{
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        publicReadAccess: true,
      })
      return mybucket
    }

    s3upload(mybucket:Bucket):any{
        new s3deployment.BucketDeployment(this, 'Deploywebsite',{
        sources:[s3deployment.Source.asset(path.join(__dirname, "../../frontendhira/hiracrud_app/build/"))],
        destinationBucket: mybucket,
      });
    }
}
