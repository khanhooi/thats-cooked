# That's Cooked
This is the project behind the website, thatscooked.net


Dev branches get built at dev.thatscooked.net

## Jekyll

```
docker run --rm --volume="$PWD:/srv/jekyll" jekyll/jekyll:4.2.2           sh -c "chown -R jekyll . &&  chown -R jekyll /usr/gem/  && cd template && jekyll build --destination '_site'"
```

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