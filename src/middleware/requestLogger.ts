import { RequestHandler } from "express";
import { logger } from "../winstonLogger";

export const requestLoggerMiddleware: RequestHandler = async (req, res, next) => {

    logger.info(`[${req.method}] ${req.url}`);
    const originalSend = res.send;

    res.send = function (body) {
        logger.info(`[${req.method}] ${req.url} - ${res.statusCode}`);
        return originalSend.call(this, body);
    };

    next();
};