import allowedOrigins from "./allowedOrigins";

const corsOptions = {
    origin: (origin: string, callback: Function) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200
};

export default corsOptions;
