import mongoose, {Schema} from 'mongoose';
import { ISesi, IWawancara, ISlotDivisiPerSesi } from '@/types/IWawancara';

const slotDivisiPerSesiSchema: Schema<ISlotDivisiPerSesi> = new Schema({
    backend: Number,
    frontend: Number,
    uiux: Number,
    dsai: Number,
    cp: Number,
    mobapps: Number,
    gamedev: Number
})
const sesiSchema: Schema<ISesi> = new Schema({
    jam: Date,
    dipilihOleh: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    slotDivisi: slotDivisiPerSesiSchema
})
const wawancaraSchema: Schema<IWawancara> = new Schema({
    tanggal: Date,
    himakom: Boolean,
    sesi: [sesiSchema]
})

const Wawancara = mongoose.model<IWawancara>('Wawancara', wawancaraSchema);
export default Wawancara;