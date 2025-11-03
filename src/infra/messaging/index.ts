import amqp, { Channel } from "amqplib";

class RabbitMQConnection {
  private connection: any | null = null;
  private channel: any | null = null;

  private readonly uri: string;

  constructor() {
    this.uri = process.env.RABBITMQ_URI || "amqp://guest:guest@localhost:5672";
    if (!this.uri) {
      throw new Error("[RABBITMQ] URI is not defined in .env");
    }
  }

  async connect(): Promise<void> {
    if (this.connection && this.channel) {
      return;
    }

    try {
      console.log("[RABBITMQ] Connecting to RabbitMQ server...");

      const newConnection = await amqp.connect(this.uri);
      const newChannel = await newConnection.createChannel();

      newConnection.on("close", () => {
        console.error("[RABBITMQ] Connection closed.");
        this.connection = null;
        this.channel = null;
      });

      newConnection.on("error", (err) => {
        console.error("[RABBITMQ] Connection error:", err.message);
      });

      this.connection = newConnection;
      this.channel = newChannel;

      console.log("[RABBITMQ] Successfully connected and channel created.");
    } catch (error) {
      console.error("[RABBITMQ] Failed to connect:", error);
      this.connection = null;
      this.channel = null;
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }
      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }
      console.log("[RABBITMQ] Disconnected successfully.");
    } catch (error) {
      console.error("[RABBITMQ] Error during disconnection:", error);
    }
  }

  getChannel(): any {
    if (!this.channel) {
      throw new Error("[RABBITMQ] No channel available. Must connect first.");
    }
    return this.channel;
  }
}

export const rabbitMQConnection = new RabbitMQConnection();
