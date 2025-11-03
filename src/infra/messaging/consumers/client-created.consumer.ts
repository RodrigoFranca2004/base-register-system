import { IMessageBroker } from '@application/providers/IMessageBroker';

export const startClientCreatedConsumer = async (broker: IMessageBroker) => {
  
  const EXCHANGE_NAME = 'client.events';
  const QUEUE_NAME = 'client.created.log'; 
  const ROUTING_KEY = 'client.created';   

  try {
    await broker.connect();
    
    const channel = (broker as any).channel; // Using 'any' because bypass was needed in RabbitMQProvider
    if (!channel) {
      throw new Error('RabbitMQ channel is not available.');
    }

    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
    
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

    console.log(`[CONSUMER] Starting consumer for queue '${QUEUE_NAME}'...`);
    await broker.startConsumer(QUEUE_NAME, async (message) => {
      console.log('[CONSUMER] Received "client.created" message:');
      console.log(JSON.stringify(message, null, 2));
    });

  } catch (error) {
    console.error(`[CONSUMER] Failed to start consumer for '${QUEUE_NAME}':`, error);
  }
};