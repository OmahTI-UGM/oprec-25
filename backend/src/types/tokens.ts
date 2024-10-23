import mongoose from "mongoose";

export interface TokenPayload{
    userId: mongoose.Types.ObjectId,
    username: string,
    NIM: string,
    divisiPilihan?: mongoose.Types.ObjectId[],
    divisiPilihanOti?: mongoose.Types.ObjectId[],
    divisiPilihanHima?: mongoose.Types.ObjectId[],
    prioritasOti?: mongoose.Types.ObjectId,
    prioritasHima?: mongoose.Types.ObjectId,
}

export interface AuthTokens {
    accessToken: string,
    refreshToken: string
}