import rateLimit from 'express-rate-limit';

export const rateLimiterUsingThirdParty = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'You have exceeded the 5 requests in 60 minutes limit!',
    standardHeaders: true,
    legacyHeaders: false,
});
