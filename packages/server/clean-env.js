// This module ensures that the environment variables are configured correctly
import envalid from 'envalid';

envalid.cleanEnv(process.env, {
  API_ENDPOINT: envalid.str({ desc: 'URL where packages/api is running' }),
});
