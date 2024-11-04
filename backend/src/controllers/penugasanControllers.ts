import Penugasan from "@/models/penugasanModels";
import User from "@/models/userModels";
import Divisi from "@/models/divisiModels";
import { Response } from "express";
import { IGetRequestWithUser } from "@/types/getUserRequest";

export const submitPenugasan = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        const { slug: divisiSlug } = req.params;
        const { link, comment } = req.body;
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const { userId } = req.user;

        const [divisi, user] = await Promise.all([
            Divisi.findOne({slug: divisiSlug}),
            User.findById(userId),
        ])
        if(!divisi || !user){
            res.status(400).json({message: "Divisi atau user gaada"});
            return;
        }
        const existingPenugasan = await Penugasan.findOne({disubmitOleh: userId, disubmitDi: divisi.id});
        if(existingPenugasan){
            res.status(400).json({message: "Sudah submit di sini"});
            return;
        }

        const newPenugasan = new Penugasan({
            link,
            comment,
            disubmitOleh: userId,
            disubmitDi: divisi.id
        })
        user.tugas?.push(newPenugasan.id);
        await Promise.all([newPenugasan.save(), user.save()]);
        res.status(201).json({message: "Penugasan berhasil disubmit"});
        return;
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const updateTugas = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try{
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const{ userId } = req.user;
        const { id: tugasId } = req.params;
        const { link, comment } = req.body;
        const tugas = await Penugasan.findById(tugasId);
        if(!tugas){
            res.status(404).json({message: "Tugas gaada"});
            return;
        }
        if(tugas.disubmitOleh.toString() !== userId.toString()){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        tugas.link = link || tugas.link;
        tugas.comment = comment || tugas.comment;
        await tugas.save();
        res.status(200).json({message: "Tugas berhasil diupdate"});
        return;
    } catch (err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const existingSubmission = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try{
        const{ slug: divisiSlug } = req.params;
        const divisi = await Divisi.findOne({slug: divisiSlug});
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const { userId } = req.user;
        const penugasan = await Penugasan.findOne({disubmitOleh: userId, disubmitDi: divisi?.id});
        if(!penugasan){
            res.status(200).json({message: "Belum submit penugasan", penugasan: null});
            return;
        }
        res.status(200).json({message: "Sudah submit penugasan", penugasan: penugasan});
        return;
    } catch(err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
}