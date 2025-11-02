import { Client, IClientProps } from '@domain/entities/client.entity';
import { IClientDocument } from '../models/client.model';
import { BaseEntity } from '@domain/entities/base.entity';

export class ClientMapper {

  /**
   * Converts a Mongoose document (DB format) to a domain entity.
   * @param doc - The Mongoose document.
   * @returns A Client entity instance.
   */
  public static toDomain(doc: IClientDocument): Client {
    // These are the properties specific to the Client
    const clientProps: IClientProps = {
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
    };

    // These are the base properties (id and timestamps)
    const baseProps: BaseEntity = {
      id: doc._id, // Map Mongoose's _id to our domain's id
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };

    // Use the 'restore' factory method to create an existing entity
    return Client.restore(clientProps, baseProps);
  }

  /**
   * Converts a domain entity to a plain object suitable for Mongoose.
   * (e.g., for creation or updates)
   * @param entity - The Client entity.
   * @returns A plain object.
   */
  public static toPersistence(entity: Client): any {
    return {
      _id: entity.id, 
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}