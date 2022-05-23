# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.


## Jekyll
 - install gem, then
    
gem install jekyll bundler

cd template && bundle exec jekyll serve

## Requirements
yarn,
typescript
cdk,
docker

## to build
cd aws-cdk-deploy
### get dependencies
yarn

### cdk diff
yarn cdk diff



## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

<!-- # cdk 
cdk bootstrap aws://945103061005/ap-southeast-2 && cdk diff -->