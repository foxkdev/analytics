export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.DB_URI,
  },
  rabbitmq: {
    uri: process.env.RABBIT_URI,
    topic: process.env.RABBIT_TOPIC || 'metrics',
  },
});
