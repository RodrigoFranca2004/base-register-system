import { IClientRepository } from "@domain/repositories/IClientRepository";
import { Client, IClientProps } from "@domain/entities/client.entity";
import { ClientModel, IClientDocument } from "../models/client.model";
import { ClientMapper } from "../mappers/client.mapper";
import { injectable } from "tsyringe";

@injectable()
export class MongoClientRepository implements IClientRepository {
  async create(
    data: Omit<Client, "id" | "createdAt" | "updatedAt">
  ): Promise<Client> {
    const clientEntity = Client.create(data);

    const persistenceData = {
      _id: clientEntity.id,
      name: clientEntity.name,
      email: clientEntity.email,
      phone: clientEntity.phone,
    };

    const newDoc = await ClientModel.create(persistenceData);

    return ClientMapper.toDomain(newDoc);
  }

  async findById(id: string): Promise<Client | null> {
    const doc = await ClientModel.findById(id).exec();
    if (!doc) {
      return null;
    }
    return ClientMapper.toDomain(doc);
  }

  async findAll(): Promise<Client[]> {
    const docs = await ClientModel.find().exec();
    return docs.map(ClientMapper.toDomain);
  }

  async update(
    id: string,
    data: Partial<IClientProps>
  ): Promise<Client | null> {
    const updatedDoc = await ClientModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        timestamps: true,
      } 
    ).exec();

    if (!updatedDoc) {
      return null;
    }
    return ClientMapper.toDomain(updatedDoc);
  }

  async delete(id: string): Promise<Client | null> {
    const deletedDoc = await ClientModel.findByIdAndDelete(id).exec();

    if (!deletedDoc) {
      return null;
    }

    return ClientMapper.toDomain(deletedDoc);
  }


  async findByEmail(email: string): Promise<Client | null> {
    const doc = await ClientModel.findOne({ email: email }).exec();
    if (!doc) {
      return null;
    }
    return ClientMapper.toDomain(doc);
  }
}
