import { Client } from "@domain/entities/client.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IClientRepository extends IBaseRepository<Client> {

  /**
   * @param email - The email to search for.
   * @returns A promise that resolves to the Client or null if not found.
   */
  findByEmail(email: string): Promise<Client | null>;
}