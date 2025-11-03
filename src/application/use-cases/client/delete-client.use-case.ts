import { IClientRepository } from "@domain/repositories/IClientRepository";
import { ResourceNotFoundError } from "@application/errors/application-errors";
import { inject, injectable } from "tsyringe";
import { ClientOutputDTO } from "@application/dtos/client.dto";

/**
 * DeleteClientUseCase
 *
 * Deletes a client by their unique ID.
 */
@injectable()
export class DeleteClientUseCase {
  constructor(
    @inject("IClientRepository")
    private clientRepository: IClientRepository
  ) {}

  /**
   * Executes the use case.
   * @param id - The ID of the client to delete.
   * @returns A DTO with the deleted client's data.
   * @throws ResourceNotFoundError if the client to be deleted is not found.
   */
  async execute(id: string): Promise<ClientOutputDTO> {
    
    const deletedClient = await this.clientRepository.delete(id);

    if (!deletedClient) {
      throw new ResourceNotFoundError('Client to be deleted not found.');
    }

    const output: ClientOutputDTO = {
      id: deletedClient.id,
      name: deletedClient.name,
      email: deletedClient.email,
      phone: deletedClient.phone,
      createdAt: deletedClient.createdAt,
      updatedAt: deletedClient.updatedAt,
    };

    // 4. Retorne o DTO
    return output;
  }
}
