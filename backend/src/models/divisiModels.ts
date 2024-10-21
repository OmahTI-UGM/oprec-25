import mongoose, { Schema, Document } from 'mongoose';

interface Divisi extends Document{
    judul: string,
    judulPanjang: string,
    logoDivisi: string,
    slot: number,
    slug: string,
    proker?: [Proker],
    deskripsi: string,
    dipilihOleh?: mongoose.Types.ObjectId[],
    himakom: boolean,
    penugasan: Penugasan
}
interface Proker extends Document{
    url?: string,
    filename?: string,
    deskripsiProker?: string
}
interface Penugasan extends Document{
    deskripsiPenugasan: string,
    toolsPenugasan: string,
    linkPenugasan: string,
}

const prokerSchema: Schema<Proker> = new Schema({
    url: String,
    filename: String,
    deskripsiProker: String
});
const penugasanSchema: Schema<Penugasan> = new Schema({
    deskripsiPenugasan: String,
    toolsPenugasan: String,
    linkPenugasan: String,
})
const divisiSchema: Schema<Divisi> = new Schema({
    judul: String,
    judulPanjang: String,
    logoDivisi: String,
    slot: Number,
    slug: String,
    proker: [prokerSchema],
    deskripsi: String,
    dipilihOleh: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    himakom: Boolean,
    penugasan: penugasanSchema
})
const Divisi = mongoose.model<Divisi>('Divisi', divisiSchema);
export default Divisi; 