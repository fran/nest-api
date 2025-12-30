export const envConfig = () => ({
  port: process.env.PORT ?? 3000,
  mongoUri: process.env.MONGO_URI,
  environment: process.env.NODE_ENV ?? 'dev',
  defaultLimit: process.env.DEFAULT_LIMIT || 5,
});
