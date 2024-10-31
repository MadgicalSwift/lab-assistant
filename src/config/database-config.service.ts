// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User } from 'src/model/user.entity';
// import * as dotenv from 'dotenv';
// dotenv.config();
// export const databaseConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: 3306,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATA_BASE,
//   entities: [User],
//   synchronize: true,
// };

import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';

const { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env;

export const dynamoDBClient = (): DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });
};
