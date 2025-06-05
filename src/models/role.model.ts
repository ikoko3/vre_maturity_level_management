import mongoose, { Schema, Document } from 'mongoose';

export interface IRoleDefinition extends Document {
  code: string;
  name: string;
  description: string;
  is_global: boolean;
}

const RoleDefinitionSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: {type: String, required: false },
  is_global: { type: Boolean, required: true },
});

export const RoleDefinition = mongoose.model<IRoleDefinition>('RoleDefinition', RoleDefinitionSchema);
