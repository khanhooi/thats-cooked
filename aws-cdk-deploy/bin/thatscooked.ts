#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { thatscookedStack } from '../lib/thatscooked-stack';

const app = new cdk.App();
new thatscookedStack(app, 'thatscookedStack', {
  description: "A simple application for creating secret santa lists. Describes both front and backend components.",

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  stackName: "thatscookednet",
  domain: "thatscooked.net",
  staticAssetDirectory: './website-dist',

  // Request certificate via console at Amazon Certificate Manager (ACM) (DNS validation is recommended):
  certificateArn: "arn:aws:acm:us-east-1:945103061005:certificate/d6b67eca-ee19-4c3c-9464-acca382da17a",
});
