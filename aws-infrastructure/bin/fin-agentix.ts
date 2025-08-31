#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FinAgentixStack } from '../lib/fin-agentix-stack';

const app = new cdk.App();

new FinAgentixStack(app, 'FinAgentixIndiaStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'ap-south-1', // Mumbai region for India
  },
  description: 'Fin-Agentix India - AI-powered lending platform infrastructure',
});
