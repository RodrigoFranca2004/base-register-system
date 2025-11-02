import { BaseEntity } from "./base.entity";

export interface IClientProps {
    name: string;
    email: string;
    phone: string;
}

export class Client extends BaseEntity {
    public name: string;
    public email: string;
    public phone: string;

    /**
   * @param props - The properties of the client (IClientProps).
   * @param baseProps - The base entity properties (timestamps).
   * @param id - (Optional) The unique identifier.
   */
  private constructor(
    props: IClientProps,
    baseProps: Omit<BaseEntity, 'id'>,
    id?: string
  ) {
    // Parent (BaseEntity) constructor
    super(baseProps, id); 
    
    // Client-specific properties
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
  }

  /**
   * @param props - The properties for the new client.
   * @returns A new instance of Client.
   */
  public static create(props: IClientProps): Client {
    
    const baseProps: Omit<BaseEntity, 'id'> = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Creates a new client with a new UUID
    return new Client(props, baseProps);
  }


  /**
   * @param props - The properties for the existing client.
   * @param baseProps - The base entity properties (id, timestamps).
   * @returns An instance of an existing Client.
   */
  public static restore(
    props: IClientProps,
    baseProps: BaseEntity
  ): Client {
    // Re-creates an existing client with its existing ID and timestamps
    return new Client(props, baseProps, baseProps.id);
  }
}