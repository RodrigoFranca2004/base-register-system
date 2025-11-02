import { IClientRepository } from "@domain/repositories/IClientRepository";
import { Client, IClientProps } from "@domain/entities/client.entity";
import { ClientModel, IClientDocument } from "../models/client.model";
import { ClientMapper } from "../mappers/client.mapper";
import { randomUUID } from "crypto";

/**
 * Concrete implementation of IClientRepository using Mongoose.
 */
export class MongoClientRepository implements IClientRepository {
  /**
   * Creates a new client.
   */
  async create(
    data: Omit<Client, "id" | "createdAt" | "updatedAt">
  ): Promise<Client> {
    // 1. Create a new full entity using our factory
    // This generates the UUID and timestamps in the domain
    const clientEntity = Client.create(data);

    // 2. Convert to persistence format
    const persistenceData = {
      _id: clientEntity.id,
      name: clientEntity.name,
      email: clientEntity.email,
      phone: clientEntity.phone,
    };

    // 3. Save to database
    const newDoc = await ClientModel.create(persistenceData);

    // 4. Return the entity (we can just return clientEntity)
    // Or we can map back from newDoc, which confirms DB state
    return ClientMapper.toDomain(newDoc);
  }

  /**
   * Finds a client by its ID.
   */
  async findById(id: string): Promise<Client | null> {
    const doc = await ClientModel.findById(id).exec();
    if (!doc) {
      return null;
    }
    return ClientMapper.toDomain(doc);
  }

  /**
   * Retrieves all clients.
   */
  async findAll(): Promise<Client[]> {
    const docs = await ClientModel.find().exec();
    // Map each document to a domain entity
    return docs.map(ClientMapper.toDomain);
  }

  /**
   * Updates an existing client by its ID.
   */
  async update(
    id: string,
    data: Partial<IClientProps>
  ): Promise<Client | null> {
    // Find and update, and return the *new* document
    const updatedDoc = await ClientModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        timestamps: true,
      } // 'new: true' returns the modified document
    ).exec();

    if (!updatedDoc) {
      return null;
    }
    return ClientMapper.toDomain(updatedDoc);
  }

  /**
   * Deletes a client by its ID.
   */
  async delete(id: string): Promise<void> {
    await ClientModel.findByIdAndDelete(id).exec();
  }

  // --- Specific Method Implementation ---

  /**
   * Finds a client by their email address.
   */
  async findByEmail(email: string): Promise<Client | null> {
    const doc = await ClientModel.findOne({ email: email }).exec();
    if (!doc) {
      return null;
    }
    return ClientMapper.toDomain(doc);
  }
}
