#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { thatscookedStack } from '../lib/thatscooked-stack';

const app = new cdk.App();

console.log('DEPLOYMENT_ENVIRONMENT 👉', process.env.DEPLOYMENT_ENVIRONMENT);
if ( process.env.DEPLOYMENT_ENVIRONMENT == 'master' )
{
  new thatscookedStack(app, 'thats-cooked-stack', {
    description: "A simple static website for thatscooked.net",
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    stackName: "thats-cooked-master",
    domain: "thatscooked.net",
    staticAssetDirectory: './website-dist',
  
    // Request certificate via console at Amazon Certificate Manager (ACM) (DNS validation is recommended):
    certificateArn: "arn:aws:acm:us-east-1:945103061005:certificate/d6b67eca-ee19-4c3c-9464-acca382da17a",
  });
}
else
{
  new thatscookedStack(app, 'thats-cooked-dev-stack', {
    description: "development stack for dev.thatscooked.net",
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    stackName: "thats-cooked-dev",
    domain: "dev.thatscooked.net",
    staticAssetDirectory: './website-dist',
  
    // Request certificate via console at Amazon Certificate Manager (ACM) (DNS validation is recommended):
    certificateArn: "arn:aws:acm:us-east-1:945103061005:certificate/d6b67eca-ee19-4c3c-9464-acca382da17a",
  });
}
