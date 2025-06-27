import mongoose, { Schema, Document } from 'mongoose';
import { LabLevel, LabLevelState } from '../const/lab.const';
import { ConditionType } from '../const/condition.const';

export interface ILab extends Document {
  name: string;
  alias: string;
  parent_lab_id: string;
  current_level: LabLevel;
  levels: [{
    level: LabLevel,
    state: LabLevelState,
    reached_at: Date,
    exit_conditions: [{
      _id: string,
      category: number,
      type: number,
      status: number,
      discussion_url: string,
      comments: string,
      tooltip_url: string,
    }]
  }],
  assigned_users: 
    {user_id: string, role_code: string, assigned_at:Date}[]
  
}

//These are only indicative
const ConditionSchema: Schema = new Schema({
  category: {type: Number, required: true},
  type: {type: Number, required: true},
  status: {type: Number, required: true},
  comments: {type: String},
  tooltip_url: {type: String},
  discussion_url: {type: String},
});

//TODO: Figure out how to fix the validation errors
const LevelSchema: Schema = new Schema({
  level: { type: Number, 
    required: true, 
    //enum: Object.values(LabLevel) as number[], //This one doesn't work
    //enum:  [0, 1, 2, 3, 4], //This one does, but it's not an ideal solution
    default: LabLevel.Zero
   },
  state:  { type: Number, 
    required: true, 
    //unique: true,
    //enum: Object.values(LabLevelState), 
    //default: LabLevelState.Undefined
   },
  reached_at: { type: Date },
  exit_conditions: [ConditionSchema]
});

const AssignedUserSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role_code: { type: String, ref: 'RoleDefinition', required: true },
  assigned_at: { type: Date, default: Date.now }
});


const LabSchema: Schema = new Schema({
  name: { type: String, required: true },
  alias: {type: String, required: true, unique: true},
  parent_lab_id: { type: String },
  current_level : { type: Number, required: true},
  levels: [LevelSchema],
  assigned_users: [AssignedUserSchema],
});

export const Lab = mongoose.model<ILab>('Lab', LabSchema);
