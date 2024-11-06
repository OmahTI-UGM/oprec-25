import User from "@models/userModels";
import Divisi from "@/models/divisiModels";
import { Request, Response } from "express";
import { IGetRequestWithUser } from "@/types/getUserRequest";
import { IDivisi } from "@/types/IDivisi";
import { IUser } from "@/types/IUser";
import { generateTokens, setCookies } from "@/utils/jwt";
import { COOKIE_CONFIG } from "@/config/jwtcookies";

const MAX_DIVISIONS_PER_TYPE = 2;

class DivisionSelectionError extends Error {
    constructor(message: string, public statusCode: number = 400) {
        super(message);
    }
}

export const pilihDivisi = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        const { slug: divisiSlug } = req.params;
        const { urutanPrioritas } = req.body;

        if (!req.user?.userId) {
            throw new DivisionSelectionError("Unauthorized", 401);
        }

        // Fetch necessary data
        const [divisi, user] = await Promise.all([
            Divisi.findOne({ slug: divisiSlug }),
            User.findById(req.user.userId)
        ]);

        // Validate existence
        if (!divisi || !user) {
            throw new DivisionSelectionError("Division or user not found");
        }
        
        // Validate division availability
        if ((divisi.dipilihOleh?.length || 0) >= divisi.slot) {
            throw new DivisionSelectionError("No slots available");
        }

        if (divisi.dipilihOleh?.includes(req.user.userId)) {
            throw new DivisionSelectionError("User already registered for this division");
        }

        // Handle division selection
        await handleDivisionSelection(user, divisi, urutanPrioritas);

        // Update division slots
        divisi.dipilihOleh = [...(divisi.dipilihOleh || []), req.user.userId];
        const tokens = generateTokens({
            userId: user.id,
            username: user.username,
            NIM: user.NIM,
            isAdmin: user.isAdmin,
            enrolledSlugHima: user.enrolledSlugHima,
            enrolledSlugOti: user.enrolledSlugOti
        })
        setCookies(res, tokens, COOKIE_CONFIG);
        // Save changes
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await Promise.all([user.save(), divisi.save()]);

        res.status(200).json({ message: "Successfully registered for division", accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
        return;
    } catch (error) {
        const status = error instanceof DivisionSelectionError ? error.statusCode : 500;
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(status).json({ message });
        return;
    }
};

async function handleDivisionSelection(
    user: IUser,
    divisi: IDivisi,
    urutanPrioritas: number
): Promise<void> {
    const isHimakom = divisi.himakom;
    const divisionArray = isHimakom ? user.divisiPilihanHima : user.divisiPilihanOti;
    const priorityField = isHimakom ? 'prioritasHima' : 'prioritasOti';

    // Initialize arrays if they don't exist
    user.divisiPilihan = user.divisiPilihan || [];

    if (isHimakom) {
        if(user.tanggalPilihanHima?.tanggalId){throw new DivisionSelectionError("User already registered for an interview in HIMA division");}
        user.divisiPilihanHima = user.divisiPilihanHima || [];
    } else {
        if(user.tanggalPilihanOti?.tanggalId){throw new DivisionSelectionError("User already registered for an interview in OTI division");}
        user.divisiPilihanOti = user.divisiPilihanOti || [];
    }

    // Check division limit
    if ((divisionArray?.length || 0) >= MAX_DIVISIONS_PER_TYPE) {
        throw new DivisionSelectionError(`Maximum ${MAX_DIVISIONS_PER_TYPE} divisions of this type allowed`);
    }

    const existingPriority = user.divisiPilihan.find((d: any) => d.urutanPrioritas === urutanPrioritas);
    if(existingPriority){
        throw new DivisionSelectionError("Priority already exists");
    }
    // Find existing selection
    const foundDivisi = user.divisiPilihan.find((d: any) => 
        d.divisiId.toString() === divisi.id.toString()
    );

    const newSelection = {
        divisiId: divisi.id,
        urutanPrioritas
    };

    if (!foundDivisi) {
        // Add new selection
        user.divisiPilihan.push(newSelection);
        user[priorityField] = divisi.id;
        user.enrolledSlugHima = isHimakom ? divisi.slug : user.enrolledSlugHima;
        user.enrolledSlugOti = isHimakom ? user.enrolledSlugOti : divisi.slug;
        divisionArray?.push(divisi.id);
    } else {
        // Update existing selection based on priority
        if (urutanPrioritas <= foundDivisi.urutanPrioritas) {
            user.divisiPilihan = user.divisiPilihan.filter((d: any) => 
                d.divisiId.toString() !== divisi.id.toString()
            );
            user.divisiPilihan.push(newSelection);
            if (urutanPrioritas < foundDivisi.urutanPrioritas) {
                user[priorityField] = divisi.id;
                user.enrolledSlugHima = isHimakom ? divisi.slug : user.enrolledSlugHima;
                user.enrolledSlugOti = isHimakom ? user.enrolledSlugOti : divisi.slug;
            }
        }
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