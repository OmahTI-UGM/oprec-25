import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nimRegex = /^\d{2}\/\d{6}\/[A-Z]{2}\/\d{5}$/;

interface User extends Document{
    username: string,
    email: string,
    NIM: string,
    password: string,
    divisiPilihanOti?: mongoose.Types.ObjectId[],
    divisiPilihanHima?: mongoose.Types.ObjectId[],
    resetToken?: string,
    resetTokenExpiration?: string,
    tanggalPilihanHima?: mongoose.Types.ObjectId[],
    tanggalPilihanOti?: mongoose.Types.ObjectId[],
    prioritasOti?: mongoose.Types.ObjectId,
    prioritasHima?: mongoose.Types.ObjectId,
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [emailRegex, 'Please fill a valid email address'],
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      NIM: {
        type: String,
        required: true,
        unique: true,
        match: [nimRegex, 'Please fill a valid NIM'],
      },
      password: {
        type: String,
        required: true,
      },
      divisiPilihanOti: [{
        type: Schema.Types.ObjectId,
        ref: 'Divisi',
      }],
      divisiPilihanHima: [{
        type: Schema.Types.ObjectId,
        ref: 'Divisi',
      }],
      resetToken: {
        type: String,
      },
      resetTokenExpiration: {
        type: Date,
      },
      tanggalPilihanHima: {
        type: Schema.Types.ObjectId,
        ref: 'Wawancara'
      },
      tanggalPilihanOti: {
        type: Schema.Types.ObjectId,
        ref: 'Wawancara'
      },
      prioritasOti:{
        type: Schema.Types.ObjectId,
        ref: 'Divisi'
      },
      prioritasHima:{
        type: Schema.Types.ObjectId,
        ref: 'Divisi'
      }
});

userSchema.pre<User>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<User>('User', userSchema);
export default User;