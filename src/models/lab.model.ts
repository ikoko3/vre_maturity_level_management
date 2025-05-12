import mongoose, { Schema, Document } from 'mongoose';
import { LabLevel, LabLevelState } from '../const/lab.const';
import { ConditionType } from '../const/condition.const';

export interface ILab extends Document {
  name: string;
  alias: string;
  vre_id: string;
  levels: {
    level: LabLevel,
    state: LabLevelState,
    reached_at: Date,
    exit_conditions: {
      category: number,
      type: number,
      is_fullfilled: Boolean,
    }
  }
}

//These are only indicative
const ConditionSchema: Schema = new Schema({
  is_fullfilled: {type: Boolean, required: true},
  category: {type: Number, required: true},
  type: {type: Number, required: true},
  comments: {type: String},
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

const LabSchema: Schema = new Schema({
  name: { type: String, required: true },
  alias: {type: String, required: true, unique: true},
  vre_id: { type: String, required: true, unique: true },
  levels: [LevelSchema]
});

export const Lab = mongoose.model<ILab>('Lab', LabSchema);
