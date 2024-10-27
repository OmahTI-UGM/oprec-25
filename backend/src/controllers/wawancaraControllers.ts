import { Response } from "express";
import { IGetRequestWithUser } from "@/types/getUserRequest";
import { IDivisi } from "@/types/IDivisi";
import { IWawancara } from "@/types/IWawancara";
import Wawancara from "@/models/wawancaraModels";
import User from "@/models/userModels";

export const pilihWaktuWawancaraOti = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { userId } = req.user;
        const { wawancaraId } = req.params;
        const { jamWawancara } = req.body;
        const jamWawancaraDate = new Date(jamWawancara);

        // Fetch wawancara and user data concurrently
        const [wawancara, user] = await Promise.all([
            Wawancara.findById(wawancaraId),
            User.findById(userId).populate<{prioritasOti: IDivisi}>("prioritasOti"),
        ]);
        // Check if wawancara or user exists and if user has prioritasOti
        if (!wawancara) {
            res.status(400).json({ message: "Wawancara gaada" });
            return;
        }
        if(!user || !user.prioritasOti) {
            res.status(400).json({ message: "User atau prioritas Oti gaada" });
            return;
        }
        if(user.tanggalPilihanOti) {
            res.status(400).json({message: "user sudah memilih waktu wawancara untuk OTI"});
            return;
        }
        // Find the matching sesi
        const matchingSesi = wawancara.sesi.find(sesi => sesi.jam.getTime() === jamWawancaraDate.getTime());
        const slug = user.prioritasOti?.slug; // Use type assertion for slug
        
        if (matchingSesi) {
            const slotDivisi = matchingSesi.slotDivisi as unknown as Record<string, number>; // Ensure proper typing
            // Check if the slug exists in slotDivisi
            if (slug in slotDivisi) {
                if ((slotDivisi[slug] || 0)  <= 0) {
                    res.status(400).json({ message: `Slot untuk ${slug} habis` });
                    return;
                } else {
                    slotDivisi[slug] -= 1;
                    matchingSesi.dipilihOleh.push(userId);
                    user.tanggalPilihanOti = wawancara.id;
                }
            } else {
                res.status(400).json({ message: `Divisi ${slug} tidak ditemukan` });
            }
        }
        await Promise.all([wawancara.save(), user.save()]);
        res.status(200).json({ message: "Waktu wawancara berhasil dipilih" });
        return;
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const pilihWaktuWawancaraHima = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { userId } = req.user;
        const { wawancaraId } = req.params;
        const { jamWawancara } = req.body;
        const jamWawancaraDate = new Date(jamWawancara);

        // Fetch wawancara and user data concurrently
        const [wawancara, user] = await Promise.all([
            Wawancara.findById(wawancaraId),
            User.findById(userId)
            .populate<{ prioritasHima: IDivisi }>("prioritasHima")
            .populate<{ tanggalPilihanOti: IWawancara }>("tanggalPilihanOti"),
        ]);
        console.log(user);
        // Check if wawancara or user exists and if user has prioritasHima
        if (!wawancara) {
            res.status(400).json({ message: "Wawancara gaada" });
            return;
        }
        if(!user || !user.prioritasHima) {
            res.status(400).json({ message: "User atau prioritas hima gaada" });
            return;
        }
        const hasOTISesiConflict = user.tanggalPilihanOti?.sesi.some(sesi => {
            return sesi.jam.getTime() === jamWawancaraDate.getTime();
        });

        if (hasOTISesiConflict) {
            res.status(400).json({ message: "Waktu wawancara yang dipilih merupakan waktu wawancara OTI" });
            return;
        }
        if(user.tanggalPilihanHima) {
            res.status(400).json({message: "user sudah memilih waktu wawancara untuk hima"});
            return;
        }
        // Find the matching sesi
        const matchingSesi = wawancara.sesi.find(sesi => sesi.jam.getTime() === jamWawancaraDate.getTime());
        const slug = user.prioritasHima?.slug; // Use type assertion for slug
        if (matchingSesi) {
            const slotDivisi = matchingSesi.slotDivisi as unknown as Record<string, number>; // Ensure proper typing
            console.log(slotDivisi[slug]);
            // Check if the slug exists in slotDivisi
            if (slug in slotDivisi) {
                if ((slotDivisi[slug] || 0)  <= 0) {
                    res.status(400).json({ message: `Slot untuk ${slug} habis` });
                    return;
                } else {
                    slotDivisi[slug] -= 1;
                    matchingSesi.dipilihOleh.push(userId);
                    user.tanggalPilihanHima = wawancara.id;
                }
            } else {
                res.status(400).json({ message: `Divisi ${slug} tidak ditemukan` });
            }
        }
        await Promise.all([wawancara.save(), user.save()]);
        res.status(200).json({ message: "Waktu wawancara berhasil dipilih" });
        return;
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}