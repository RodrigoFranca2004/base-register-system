import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientUseCase } from '@application/use-cases/client/create-client.use-case';
import { GetClientByIdUseCase } from '@application/use-cases/client/get-client-by-id.use-case';
import { ListClientsUseCase } from '@application/use-cases/client/list-clients.use-case';
import { UpdateClientUseCase } from '@application/use-cases/client/update-client.use-case';
import { DeleteClientUseCase } from '@application/use-cases/client/delete-client.use-case';
import { BusinessRuleError, ResourceNotFoundError } from '@application/errors/application-errors';

/**
 * ClientController
 *
 * Handles all HTTP requests related to Clients.
 */
export class ClientController {

  /**
   * POST /clients
   * Creates a new client.
   */
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      // 1. Resolve the use case from the container
      const createClientUseCase = container.resolve(CreateClientUseCase);
      
      // 2. Execute the use case with validated input (DTO)
      const client = await createClientUseCase.execute(req.body);

      // 3. Return a successful HTTP response
      return res.status(201).json(client);

    } catch (error) {
      // 4. Handle errors by checking their type
      if (error instanceof BusinessRuleError) {
        return res.status(400).json({ message: error.message }); // 400 Bad Request
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * GET /clients/:id
   * Gets a client by ID.
   */
  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const getClientByIdUseCase = container.resolve(GetClientByIdUseCase);
      const client = await getClientByIdUseCase.execute(id);
      
      return res.status(200).json(client);

    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message }); // 404 Not Found
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * GET /clients
   * Lists all clients.
   */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const listClientsUseCase = container.resolve(ListClientsUseCase);
      const clients = await listClientsUseCase.execute();
      
      return res.status(200).json(clients);

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * PUT /clients/:id
   * Updates a client.
   */
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updateClientUseCase = container.resolve(UpdateClientUseCase);
      const updatedClient = await updateClientUseCase.execute(id, data);
      
      return res.status(200).json(updatedClient);

    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message }); // 404 Not Found
      }
      if (error instanceof BusinessRuleError) {
        return res.status(400).json({ message: error.message }); // 400 Bad Request
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * DELETE /clients/:id
   * Deletes a client.
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleteClientUseCase = container.resolve(DeleteClientUseCase);

      const deletedClient = await deleteClientUseCase.execute(id);
      
      return res.status(200).json(deletedClient);

    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message }); // 404 Not Found
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}