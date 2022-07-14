export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME || 'analytics',
  },
  rabbitmq: {
    uri: process.env.RABBIT_URI,
    topic: process.env.RABBIT_TOPIC || 'metrics',
  },
});
