
// src/config/bedrock.ts
import { BedrockRuntime } from 'aws-sdk';

const bedrockConfig = {
    // We can add more specific configuration here if needed in the future
};

export const bedrock = new BedrockRuntime(bedrockConfig);
