import { container } from 'tsyringe';

// --- Domain Repositories ---
import { IClientRepository } from '@domain/repositories/IClientRepository';
import { MongoClientRepository } from '@infra/database/mongodb/repositories/MongoClientRepository';

// --- Use Cases ---
// We need to register the use cases themselves so the controllers can ask for them
import { CreateClientUseCase } from '@application/use-cases/client/create-client.use-case';
import { GetClientByIdUseCase } from '@application/use-cases/client/get-client-by-id.use-case';
import { ListClientsUseCase } from '@application/use-cases/client/list-clients.use-case';
import { UpdateClientUseCase } from '@application/use-cases/client/update-client.use-case';
import { DeleteClientUseCase } from '@application/use-cases/client/delete-client.use-case';

/*
 * --- REPOSITORY REGISTRATION ---
 *
 * We are telling the container:
 * "When someone asks for (injects) 'IClientRepository',
 * give them a single instance (singleton) of MongoClientRepository."
 */
container.registerSingleton<IClientRepository>(
  'IClientRepository', // This is the "token" we will inject
  MongoClientRepository
);

/*
 * --- USE CASE REGISTRATION ---
 *
 * We register all use cases so they can be resolved by the controller.
 * Since they have their own dependencies (IClientRepository),
 * tsyringe will automatically inject the repository *into* the use case.
 */
container.register('CreateClientUseCase', CreateClientUseCase);
container.register('GetClientByIdUseCase', GetClientByIdUseCase);
container.register('ListClientsUseCase', ListClientsUseCase);
container.register('UpdateClientUseCase', UpdateClientUseCase);
container.register('DeleteClientUseCase', DeleteClientUseCase);