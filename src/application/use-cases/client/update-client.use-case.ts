import { IClientRepository } from "@domain/repositories/IClientRepository";
import { ClientOutputDTO, UpdateClientInputDTO } from "../../dtos/client.dto";
import { ResourceNotFoundError } from "@application/errors/application-errors";
import { inject, injectable } from "tsyringe";

/**
 * UpdateClientUseCase
 *
 * Updates an existing client's information.
 */
@injectable()
export class UpdateClientUseCase {
  constructor(
    @inject("IClientRepository")
    private clientRepository: IClientRepository
  ) {}

  /**
   * Executes the use case.
   * @param id - The ID of the client to update.
   * @param input - The DTO with data to update (all fields optional).
   * @returns A DTO with the updated client's data.
   * @throws ClientNotFoundError if the client is not found.
   */
  async execute(
    id: string,
    input: UpdateClientInputDTO
  ): Promise<ClientOutputDTO> {
    // --- Step 1: Check for email uniqueness (if email is being changed) ---
    if (input.email) {
      const emailExists = await this.clientRepository.findByEmail(input.email);
      // Check if email exists AND belongs to a *different* client
      if (emailExists && emailExists.id !== id) {
        throw new Error("This email is already in use by another client.");
      }
    }

    // --- Step 2: Perform the update via the repository ---
    // The repository's 'update' method finds and updates atomically
    const updatedClient = await this.clientRepository.update(id, input);

    // --- Step 3: Handle "Not Found" ---
    if (!updatedClient) {
      throw new ResourceNotFoundError("Client not found.");
    }

    // --- Step 4: Map to Output DTO and return ---
    const output: ClientOutputDTO = {
      id: updatedClient.id,
      name: updatedClient.name,
      email: updatedClient.email,
      phone: updatedClient.phone,
      createdAt: updatedClient.createdAt,
      updatedAt: updatedClient.updatedAt,
    };

    return output;
  }
}
