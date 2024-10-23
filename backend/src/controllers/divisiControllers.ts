import User from "@models/userModels";
import Divisi from "@/models/divisiModels";
import { Request, Response } from "express";
import { IGetRequestWithUser } from "@/types/getUserRequest";

export const pilihDivisi = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try{
        const { slug: divisiSlug } = req.params;
        const { urutanPrioritas } = req.body
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const { userId: userId } = req.user

        const[divisi, user] = await Promise.all([
            Divisi.findOne({slug: divisiSlug}),
            User.findById(userId)
        ]);
        if(!divisi || !user){
            res.status(400).json({message: "Divisi atau user gaada asu"});
            return;
        }
        if(divisi.slot <= 0){
            res.status(400).json({message: "Slot habis"})
            return;
        }
        if(divisi.dipilihOleh?.includes(userId)){
            res.status(400).json({message: "User udah daftar di sini"})
            return;
        }
        if(divisi.himakom && user.divisiPilihanHima?.length && user.divisiPilihanHima.length < 2 && urutanPrioritas === 1){
            user.divisiPilihanHima?.push(divisi.id);
            user.prioritasHima = divisi.id;
        } else if(divisi.himakom && user.divisiPilihanOti?.length && user.divisiPilihanOti.length < 2 && urutanPrioritas !== 1){
            user.divisiPilihanHima?.push(divisi.id);
        } else if(!divisi.himakom && user.divisiPilihanOti?.length && user.divisiPilihanOti.length < 2 && urutanPrioritas === 1){
            user.divisiPilihanOti?.push(divisi.id);
            user.prioritasOti = divisi.id;
        } else if(!divisi.himakom && user.divisiPilihanHima?.length && user.divisiPilihanHima.length < 2 && urutanPrioritas !== 1){
            user.divisiPilihanOti?.push(divisi.id);
        }

        divisi.dipilihOleh?.push(userId);
        divisi.slot -= 1;

        await Promise.all([divisi.save(), user.save()]);
        res.status(200).json({message: "Berhasil daftar divisi"});
        return;
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
        return;
    }
}

export const getAllDivisi = async(_req: Request, res: Response): Promise<void> => {
    try{
        const semuaDivisi = await Divisi.find({});
        res.status(200).json({semuaDivisi});
        return;
    } catch (err){
        res.status(500).json({message: "Cannot fetch divisi"});
        return;
    }
}
export const getOneDivisi = async(req: Request, res: Response): Promise<void> => {
    try{
        const { slug: divisiSlug } = req.params;
        const satuDivisi = await Divisi.findOne({ slug: divisiSlug });
        if(!satuDivisi){
            res.status(404).json({message: "Divisi gaada"});
            return;
        }
        res.status(200).json({satuDivisi});
        return;
    } catch (err){
        res.status(500).json({message: "Cannot fetch one divisi"});
        return;
    }
}