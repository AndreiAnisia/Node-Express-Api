import allowedOrigins from "../config/allowedOrigins";
import { CustomMiddleware } from "../config/types";


const credentials: CustomMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials');
    }
    next();
}

export default credentials;
