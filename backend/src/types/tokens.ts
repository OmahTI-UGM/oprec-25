import mongoose from "mongoose";
import { DivisiPilihan, TanggalPilihan } from "./IUser";
export interface TokenPayload{
    userId: mongoose.Types.ObjectId,
    username: string,
    NIM: string,
    divisiPilihan?: DivisiPilihan[],
    divisiPilihanOti?: mongoose.Types.ObjectId[],
    divisiPilihanHima?: mongoose.Types.ObjectId[],
    prioritasOti?: mongoose.Types.ObjectId,
    prioritasHima?: mongoose.Types.ObjectId,
    tanggalPilihanHima?: TanggalPilihan,
    tanggalPilihanOti?: TanggalPilihan,
}

export interface AuthTokens {
    accessToken: string,
    refreshToken: string
}