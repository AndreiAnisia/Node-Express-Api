import express from 'express';
import handleAuthentication from '../controllers/authController';
import { rateLimiterUsingThirdParty } from '../middleware/rateLimiter';
const router = express.Router();

router.post('/', rateLimiterUsingThirdParty, handleAuthentication);

module.exports = router;
