import AWS from 'aws-sdk';

// Configure AWS SDK for India region
AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const s3 = new AWS.S3();
export const bedrock = new AWS.BedrockRuntime();
export const secretsManager = new AWS.SecretsManager();

export default AWS;
