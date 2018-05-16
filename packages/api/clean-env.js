// This module ensures that the environment variables are configured correctly
const envalid = require('envalid');

envalid.cleanEnv(process.env, {
  API_TOKEN_SECRET: envalid.str({ desc: 'Secret used to hash passwords' }),
  PRISMA_ENDPOINT: envalid.str({ desc: 'Endpoint of Prisma server' }),
  PRISMA_SECRET: envalid.str({
    desc: 'Secret of Prisma server - defined in prisma.yml',
  }),
});
