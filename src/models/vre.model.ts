import mongoose, { Schema, Document } from 'mongoose';

export interface IVRE extends Document {
  name: string;
  reference_id: string;
}

const VRESchema: Schema = new Schema({
  name: { type: String, required: true },
  reference_id: { type: String, required: true, unique: true },
});

export const VRE = mongoose.model<IVRE>('VRE', VRESchema);
