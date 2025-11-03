import { injectable } from 'tsyringe';
import { ICacheProvider } from '@application/providers/ICacheProvider';
import { redisClient } from './index'; 

@injectable()
export class RedisCacheProvider implements ICacheProvider {
  
  private client = redisClient; 


  async save(key: string, value: any, expiresInSeconds?: number): Promise<void> {
    const stringValue = JSON.stringify(value);

    if (expiresInSeconds) {
      await this.client.set(key, stringValue, 'EX', expiresInSeconds);
    } else {
      await this.client.set(key, stringValue);
    }
  }

  async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    return value;
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}