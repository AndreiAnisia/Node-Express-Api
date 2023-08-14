import { Credentials, CustomController } from '../config/types';
import bcrypt from 'bcrypt';
import User from '../model/User';

const saltRounds = 10;

const handleRegister: CustomController = async (req, res) => {
    const { username, password }: Credentials = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) {
        return res.status(409).json({ 'message': 'Username already used.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({
            username,
            password: hashedPassword,
        });

        res.status(201).json({ 'message': `New user ${username} created!` });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ 'message': err.message })
        }
    }
}

export default handleRegister;
