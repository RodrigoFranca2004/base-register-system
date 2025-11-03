import { IClientRepository } from "@domain/repositories/IClientRepository";
import { ClientOutputDTO, UpdateClientInputDTO } from "../../dtos/client.dto";
import {
  ResourceNotFoundError,
  BusinessRuleError,
} from "../../errors/application-errors";
import { injectable, inject } from "tsyringe";
import { ICacheProvider } from "@application/providers/ICacheProvider";

@injectable()
export class UpdateClientUseCase {
  private readonly cacheKeyPrefix = "client";

  constructor(
    @inject("IClientRepository")
    private clientRepository: IClientRepository,

    @inject("ICacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute(
    id: string,
    input: UpdateClientInputDTO
  ): Promise<ClientOutputDTO> {
    if (input.email) {
      const emailExists = await this.clientRepository.findByEmail(input.email);
      if (emailExists && emailExists.id !== id) {
        throw new BusinessRuleError(
          "This email is already in use by another client."
        );
      }
    }

    const updatedClient = await this.clientRepository.update(id, input);

    if (!updatedClient) {
      throw new ResourceNotFoundError("Client not found.");
    }

    try {
      const cacheKey = `${this.cacheKeyPrefix}:${id}`;
      await this.cacheProvider.invalidate(cacheKey);
      console.log(`[CACHE] Invalidated cache for key: ${cacheKey}`);
    } catch (error) {
      console.warn("[CACHE] Failed to invalidate cache.", error);
    }

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
