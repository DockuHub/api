export interface Storage {
  signed_url(
    bucket_key: string,
    request_type: SignedURLRequestOperation,
  ): Promise<Error | string>;
}

export enum SignedURLRequestOperation {
  put = 'putObject',
  get = 'getObject',
}

export type SignedURLRequest = {
  Bucket: string;
  Key: string;
  Expires: number;
};
