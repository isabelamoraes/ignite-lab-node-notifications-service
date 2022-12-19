import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

export const UPSTASH_KAFKA_BROKERS = 'SET_YOUR_UPSTASH_KAFKA_BROKERS';
export const UPSTASH_KAFKA_USERNAME = 'SET_YOUR_UPSTASH_KAFKA_USERNAME';
export const UPSTASH_KAFKA_PASSWORD = 'SET_YOUR_UPSTASH_KAFKA_PASSWORD';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: [UPSTASH_KAFKA_BROKERS],
    sasl: {
      mechanism: 'scram-sha-256',
      username: UPSTASH_KAFKA_USERNAME,
      password: UPSTASH_KAFKA_PASSWORD,
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications-send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
