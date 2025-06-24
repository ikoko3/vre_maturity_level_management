import mongoose, { Schema, Document } from 'mongoose';

export interface ITaskDefinition extends Document {
  short_description: string;
  description_url?: string;
  version: string;
  associated_exit_conditions: string[]; 
}

const TaskDefinitionSchema: Schema = new Schema({
  short_description: { type: String, required: true },
  description_url: { type: String },
  version: { type: String, default: '1.0' },
  //associated_exit_conditions: [{ type: String, enum: Object.values(ConditionType), required: true }],
}, { timestamps: true });

export const TaskDefinition = mongoose.model<ITaskDefinition>('TaskDefinition', TaskDefinitionSchema);
