import mongoose, {Document} from "mongoose"

export interface IWawancara extends Document{
    tanggalId: mongoose.Types.ObjectId,
    tanggal: Date,
    himakom: boolean,
    sesi: [ISesi]
}

export interface ISlotDivisiPerSesi extends Document{
    backend: number,
    frontend: number,
    uiux: number,
    dsai: number,
    cp: number,
    mobapps: number,
    gamedev: number
}
export interface ISesi extends Document{
    jam: Date,
    dipilihOleh: mongoose.Types.ObjectId[],
    slotDivisi: ISlotDivisiPerSesi
}