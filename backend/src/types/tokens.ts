import mongoose from "mongoose";

export interface TokenPayload{
    userId: mongoose.Types.ObjectId,
    username: string,
    NIM: string,
    divisiPilihan?: mongoose.Types.ObjectId[]
}

export interface AuthTokens {
    accessToken: string,
    refreshToken: string
}