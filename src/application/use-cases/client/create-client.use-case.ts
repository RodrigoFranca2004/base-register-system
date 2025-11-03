import { IClientRepository } from "@domain/repositories/IClientRepository";
import { ClientOutputDTO, CreateClientInputDTO } from "../../dtos/client.dto";
import { inject, injectable } from "tsyringe";

/**
 * CreateClientUseCase
 *
 * This class orchestrates the creation of a new client.
 * It contains the application-specific logic for this operation.
 */
@injectable()
export class CreateClientUseCase {
  // The use case depends on the repository *interface* (Dependency Inversion)
  constructor(
    @inject("IClientRepository")
    private clientRepository: IClientRepository
  ) {}

  /**
   * Executes the use case.
   * @param input - The DTO containing the data for the new client.
   * @returns A DTO with the newly created client's data.
   */
  async execute(input: CreateClientInputDTO): Promise<ClientOutputDTO> {
    // --- Step 1: Application-specific validation ---
    // (This is business logic that doesn't belong in the entity,
    // like checking for uniqueness before attempting to create)

    const emailExists = await this.clientRepository.findByEmail(input.email);
    if (emailExists) {
      // NOTE: For an internal-facing service, this specific error is good UX.
      // For a public-facing API, this would be a user enumeration risk.
      throw new Error("A client with this email already exists.");
    }

    // --- Step 2: Persist via the repository ---
    const newClient = await this.clientRepository.create(input);

    // --- Step 3: Map to Output DTO and return ---
    // This ensures we only return the "safe" data to the outside world.
    const output: ClientOutputDTO = {
      id: newClient.id,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      createdAt: newClient.createdAt,
      updatedAt: newClient.updatedAt,
    };

    return output;
  }
}
