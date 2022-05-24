#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { thatscookedStack } from '../lib/thatscooked-stack';

declare var process : {
  env: {
    CERTIFICATE_ARN: string
    DEPLOYMENT_ENVIRONMENT: string
    CDK_DEFAULT_REGION: string
    CDK_DEFAULT_ACCOUNT: string
  }
}

const app = new cdk.App();

console.log('DEPLOYMENT_ENVIRONMENT 👉', process.env.DEPLOYMENT_ENVIRONMENT);
if ( process.env.DEPLOYMENT_ENVIRONMENT == 'master' )
{
  new thatscookedStack(app, 'thats-cooked-stack', {
    description: "A simple static website for thatscooked.net",
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    stackName: "thats-cooked-master",
    domain: "thatscooked.net",
    subdomain: "thatscooked.net",
    staticAssetDirectory: './website-dist',
      certificateArn: process.env.CERTIFICATE_ARN,
  });
}
else
{
  new thatscookedStack(app, 'thats-cooked-dev-stack', {
    description: `development stack for dev.thatscooked.net`,
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    stackName: "thats-cooked-dev",
    domain: "thatscooked.net",
    subdomain: "dev.thatscooked.net",
    staticAssetDirectory: './website-dist',
      certificateArn: process.env.CERTIFICATE_ARN,
  });
}
