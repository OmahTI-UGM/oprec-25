import mongoose from "mongoose";

export interface TokenPayload{
    username: string,
    divisiPilihan?: mongoose.Types.ObjectId[]
}

export interface AuthTokens {
    accessToken: string,
    refreshToken: string
}