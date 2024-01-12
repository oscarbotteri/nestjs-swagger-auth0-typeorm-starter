/* eslint-disable no-console */

import config from '../typeorm.config';
import { usersSeed } from './users';

async function main() {
  const connection = await config.initialize();

  await Promise.all([usersSeed(connection)]);
}

main()
  .catch((e) => console.error(e))
  .then(() => console.log('Seeds done'));
