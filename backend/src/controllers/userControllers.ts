import { Request, Response } from "express";
import { generateTokens, verifyToken, setCookies } from "@utils/jwt";
import { COOKIE_CONFIG, JWT_CONFIG } from "@config/jwtcookies";
import User from '@/models/userModels';

export const register = async (req: Request, res: Response): Promise<void> => {
    try{
        const {email, username, password, NIM} = req.body;
        const existingUser = await User.findOne({$or: [ {email}, {username} ]}).lean();
        if (existingUser){ 
            res.status(400).json({message: "User exists"}) 
            return;
        }

        const userData = {email, username, password, NIM};
        const user = await User.create(userData);

        const tokens = generateTokens({
            userId: user.id,
            username: user.username,
            divisiPilihanOti: user.divisiPilihanOti,
            divisiPilihanHima: user.divisiPilihanHima,
            NIM: user.NIM,
            prioritasHima: user.prioritasHima,
            prioritasOti: user.prioritasOti
        })

        setCookies(res, tokens, COOKIE_CONFIG);

        res.status(201).json({
            message: "User created",
            user: {...user.toObject(), password: undefined}
        })
        return;
    } catch (err) {
        res.status(500).json({message: err});
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
            divisiPilihanOti: user.divisiPilihanOti,
            divisiPilihanHima: user.divisiPilihanHima,
            NIM: user.NIM,
            prioritasHima: user.prioritasHima,
            prioritasOti: user.prioritasOti
        })

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

        const decoded = verifyToken(refreshToken, JWT_CONFIG.REFRESH_TOKEN_SECRET);

        const tokens = generateTokens({
            userId: decoded.userId,
            username: decoded.username,
            divisiPilihanOti: decoded.divisiPilihanOti,
            divisiPilihanHima: decoded.divisiPilihanHima,
            NIM: decoded.NIM,
            prioritasHima: decoded.prioritasHima,
            prioritasOti: decoded.prioritasOti
        })

        setCookies(res, tokens, COOKIE_CONFIG);
         res.status(200).json({message: "Token refreshed"});
         return;
    } catch (err) {
         res.status(500).json({message: "Auth error"});
         return;
    }
}

export const logout = async(_req: Request, res: Response): Promise<void> => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message: "Logged out"});
    return;
}