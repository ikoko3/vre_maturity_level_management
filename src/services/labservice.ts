import {Lab } from '../models/lab.model';
import { LevelConfiguration} from '../models/condition_configuration';
import { LabLevel, LabLevelState } from '../const/lab.const';
import { ConditionCategory, ConditionType} from '../const/condition.const';
import {v4 as uuidv4} from 'uuid';
import { CreateLabDto } from '../dtos/lab.dto'

export const labService = {

  registerLab: async (data: CreateLabDto) => {
    let levelConfiguration = await LevelConfiguration.findOne({ level: LabLevel.Zero }).lean();
    const exit_conditions = levelConfiguration?.exit_conditions.map(ec => ({
        is_fullfilled: false, 
        type: ec.type, 
        category: ec.category
      }));

    let lab = new Lab({
        name: data.name,
        vre_id: uuidv4(),
        alias: data.alias,
        levels: [{
            level: LabLevel.Zero,
            state: LabLevelState.InProgress,
            reached_at: new Date(),
            exit_conditions: exit_conditions
        }]
    });

    await lab.save();

    return lab;
  },
  //This is hardcoded to test faster, at a later phase it can be removed and maintained only via the db
  registerConfiguration: async (data: any) => {
    var config = new LevelConfiguration({
        level: LabLevel.Zero,
        exit_conditions: [
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.PlanFeasibility },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.DevelopmentTimeline },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.CodeBase },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.TokenDiscretion },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.LicenseExistence },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.DescriptiveName },
        ]
    });

    await config.save();

    return config;
  },
  currentExitConditions: async (data:any) => {

  }
};
