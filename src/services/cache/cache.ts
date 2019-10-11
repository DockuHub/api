import { CacheDriver, Cache as CacheObj } from '@services/cache/types';
import { NodeCacheDriver } from '@services/cache/drivers';

const { NODE_ENV } = process.env;

export class Cache implements CacheDriver {
  protected cache: CacheDriver;
  constructor() {
    // Will return the same node cache for now
    // TODO Add redis driver
    this.cache =
      NODE_ENV === 'production' ? new NodeCacheDriver() : new NodeCacheDriver();
  }

  add(key: string, value: any, ttl: number): CacheObj | undefined {
    return this.cache.add(key, value, ttl);
  }

  get(key: string): CacheObj | undefined {
    return this.get(key);
  }
}
