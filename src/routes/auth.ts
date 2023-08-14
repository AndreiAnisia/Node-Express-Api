import express from 'express';
import handleAuthentication from '../controllers/authController';
const router = express.Router();

router.post('/', handleAuthentication);

module.exports = router;
