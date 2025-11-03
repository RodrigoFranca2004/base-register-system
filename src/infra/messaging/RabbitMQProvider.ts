import { injectable } from "tsyringe";
import { IMessageBroker } from "@application/providers/IMessageBroker";
import { rabbitMQConnection } from "./index";

// NOTA: type 'any' is being utilized because ts was having problems compiling this code 

@injectable()
export class RabbitMQProvider implements IMessageBroker {
  private channel: any | null = null;

  async connect(): Promise<void> {
    await rabbitMQConnection.connect();
    this.channel = rabbitMQConnection.getChannel();
  }

  async disconnect(): Promise<void> {
    await rabbitMQConnection.disconnect();
  }

  async publish(
    exchange: string,
    routingKey: string,
    message: any
  ): Promise<void> {
    if (!this.channel) {
      throw new Error("[RABBITMQ] Cannot publish. Not connected.");
    }

    await this.channel.assertExchange(exchange, "direct", { durable: true });
    const bufferMessage = Buffer.from(JSON.stringify(message));

    console.log(
      `[RABBITMQ] Publishing message to exchange '${exchange}' with key '${routingKey}'`
    );
    this.channel.publish(exchange, routingKey, bufferMessage, {
      persistent: true,
    });
  }

  async startConsumer(
    queue: string,
    onMessage: (msg: any) => Promise<void>
  ): Promise<void> {
    if (!this.channel) {
      throw new Error("[RABBITMQ] Cannot consume. Not connected.");
    }

    await this.channel.assertQueue(queue, { durable: true });
    console.log(`[RABBITMQ] Starting consumer on queue '${queue}'...`);

    this.channel.consume(
      queue,
      async (msg: any) => {
        if (msg) {
          try {
            console.log(`[RABBITMQ] Received message from queue '${queue}'`);
            const content = JSON.parse(msg.content.toString());
            await onMessage(content);

            this.channel?.ack(msg);
          } catch (error) {
            console.error("[RABBITMQ] Error processing message:", error);
            this.channel?.nack(msg, false, false);
          }
        }
      },
      { noAck: false }
    );
  }
}
