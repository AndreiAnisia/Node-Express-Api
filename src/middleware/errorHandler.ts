import { ErrorMiddleware } from "../config/types";

const errorHandler: ErrorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
};

export default errorHandler;
