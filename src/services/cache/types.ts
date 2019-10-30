export interface CacheDriver {
  add(key: string, value: any, ttl: number): Cache | undefined;
  get(key: string): Cache | undefined;
}

export type Cache = {
  [key: string]: any;
};
