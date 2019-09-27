import amazon from 'aws-sdk';

import {
  Storage,
  SignedURLRequestOperation,
  SignedURLRequest,
} from '@services/cloud/types';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

amazon.config.accessKeyId = AWS_ACCESS_KEY_ID;
amazon.config.secretAccessKey = AWS_SECRET_ACCESS_KEY;

export class S3 implements Storage {
  private bucket_name: string;

  constructor(bucket_name: string) {
    this.bucket_name = bucket_name;
  }

  async signed_url(
    bucket_key: string,
    request_type: SignedURLRequestOperation,
  ): Promise<Error | string> {
    return new Promise((resolve, reject) => {
      const s3: amazon.S3 = new amazon.S3();

      const signed_url_request: SignedURLRequest = {
        Bucket: this.bucket_name,
        Key: bucket_key,
        Expires: 60 * 60,
      };

      s3.getSignedUrl(
        request_type,
        signed_url_request,
        (error: Error, url: string) => {
          error ? reject(error) : resolve(url);
        },
      );
    });
  }
}
