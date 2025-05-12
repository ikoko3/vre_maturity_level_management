import mongoose, { Schema, Document } from 'mongoose';
import { ConditionType } from '../const/condition.const';
import { LabLevel } from '../const/lab.const';

export interface ILevelConfiguration extends Document {
  level: Number;
  exit_conditions: [{
    category: Number;
    type: Number;
  }]
}

//These are only indicative
const ExitConditionSchema: Schema = new Schema({
  category: {type: Number, required: true},
  type: {type: Number, required: true},
});

const LevelConfigurationSchema: Schema = new Schema({
  level: { type: Number, required: true, unique: true, index: true  },
  exit_conditions: [ExitConditionSchema]
});


export const LevelConfiguration = mongoose.model<ILevelConfiguration>('LevelConfiguration', LevelConfigurationSchema);
