import { Response, NextFunction} from "express";
import { verifyToken } from "@utils/jwt";
import { JWT_CONFIG } from "@config/jwtcookies";
import { IGetRequestWithUser } from "@/types/getUserRequest";

export const authenticateToken = async (req: IGetRequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try{
        const accessToken = req.cookies['accessToken'];
        if(!accessToken){
            res.status(401).json({message: "No access token found"});
            return;
        } 

        const decoded = verifyToken(accessToken, JWT_CONFIG.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({message: "Token might be invalid or expired"});
        return;
    }
}