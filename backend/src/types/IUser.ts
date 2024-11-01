import mongoose, {Document} from "mongoose"
export interface IUser extends Document{
    username: string,
    email: string,
    NIM: string,
    password: string,
    divisiPilihan?: DivisiPilihan[],
    divisiPilihanOti?: mongoose.Types.ObjectId[],
    divisiPilihanHima?: mongoose.Types.ObjectId[],
    resetToken?: string,
    resetTokenExpiration?: string,
    tanggalPilihanHima?: TanggalPilihan,
    tanggalPilihanOti?: TanggalPilihan,
    prioritasOti?: mongoose.Types.ObjectId,
    prioritasHima?: mongoose.Types.ObjectId,
    tugas?: mongoose.Types.ObjectId[],
    diterimaDi?: mongoose.Types.ObjectId,
    isAdmin: boolean,
    accessToken?: string,
    refreshToken?: string,
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface DivisiPilihan {
    divisiId: mongoose.Types.ObjectId,
    urutanPrioritas: number
}

export interface TanggalPilihan{
    tanggalId: mongoose.Types.ObjectId,
}