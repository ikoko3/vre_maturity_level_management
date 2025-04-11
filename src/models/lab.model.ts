import mongoose, { Schema, Document } from 'mongoose';
import { LabLevel, LabLevelState } from '../const/lab.const';

export interface ILab extends Document {
  name: string;
  vre_id: string;
  levels: {
    level: LabLevel,
    state: LabLevelState,
    reached_at: Date,
    exit_points: {
      name: string,
      is_fullfilled: Boolean,
    }
  }
}

//These are only indicative
const ExitPointSchema: Schema = new Schema({
  name: {type: String, required: true},
  is_fullfilled: {type: Boolean, required: true}
});

const LevelSchema: Schema = new Schema({
  level: { type: Number, 
    required: true, 
    //unique: true,
    //enum: Object.values(LabLevel), 
    //default: LabLevel.Zero
   },
  state:  { type: Number, 
    required: true, 
    //unique: true,
    //enum: Object.values(LabLevelState), 
    //default: LabLevelState.Undefined
   },
  reached_at: { type: Date },
  exit_points: [ExitPointSchema]
});

const LabSchema: Schema = new Schema({
  name: { type: String, required: true },
  vre_id: { type: String, required: true, unique: true },
  levels: [LevelSchema]
});

export const Lab = mongoose.model<ILab>('Lab', LabSchema);
