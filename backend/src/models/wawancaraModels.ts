import mongoose, {Schema, Document} from 'mongoose';

interface Wawancara extends Document{
    tanggal: Date,
    himakom: boolean,
    sesi: [Sesi]
}

interface SlotDivisiPerSesi extends Document{
    backend: number,
    frontend: number,
    uiux: number,
    dsai: number,
    cp: number,
    mobapps: number,
    gamedev: number
}
interface Sesi extends Document{
    jam: Date,
    dipilihOleh: mongoose.Types.ObjectId[],
    slotDivisi: SlotDivisiPerSesi
}
const slotDivisiPerSesiSchema: Schema<SlotDivisiPerSesi> = new Schema({
    backend: Number,
    frontend: Number,
    uiux: Number,
    dsai: Number,
    cp: Number,
    mobapps: Number,
    gamedev: Number
})
const sesiSchema: Schema<Sesi> = new Schema({
    jam: Date,
    dipilihOleh: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    slotDivisi: slotDivisiPerSesiSchema
})
const wawancaraSchema: Schema<Wawancara> = new Schema({
    tanggal: Date,
    himakom: Boolean,
    sesi: [sesiSchema]
})

const Wawancara = mongoose.model<Wawancara>('Wawancara', wawancaraSchema);
export default Wawancara;