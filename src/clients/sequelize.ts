import { Sequelize } from  '@sequelize/core';
import { User } from '../models/user';
import { Task } from '../models/task';
import * as dotenv from 'dotenv';

dotenv.config();

const name = process.env.DB_NAME as string;
const username = process.env.BD_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const host = process.env.DB_HOST as string;

export const sequelize = new Sequelize(name, username, password,{
    dialect: 'postgres',
    host: host,
    models: [User,Task]
});