import mongoose, { Schema, Document } from 'mongoose';

// 1. TypeScript interface
export interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
}

// 2. Mongoose schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number }
});

// 3. Mongoose model
export const User = mongoose.model<IUser>('User', UserSchema);
