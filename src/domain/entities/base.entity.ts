import { randomUUID } from 'crypto';

/**
 * Abstract class BaseEntity
 *
 * This class serves as the foundation for all domain entities.
 * It provides common properties like id, createdAt, and updatedAt.
 *
 * @property id - The unique identifier for the entity (defaults to a UUID).
 * @property createdAt - The timestamp when the entity was created.
 * @property updatedAt - The timestamp when the entity was last updated.
 */
export abstract class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: Omit<BaseEntity, 'id'>, id?: string) {
    this.id = id ?? randomUUID();
    
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}