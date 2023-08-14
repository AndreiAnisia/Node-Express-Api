import { CustomController } from "../config/types";
import User from "../model/User";

const handleLogout: CustomController = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies) {
        return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser?.refreshToken) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204)
    }

    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
};

export default handleLogout;
