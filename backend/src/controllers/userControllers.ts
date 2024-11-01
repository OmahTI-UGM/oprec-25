import { Request, Response } from "express";
import { generateTokens, verifyToken, setCookies } from "@utils/jwt";
import { COOKIE_CONFIG, JWT_CONFIG } from "@config/jwtcookies";
import User from '@/models/userModels';
import { IGetRequestWithUser } from "@/types/getUserRequest";
import { IWawancara } from "@/types/IWawancara";
import { randomBytes } from "crypto";
import { resetEmail } from "@utils/resetEmail";
export const register = async (req: Request, res: Response): Promise<void> => {
    try{
        const {email, username, password, NIM} = req.body;
        const existingUser = await User.findOne({$or: [ {email}, {username} ]}).lean();
        if (existingUser){ 
            res.status(400).json({message: "User exists"}) 
            return;
        }

        const userData = {email, username, password, NIM, isAdmin: false};
        const user = await User.create(userData);

        const tokens = generateTokens({
            userId: user.id,
            username: user.username,
            NIM: user.NIM,
            isAdmin: user.isAdmin
        })
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        setCookies(res, tokens, COOKIE_CONFIG);

        res.status(201).json({
            message: "User created",
            user: {...user.toObject(), password: undefined}
        })
        return;
    } catch (err) {
        res.status(500).json({message: "Registration error"});
        return;
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user){  
            res.status(401).json({message: "Invalid credentials"}) 
            return;
        }
        const isValidPassword = await user.comparePassword(password);
        if(!isValidPassword){
            res.status(401).json({message: "Invalid credentials"})
            return;
        };
        const tokens = generateTokens({
            userId: user.id,
            username: user.username,
            NIM: user.NIM,
            isAdmin: user.isAdmin
        })
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        setCookies(res, tokens, COOKIE_CONFIG);

         res.status(201).json({
            message: "Login successful",
            user: {...user.toObject(), password: undefined}
        })
        return;
    } catch (err) {
         res.status(500).json({message: "Auth error"});
         return;
    }
}

export const refresh = async (req: Request, res: Response): Promise<void> => {
    try{
        const refreshToken = req.cookies['refreshToken'];
        if(!refreshToken) {
            res.status(401).json({message: "No refresh token"})
            return;
        };
        const user = await User.findOne({refreshToken});
        if(!user){
            res.status(401).json({message: "Invalid refresh token"})
            return;
        }
        const decoded = verifyToken(refreshToken, JWT_CONFIG.REFRESH_TOKEN_SECRET);

        const tokens = generateTokens({
            userId: decoded.userId,
            username: decoded.username,
            NIM: decoded.NIM,
            isAdmin: decoded.isAdmin
        })
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken
        await user.save();
        setCookies(res, tokens, COOKIE_CONFIG);
         res.status(200).json({message: "Token refreshed"});
         return;
    } catch (err) {
         res.status(500).json({message: "Auth error"});
         return;
    }
}

export const logout = async(req: Request, res: Response): Promise<void> => {
    const accessToken = req.cookies['accessToken'];
    const user = await User.findOne({accessToken});
    if(!user){
        res.status(401).json({message: "Invalid access token"});
        return;
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    user.accessToken = undefined;
    user.refreshToken = undefined;
    await user.save();
    res.status(200).json({message: "Logged out"});
    return;
}

export const getWawancara = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const userId = req.user?.userId;

        const user = await User.findById(userId)
            .populate<{ tanggalPilihanOti: IWawancara }>("tanggalPilihanOti.tanggalId")
            .populate<{ tanggalPilihanHima: IWawancara }>("tanggalPilihanHima.tanggalId");

        if (!user) {
            res.status(400).json({ message: "User gaada" });
            return;
        }
        // Filter `sesi` array in `tanggalPilihanOti` and `tanggalPilihanHima` based on `userId`
        const filteredOti = user.tanggalPilihanOti?.tanggalId ? {
            tanggal: (user.tanggalPilihanOti.tanggalId as unknown as IWawancara).tanggal,
            sesi: (user.tanggalPilihanOti.tanggalId as unknown as IWawancara).sesi.filter(sesi => sesi.dipilihOleh.includes(userId))
        } : null;

        const filteredHima = user.tanggalPilihanHima?.tanggalId ? {
            tanggal: (user.tanggalPilihanHima.tanggalId as unknown as IWawancara).tanggal,
            sesi: (user.tanggalPilihanHima.tanggalId as unknown as IWawancara).sesi.filter(sesi => sesi.dipilihOleh.includes(userId))
            
        } : null;

        res.status(200).json({filteredOti, filteredHima });
        return;
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};


export const getDivisi = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const user = await User.findById(userId)
            .populate("divisiPilihan")
        if(!user) {
            res.status(400).json({message: "User gaada"});
            return;
        }

        const sortedUser = user.divisiPilihan?.sort((a, b) => {
            return a.urutanPrioritas - b.urutanPrioritas;
        })
        res.status(200).json({divisiPilihan: sortedUser});
        return;        
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        return;
    }
}

export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user){
            res.status(400).json({message: "No user with that email exists"});
            return;
        }

        const resetToken = randomBytes(20).toString('hex');
        const resetTokenExpires = Date.now() + 3600000;

        await User.updateOne({ _id: user._id }, {
            resetToken,
            resetTokenExpiration: resetTokenExpires
        });

        const resetUrl = `${req.protocol}://${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await resetEmail(user.email, resetUrl);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending password reset email' });
        return;
    }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            res.status(400).json({ message: 'Invalid or expired token' });
            return;
        }
        user.accessToken = undefined;
        user.refreshToken = undefined;
        user.password = newPassword; // Hash password before saving
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been updated.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
        return;
    }
};

export const validate = async (req: IGetRequestWithUser, res: Response) => {
    try{
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        res.status(200).json({message: "Authorized", user: req.user, isAuthenticated: true});
        return;
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return; 
    }
}