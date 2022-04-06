import { Stack, StackProps, Stage} from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {BackendhiraStack} from './backendhira-stack' 
import * as cdk from 'aws-cdk-lib';


export class Hirastagestack extends Stage {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);

        // Instantiate Stack      
         const hira6stack = new BackendhiraStack(this,"HiraStack")
    }
}