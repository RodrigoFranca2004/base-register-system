import { BaseEntity } from '../entities/base.entity';

/**
 * @template T - The entity type, which must extend BaseEntity.
 */
export interface IBaseRepository<T extends BaseEntity> {
  
  /**
   * @param data - The data for the new entity.
   * @returns A promise that resolves to the created entity.
   */
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;

  /**
   * @param id - The ID of the entity.
   * @returns A promise that resolves to the entity or null if not found.
   */
  findById(id: string): Promise<T | null>;

  /**
   * @returns A promise that resolves to an array of all entities.
   */
  findAll(): Promise<T[]>;

  /**
   * @param id - The ID of the entity to update.
   * @param data - The partial data to update.
   * @returns A promise that resolves to the updated entity or null if not found.
   */
  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T | null>;

  /**
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delete(id: string): Promise<T | null>;
}