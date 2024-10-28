import { Request, Response } from "express";
import { generateTokens, verifyToken, setCookies } from "@utils/jwt";
import { COOKIE_CONFIG, JWT_CONFIG } from "@config/jwtcookies";
import User from '@/models/userModels';
import { IGetRequestWithUser } from "@/types/getUserRequest";
import { IWawancara } from "@/types/IWawancara";

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
            NIM: user.NIM
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
            NIM: user.NIM,
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
            NIM: decoded.NIM
        })
        console.log(decoded);
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

export const getWawancara = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try{
        const userId  = req.user?.userId;
        const user = await User.findById(userId)
            .populate<{ tanggalPilihanOti: IWawancara }>("tanggalPilihanOti")
            .populate<{ tanggalPilihanHima: IWawancara }>("tanggalPilihanHima");
        if(!user) {
            res.status(400).json({message: "User gaada"});
            return;
        }
        res.status(200).json({oti: user.tanggalPilihanOti, hima: user.tanggalPilihanHima});
        return;
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        return;
    }
}

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