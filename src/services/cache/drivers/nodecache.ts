import { CacheDriver, Cache as CacheObj } from '@services/cache/types';
import NodeCache from 'node-cache';

export class NodeCacheDriver implements CacheDriver {
  private cache: NodeCache.NodeCache;
  constructor() {
    this.cache = new NodeCache();
  }

  add(key: string, value: any, ttl: number): CacheObj | undefined {
    this.cache.set(key, value, ttl);

    return this.get(key);
  }

  get(key: string): CacheObj | undefined {
    return this.cache.get(key);
  }
}
