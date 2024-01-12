/* eslint-disable no-console */

import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

export const usersSeed = async (source: DataSource) => {
  console.log('Running users seed');

  const data = new Array(5).fill(null).map(() => ({
    id: undefined,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
  }));

  source
    .createQueryBuilder()
    .insert()
    .into('users')
    .values(data.flat())
    .execute();
};
