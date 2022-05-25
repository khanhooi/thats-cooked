import * as cdk from 'aws-cdk-lib';
import { App } from 'aws-cdk-lib';

export interface thatscookedStackProps extends cdk.StackProps {
  // relative path of the directory to be deployed to the s3 bucket
  readonly staticAssetDirectory: string;
  readonly domain: string;
  readonly subdomain: string;
  readonly certificateArn: string;
}

export class thatscookedStack extends cdk.Stack {
  constructor(scope: App, id: string, props: thatscookedStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const websiteBucket = new cdk.aws_s3.Bucket(this, 'websiteBucket', {
      versioned: false,
      autoDeleteObjects: true,
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new cdk.aws_s3_deployment.BucketDeployment(this, 'DeployWebsite', {
      sources: [cdk.aws_s3_deployment.Source.asset(props.staticAssetDirectory)],
      destinationBucket: websiteBucket,
    });

    const certificate = cdk.aws_certificatemanager.Certificate.fromCertificateArn(this, 'CertificateImported', props.certificateArn);

    const cloudfrontDistribution = new cdk.aws_cloudfront.Distribution(this, 'cloudfrontDistribution', {
      defaultRootObject: "index.html",
      defaultBehavior: {
        allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_ALL,
        cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_DISABLED,
        origin: new cdk.aws_cloudfront_origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      certificate: certificate,
      domainNames: [props.subdomain, 'www.' + props.subdomain],
      errorResponses: [
        { httpStatus: 400, responsePagePath: '/404.html' },
        { httpStatus: 403, responsePagePath: '/404.html' },
        { httpStatus: 404, responsePagePath: '/404.html' }]
    });

    //Lookup the zone based on domain name
    const zone = cdk.aws_route53.HostedZone.fromLookup(this, 'baseZone', {
      domainName: props.domain
    });

    const cloudFrontTarget = new cdk.aws_route53_targets.CloudFrontTarget(cloudfrontDistribution);
    const recordTarget = cdk.aws_route53.RecordTarget.fromAlias(cloudFrontTarget);
    //Add the Subdomain to Route53
    new cdk.aws_route53.ARecord(this, 'Domain', {
      zone: zone,
      recordName: props.subdomain,
      target: recordTarget
    });

    new cdk.aws_route53.ARecord(this, 'wwwSubDomain', {
      zone: zone,
      recordName: 'www.' + props.subdomain,
      target: recordTarget
    });
  }
}
