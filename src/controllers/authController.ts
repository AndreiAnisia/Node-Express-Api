import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/User';
import { Credentials, CustomController } from '../config/types';

const handleAuthentication: CustomController = async (req, res) => {
    const { username, password }: Credentials = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
        return res.status(401).json({ 'message': 'User not found!' });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "password": foundUser.password,
                    roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '5m' }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "1d" }
        )

        foundUser.refreshToken = refreshToken;
        await foundUser.save()

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

export default handleAuthentication;
