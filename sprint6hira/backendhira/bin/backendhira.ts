#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackendhiraStack } from '../lib/backendhira-stack';
import { Hirapipelinestack } from '../lib/hirapipelinestack';

const app = new cdk.App();
new Hirapipelinestack(app, 'BackendhirasStack', {
  
});