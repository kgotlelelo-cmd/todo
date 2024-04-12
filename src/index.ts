import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./clients/sequelize";
import { userRouter } from './routes/users';
import { taskRouter } from "./routes/tasks";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT as string);

app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/task', taskRouter);


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Models synced successfully.');
    } catch (error) {
        console.error('Error syncing or Failed to connect:', error);
    }
})();

if (isNaN(port) || port < 0 || port > 65535) {
    throw new Error('Invalid port number in PORT environment variable.');
}

app.listen(port, () => console.log(`Server started at ${3000}`));