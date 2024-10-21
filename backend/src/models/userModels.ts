import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nimRegex = /^\d{2}\/\d{6}\/[A-Z]{2}\/\d{5}$/;

interface User extends Document{
    username: string,
    email: string,
    NIM: string,
    password: string,
    divisiPilihan?: mongoose.Types.ObjectId[],
    resetToken?: string,
    resetTokenExpiration?: string,
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
      divisiPilihan: [{
        type: Schema.Types.ObjectId,
        ref: 'Divisi',
      }],
      resetToken: {
        type: String,
      },
      resetTokenExpiration: {
        type: Date,
      },
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