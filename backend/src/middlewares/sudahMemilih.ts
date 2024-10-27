import { IGetRequestWithUser } from "@/types/getUserRequest";
import { Response, NextFunction } from "express";
export const sudahMemilihOti =  async(req: IGetRequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        if(!req.user?.prioritasOti){
            console.log(req.user);
            res.status(401).json({message: "Belum memilih divisi OTI"});
            return;
        }
        next();
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const sudahMemilihHima = async(req: IGetRequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try{
        if(!req.user?.prioritasHima){
            res.status(401).json({message: "Belum memilih divisi hima"});
            return;
        }
        next();
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return;
    }
}