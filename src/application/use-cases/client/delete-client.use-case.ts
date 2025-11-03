import { IClientRepository } from '@domain/repositories/IClientRepository';
import { ClientOutputDTO } from '@application/dtos/client.dto';
import { ResourceNotFoundError } from '../../errors/application-errors';
import { injectable, inject } from 'tsyringe';
import { ICacheProvider } from '@application/providers/ICacheProvider'; 

@injectable()
export class DeleteClientUseCase {
  
  private readonly cacheKeyPrefix = 'client';

  constructor(
    @inject('IClientRepository') 
    private clientRepository: IClientRepository,
    
    @inject('ICacheProvider') 
    private cacheProvider: ICacheProvider
  ) {}

  async execute(id: string): Promise<ClientOutputDTO> {
    
    const deletedClient = await this.clientRepository.delete(id);

    if (!deletedClient) {
      throw new ResourceNotFoundError('Client to be deleted not found.');
    }

    try {
      const cacheKey = `${this.cacheKeyPrefix}:${id}`;
      await this.cacheProvider.invalidate(cacheKey);
      console.log(`[CACHE] Invalidated cache for key: ${cacheKey}`);
    } catch (error) {
      console.warn('[CACHE] Failed to invalidate cache.', error);
    }

    const output: ClientOutputDTO = {
      id: deletedClient.id,
      name: deletedClient.name,
      email: deletedClient.email,
      phone: deletedClient.phone,
      createdAt: deletedClient.createdAt,
      updatedAt: deletedClient.updatedAt,
    };

    return output;
  }
}