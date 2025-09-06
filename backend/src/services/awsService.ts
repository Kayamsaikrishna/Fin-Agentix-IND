
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from 'multer';
import multerS3 from 'multer-s3';
import { Request } from 'express';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

class AwsService {
  s3 = s3Client;
  bucketName = BUCKET_NAME;

  async uploadToS3(file: Express.Multer.File, key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);
    return key;
  }

  async getS3FileUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    // Generate a presigned URL for temporary access
    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 }); // 1 hour
    return url;
  }
}

export const awsService = new AwsService();

// Configure multer for S3 uploads
export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: BUCKET_NAME,
        metadata: function (req: Request, file: Express.Multer.File, cb: (error: any, metadata?: any) => void) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
});
