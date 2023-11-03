import { HttpStatus, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class RequestBlockerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                message: "Server will not take requests"
            })
        } catch (err) {
            throw err;
        }
    }
}