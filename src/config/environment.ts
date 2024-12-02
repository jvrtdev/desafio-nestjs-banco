export const environment = {
  DATABASE_HOST: String(process.env.DATABASE_HOST),
  DATABASE_USERNAME: String(process.env.DATABASE_USERNAME),
  DATABASE_PASSWORD: String(process.env.DATABASE_PASSWORD),
  DATABASE_NAME: String(process.env.DATABASE_NAME),
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
  JWT_SECRET: String(process.env.JWT_SECRET),
};
