import {Lab, ILab } from '../models/lab.model';
import { LevelConfiguration} from '../models/condition_configuration';
import { LabLevel, LabLevelState } from '../const/lab.const';
import { ConditionCategory, ConditionType} from '../const/condition.const';
import {v4 as uuidv4} from 'uuid';
import { CreateLabDto, LabResponseDto, ConditionUpdateDto, AssignUserDto } from '../dtos/lab.dto'

export const labService = {

  registerLab: async (data: CreateLabDto) => {
    let levelConfiguration = await LevelConfiguration.findOne({ level: LabLevel.Zero }).lean();
    const exit_conditions = levelConfiguration?.exit_conditions.map(ec => ({
        _id: uuidv4(),
        is_fullfilled: false, 
        type: ec.type, 
        category: ec.category
      }));

    let lab = new Lab({
        name: data.name,
        parent_lab_id: data.parent_lab_id,
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
  currentExitConditions: async (lab: ILab) => {
    let current_level = lab.levels.sort((a, b) => a.reached_at.getTime() - b.reached_at.getTime())[0] ?? null;

    let lab_dto : LabResponseDto = 
    {
      id : lab.id,
      alias: lab.alias,
      current_level: current_level.level,
      name: lab.name,
      exit_conditions: current_level.exit_conditions.map(ec => ({
        id: ec._id,
        is_fullfilled: ec.is_fullfilled,
        type: ec.type,
        category: ec.category,
        comments: ec.comments,
      })),
    };
  
    return lab_dto;
  },
  updateExitCondition: async (lab_id:string ,condition_id:string ,dto: ConditionUpdateDto) => {
    
    try{

      const lab = await Lab.findById(lab_id);
      if (!lab) 
        return Error('Not found');

      let current_level = lab.levels.sort((a, b) => a.reached_at.getTime() - b.reached_at.getTime())[0] ?? null;
      let condition = current_level?.exit_conditions.find(ec => ec._id == condition_id);
      if (!condition)
        return Error('Not found');

      condition.is_fullfilled = dto.is_fullfilled;
      condition.comments = dto.comments;

      await lab?.save();

      return condition;

    }catch(e){
      return {ok: 'den se agapo'};
    }
  },updateUsers: async (lab_id:string, dto:AssignUserDto[] ) => {
    
    try{

      const lab = await Lab.findById(lab_id);
      if (!lab) 
        return Error('Not found');

      // do not actually replace them all
      lab.assigned_users = dto.map(d => ({
        user_id: d.user_id,
        role_code: d.role_code,
        assigned_at: new Date(),
      }));

     await lab.save();

     return lab;

    }catch(e){
      return {ok: 'den se agapo'};
    }
  }
};
