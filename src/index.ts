import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./clients/sequelize";
import { userRouter } from './routes/users';
import { taskRouter } from "./routes/tasks";
import * as dotenv from 'dotenv';
import { requestLoggerMiddleware } from "./middleware/requestLogger";
import { logger } from "./winstonLogger";

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT as string);

app.use(bodyParser.json());
app.use(requestLoggerMiddleware);
app.use('/user', userRouter);
app.use('/task', taskRouter);


(async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
        await sequelize.sync();
        logger.info('Models synced successfully.');
    } catch (error) {
        logger.error(`Database could not initiate: ${JSON.stringify(error)}`);
    }
})();

if (isNaN(port) || port < 0 || port > 65535) {
    throw new Error('Invalid port number in PORT environment variable.');
}

app.listen(port, () => logger.info(`Server started at ${3000}`));