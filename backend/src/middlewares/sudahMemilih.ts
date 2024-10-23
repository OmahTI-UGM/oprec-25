import { IGetRequestWithUser } from "@/types/getUserRequest";
import { Response, NextFunction } from "express";
export const sudahMemilih =  async(req: IGetRequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try{
        if(!req.user?.divisiPilihanHima?.length && !req.user?.divisiPilihanOti?.length){
            res.status(401).json({message: "Belum memilih divisi"});
            return;
        }
        next();
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return;
    }
}