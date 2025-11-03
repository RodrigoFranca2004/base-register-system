/**
 * @interface IMessageBroker
 */
export interface IMessageBroker {
  
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  /**
   * * @param exchange - The exchange (or topic) to publish to.
   * @param routingKey - The key used to route the message (e.g., event name).
   * @param message - The message payload (will be stringified).
   */
  publish(exchange: string, routingKey: string, message: any): Promise<void>;

  /**
   * * @param queue - The name of the queue to consume.
   * @param onMessage - The callback function to execute for each message.
   */
  startConsumer(queue: string, onMessage: (msg: any) => Promise<void>): Promise<void>;
}