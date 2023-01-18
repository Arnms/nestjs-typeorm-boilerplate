import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

export class MediaService {
  env: string;
  bucket: string;
  s3: AWS.S3;

  constructor(configService: ConfigService) {
    this.env = configService.get('NODE_ENV');
    this.bucket = configService.get('S3_BUCKET_NAME');
    this.s3 = new AWS.S3({
      region: configService.get('AWS_REGION'),
      accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
    });
  }

  async getSignedUrl(fileName: string) {
    const key = `${this.env}/${fileName}`;
    const postParams: AWS.S3.PresignedPost.Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Fields: {
        key,
      },
      Expires: 300,
      Conditions: [
        // 0~50MB
        ['content-length-range', 0, 50 * 1000 * 1000],
      ],
    };
    const presignedCallback =
      (resolve: any, reject: any) =>
      (err: Error, data: AWS.S3.PresignedPost) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      };

    return new Promise((resolve, reject) => {
      this.s3.createPresignedPost(
        postParams,
        presignedCallback(resolve, reject),
      );
    });
  }
}
