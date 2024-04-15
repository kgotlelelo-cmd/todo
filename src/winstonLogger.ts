import winston, { createLogger, format } from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch'

const isProduction = process.env.NODE_ENV === 'production';

const fileFormatter = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
    ),
    transports: [
        isProduction
            ? new WinstonCloudWatch({
                logGroupName: 'todo',
                logStreamName: 'todos',
                awsOptions: {
                    region: 'regions',
                    credentials: {
                        accessKeyId: "",
                        secretAccessKey: ""
                    }
                },
                messageFormatter: ({ level, message }) => {
                    return `[${level}] : ${message}}`;
                }
            }) : new winston.transports.File({
                filename: 'combined.log',
                format: format.combine(
                    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    fileFormatter
                )
            })
    ]
});