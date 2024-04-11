import { Sequelize } from  '@sequelize/core';

export const sequelize = new Sequelize('databsename', 'username', 'password',{
    dialect: 'postgres',
    host: 'localhost'
})