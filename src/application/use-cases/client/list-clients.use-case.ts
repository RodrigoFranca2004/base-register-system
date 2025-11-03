import { IClientRepository } from "@domain/repositories/IClientRepository";
import { ClientOutputDTO } from "../../dtos/client.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListClientsUseCase {
  constructor(
    @inject("IClientRepository")
    private clientRepository: IClientRepository
  ) {}

  async execute(): Promise<ClientOutputDTO[]> {
    // --- Step 1: Fetch all from the repository ---
    const clients = await this.clientRepository.findAll();

    // --- Step 2: Map each entity to an Output DTO ---
    const output: ClientOutputDTO[] = clients.map((client) => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }));

    return output;
  }
}
