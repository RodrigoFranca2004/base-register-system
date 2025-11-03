import { IClientRepository } from '@domain/repositories/IClientRepository';
import { ClientOutputDTO } from '../../dtos/client.dto';
import { ResourceNotFoundError } from '@application/errors/application-errors';


/**
 * GetClientByIdUseCase
 *
 * Fetches a single client by their unique ID.
 */
export class GetClientByIdUseCase {
  constructor(private clientRepository: IClientRepository) {}

  /**
   * Executes the use case.
   * @param id - The ID of the client to fetch.
   * @returns A DTO with the client's data.
   * @throws ClientNotFoundError if the client is not found.
   */
  async execute(id: string): Promise<ClientOutputDTO> {
    
    // --- Step 1: Fetch from the repository ---
    const client = await this.clientRepository.findById(id);

    // --- Step 2: Handle "Not Found" ---
    if (!client) {
      throw new ResourceNotFoundError('Client not found.');
    }

    // --- Step 3: Map to Output DTO and return ---
    const output: ClientOutputDTO = {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone, // Will be undefined if optional and not set
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };

    return output;
  }
}