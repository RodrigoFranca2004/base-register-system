import { IClientRepository } from '@domain/repositories/IClientRepository';
import { ResourceNotFoundError } from '@application/errors/application-errors';

/**
 * DeleteClientUseCase
 *
 * Deletes a client by their unique ID.
 */
export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  /**
   * Executes the use case.
   * @param id - The ID of the client to delete.
   * @returns A promise that resolves to void.
   * @throws ResourceNotFoundError if the client to be deleted is not found.
   */
  async execute(id: string): Promise<void> {
    
    // --- Step 1: Check if the client exists before deleting ---
    // This provides a clear error message vs. just deleting nothing.
    const clientExists = await this.clientRepository.findById(id);
    if (!clientExists) {
      throw new ResourceNotFoundError('Client not found');
    }

    // --- Step 2: Delete from the repository ---
    await this.clientRepository.delete(id);
  }
}