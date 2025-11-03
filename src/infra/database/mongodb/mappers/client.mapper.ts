import { Client, IClientProps } from '@domain/entities/client.entity';
import { IClientDocument } from '../models/client.model';
import { BaseEntity } from '@domain/entities/base.entity';

export class ClientMapper {

  /**
   * @param doc - The Mongoose document.
   * @returns A Client entity instance.
   */
  public static toDomain(doc: IClientDocument): Client {
    const clientProps: IClientProps = {
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
    };

    const baseProps: BaseEntity = {
      id: doc._id, 
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };

    return Client.restore(clientProps, baseProps);
  }

  /**
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