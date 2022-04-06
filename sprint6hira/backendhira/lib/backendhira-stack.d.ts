import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
export declare class BackendhiraStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps);
    create_role(): any;
    weblambdas(roles: any, id: string, asset: string, handler: string, layer: any): any;
    create_bucket(): any;
    s3upload(mybucket: Bucket): any;
}
