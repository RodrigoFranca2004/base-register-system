import { BaseEntity } from '../entities/base.entity';

/**
 * Interface IBaseRepository<T>
 *
 * Defines the contract for generic CRUD (Create, Read, Update, Delete) operations.
 * All specific repositories (e.g., IClientRepository) should implement this.
 *
 * @template T - The entity type, which must extend BaseEntity.
 */
export interface IBaseRepository<T extends BaseEntity> {
  
  /**
   * Creates a new entity.
   * @param data - The data for the new entity.
   * @returns A promise that resolves to the created entity.
   */
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;

  /**
   * Finds an entity by its ID.
   * @param id - The ID of the entity.
   * @returns A promise that resolves to the entity or null if not found.
   */
  findById(id: string): Promise<T | null>;

  /**
   * Retrieves all entities.
   * @returns A promise that resolves to an array of all entities.
   */
  findAll(): Promise<T[]>;

  /**
   * Updates an existing entity by its ID.
   * @param id - The ID of the entity to update.
   * @param data - The partial data to update.
   * @returns A promise that resolves to the updated entity or null if not found.
   */
  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T | null>;

  /**
   * Deletes an entity by its ID.
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delete(id: string): Promise<void>;
}