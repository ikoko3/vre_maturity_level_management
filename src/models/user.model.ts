import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  reference_id: string;
  global_roles: string[];
}

const UserSchema: Schema = new Schema({
  reference_id: { type: String, required: true, unique: true },
  global_roles: [{ type: String, ref: 'RoleDefinition' }]
});

export const User = mongoose.model<IUser>('User', UserSchema);
