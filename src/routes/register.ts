import express from 'express';
import handleRegister from '../controllers/registerController';

const router = express.Router();

router.post('/', handleRegister);

module.exports = router;
