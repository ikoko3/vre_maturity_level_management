import mongoose, { Schema, Document } from 'mongoose';
import { LabLevel } from '../const/lab.const';
import { RequestStatus } from '../const/request.const';

export interface ILabCreationRequest extends Document {
  title: string;
  alias: string;
  scope: string;
  timeplan: string;

  associated_users: [{user_id: string, role_codes: string[]}];
  lab_reference: {lab_id: string, lab_level: LabLevel};

  status: RequestStatus; 
  comments: string;
  reviewer_user_id: string; 
}

const AssociatedUsersSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role_codes: [{ type: String, ref: 'RoleDefinition', required: true }],
});

const LabReferenceSchema = new Schema({
  lab_id: { type: Schema.Types.ObjectId, ref: 'Lab' },
  lab_level: [{ type: String }],
});

const LabCreationRequestSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  alias: { type: String, unique: true },
  scope: { type: String },
  timeplan: { type: String },

  associated_users: [AssociatedUsersSchema],
  lab_reference: LabReferenceSchema,

  status: {type:Number, required: true},
  comments: {type:String},
  reviewer_user_id: {type: Schema.Types.ObjectId, ref: 'User'},
});

export const LabCreationRequest = mongoose.model<ILabCreationRequest>('LabCreationRequest', LabCreationRequestSchema);
