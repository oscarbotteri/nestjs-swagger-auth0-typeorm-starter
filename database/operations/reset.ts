/* eslint-disable no-console */

import config from '../typeorm.config';

const run = async () => {
  const connection = await config.initialize();
  await connection.dropDatabase();
};

run().then(() => {
  console.log('DB reset!');
  process.exit();
});
