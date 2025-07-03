import {Lab, ILab } from '../models/lab.model';
import { LevelConfiguration} from '../models/condition_configuration';
import { LabLevel, LabLevelState } from '../const/lab.const';
import { ConditionCategory, ConditionType, ConditionStatus} from '../const/condition.const';
import { CreateLabDto, LabResponseDto, ConditionUpdateDto, UsersToAssignDto, LevelUpdateDto } from '../dtos/lab.dto'
import { User } from '../models/user.model';
import { get } from 'http';

export const labService = {


    registerLab: async (data: CreateLabDto) => {
        try{
          let levelConfiguration = await LevelConfiguration.findOne({ level: LabLevel.Zero }).lean();
          const exit_conditions = levelConfiguration?.exit_conditions.map(ec => ({
              type: ec.type, 
              status: ConditionStatus.Unknown,
              category: ec.category,
              tooltip_url: ec.tooltip_url,
            }));

          let lab = new Lab({
              name: data.name,
              parent_lab: {
                id: data.parent_lab_id,
                level: data.parent_lab_level},
              alias: data.alias,
              current_level: LabLevel.Zero,
              levels: [{
                  level: LabLevel.Zero,
                  state: LabLevelState.InDevelopment,
                  reached_at: new Date(),
                  exit_conditions: exit_conditions
              }]
          });

          await lab.save();

          return lab;
        }catch(e){
          console.error(`Error registering lab: ${e}`);
          return Error(`Error registering lab: ${e}`);
        }
  },
  //This is hardcoded to test faster, at a later phase it can be removed and maintained only via the db
  registerConfiguration: async (data: any) => {
    var config_l0 = new LevelConfiguration({
        level: LabLevel.Zero,
        exit_conditions: [
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.PlanFeasibility, tooltip_url: "https://naavre.net/docs/readiness_levels/development_plan/" },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.DevelopmentTimeline, tooltip_url: "https://naavre.net/docs/readiness_levels/L0_initial_proposal/" },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.CodeBase, tooltip_url: "https://naavre.net/docs/readiness_levels/L0_initial_proposal/" },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.TokenDiscretion, tooltip_url: "https://naavre.net/docs/readiness_levels/L0_initial_proposal/" },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.LicenseExistence, tooltip_url: "https://naavre.net/docs/readiness_levels/L0_initial_proposal/" },
            {category: ConditionCategory.LabLevelProgression, type: ConditionType.DescriptiveName, tooltip_url: "https://naavre.net/docs/readiness_levels/L0_initial_proposal/" },
          ]
    });
    await config_l0.save();

    var config_l1 = new LevelConfiguration({
      level: LabLevel.One,
      exit_conditions: [
        { category: ConditionCategory.Intermediary, type: ConditionType.DocumentationMetadata, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#documentation" },
        { category: ConditionCategory.Intermediary, type: ConditionType.DocumentationMetadataVersionControl, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#documentation" },

        { category: ConditionCategory.Intermediary, type: ConditionType.PersonalTokens, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#security" },

        { category: ConditionCategory.Intermediary, type: ConditionType.VersionsPinned, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#versioning" },

        { category: ConditionCategory.LabLevelProgression, type: ConditionType.DataReadiness, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#data" },
        { category: ConditionCategory.LabLevelProgression, type: ConditionType.ExternalDataCatalogue, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#data" },

        { category: ConditionCategory.LabLevelProgression, type: ConditionType.NoErrors, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#codebase" },
        { category: ConditionCategory.LabLevelProgression, type: ConditionType.CodeResponsibility, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#codebase" },
        { category: ConditionCategory.LabLevelProgression, type: ConditionType.CodingStyleGuide, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#codebase" },
        { category: ConditionCategory.LabLevelProgression, type: ConditionType.Parallelization, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#codebase" },
        { category: ConditionCategory.LabLevelProgression, type: ConditionType.MissingDataErrorHandling, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#codebase" },
        { category: ConditionCategory.LabLevelProgression, type: ConditionType.ExternalToolLabeling, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#codebase" },

        { category: ConditionCategory.LabLevelProgression, type: ConditionType.ContainerizedCells, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#containerization" },

        { category: ConditionCategory.LabLevelProgression, type: ConditionType.BenchmarkResources, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#infrastructure" },
        { category: ConditionCategory.LabLevelProgression, type: ConditionType.ResourceAvailability, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#infrastructure" },

        { category: ConditionCategory.LabLevelProgression, type: ConditionType.ContainerExecution, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#workflow-execution" },
        { category: ConditionCategory.LabLevelProgression, type: ConditionType.LabDemonstrationPossible, tooltip_url: "https://naavre.net/docs/readiness_levels/L1_co-development/#workflow-execution" },
      ]
      }
    );
    await config_l1.save();

  },currentExitConditions: (data: ILab) => currentExitConditions(data)
  ,getLabsBasedOnRole: async (user_id:string, role: string) => {
      const labs = await Lab.find({
        assigned_users: {
          $elemMatch: {
            user_id: user_id,
            role_codes: role,
          }
        }
      }).lean();

      return labs.map(currentExitConditions);
  },
  updateExitCondition: async (lab_id:string, condition_id:string ,dto: ConditionUpdateDto) => {
    try{

      const lab = await Lab.findById(lab_id);
      if (!lab) 
        return Error('Not found');

      let current_level = getMostRecentLevel(lab);
      let condition = current_level?.exit_conditions.find(ec => ec._id == condition_id);
      if (!condition)
        return Error('Not found');

      if (dto?.status)
        condition.status = dto.status;
      if (dto?.comments)
      condition.comments = dto.comments;
      if (dto?.discussion_url)
      condition.discussion_url = dto.discussion_url;

      await lab?.save();

      return condition;

    }catch(e){
      return Error(`Error ${e}`);
    }
  }, updateLevelState: async (lab_id:string, dto: LevelUpdateDto) => {
    
    try{

      const lab = await Lab.findById(lab_id);
      if (!lab) 
        return Error('Not found');

      let level_to_update = lab.levels.find(l => l.level == dto.level);
      if (!level_to_update)
        return Error('Lab Level not found');
        
      level_to_update.state = dto.state;

      //Check level update special cases
      if (dto.state == LabLevelState.Completed){
        var upgrade_result = await progressLevel(lab_id);
        if (upgrade_result instanceof Error)
          return Error('All Exit Conditions need to be Verified');
      }

      await lab?.save();

      return lab;
    }catch(e){
      return Error(`Error ${e}`);
    }
  },updateUsers: async (lab_id: string, dto: UsersToAssignDto[]) => {
  try {
    const lab = await Lab.findById(lab_id);
    if (!lab) return new Error('Not found');

    for (const d of dto) {
      // Ensure incoming role codes are unique
      const incomingRoles = Array.from(new Set(d.role_codes || []));

      // Try to find existing user
      const existingUser = lab.assigned_users.find(u => u.user_id.toString() === d.user_id);

      if (existingUser) {
        // Merge unique role codes
        const roleSet = new Set([
          ...(existingUser.role_codes || []),
          ...incomingRoles,
        ]);
        existingUser.role_codes = Array.from(roleSet);


        // Let Mongoose know this array has changed
        lab.markModified('assigned_users');
      } else {
        let user = await User.findById(d.user_id);
        if (!user) {
          console.error(`User with ID ${d.user_id} not found`);
          continue; // Skip this user if not found
        }

        // Add new user entry
        lab.assigned_users.push({
          user_id: d.user_id,
          name: user.name,
          email: user.email,
          role_codes: incomingRoles,
          assigned_at: new Date(),
          reference_id: user.reference_id,
        });
      }
    }

    await lab.save();
    return lab;

  } catch (e) {
    console.error('Error updating lab users:', e);
    return Error(`Error ${e}`);
  }
}, getLabDependenciesGraph: async () => {
     // const labs = (await Lab.find({}, 'name description current_level alias').lean()).map(lab => ({
    const labs = await Lab.find({}, 'alias id levels parent_lab').lean();

    const nodes = [];
    const edges = [];

    for (const lab of labs) {

      for (const level of lab.levels) {
            nodes.push({
                id: `${lab._id}-${level.level}`,
                label: `${lab.alias} L${level.level}`,
                level: level.level,
            });

            if (level.level != LabLevel.Zero) {
                edges.push({
                    from: `${lab._id}-${level.level - 1}`,
                    to: `${lab._id}-${level.level}`
                });
            }
        }

        if (lab.parent_lab && lab.parent_lab.id) {
            edges.push({
                from: `${lab.parent_lab.id}-${lab.parent_lab.level}`,
                to: `${lab._id}-${LabLevel.Zero}`
            });
        }
    }

    const graph = {
        nodes: nodes,
        edges: edges  
    };

    return graph;
}

};



function getMostRecentLevel(lab: ILab): ILab["levels"][0] {
  return [...lab.levels].sort((a, b) => new Date(b.reached_at).getTime() - new Date(a.reached_at).getTime())[0];
}

export function currentExitConditions(lab: ILab): LabResponseDto {
    let current_level = getMostRecentLevel(lab);

    let lab_dto : LabResponseDto = 
    {
      id : lab._id,
      alias: lab.alias,
      current_level: current_level?.level,
      level_state: current_level.state,
      name: lab.name,
      assigned_users: lab.assigned_users.map(au => ({user_id: au.user_id, role_codes: au.role_codes, assigned_at: au.assigned_at, name: au.name, email: au.email, reference_id: au.reference_id})),
      exit_conditions: current_level.exit_conditions.map(ec => ({
        id: ec._id,
        status: ec.status,
        discussion_url: ec.discussion_url,
        type: ec.type,
        category: ec.category,
        comments: ec.comments,
        tooltip_url: ec.tooltip_url,
      })),
    };
  
    return lab_dto;
}

async function progressLevel(lab_id:string ) {
    try{
      const lab = await Lab.findById(lab_id);
      if (!lab) 
        return Error('Not found');

      let current_level = getMostRecentLevel(lab);
      if (current_level.level == LabLevel.Four)
          return;

      var exit_conditions_not_ready = current_level.exit_conditions.some(ec => ec.status != ConditionStatus.Verified);
      if (exit_conditions_not_ready)
        return Error('Exit Conditions have to be verified');

      let next_level = (current_level.level + 1) as LabLevel;
      let levelConfiguration = await LevelConfiguration.findOne({ level: next_level}).lean();
      const exit_conditions = (levelConfiguration?.exit_conditions || []).map(ec => ({
          type: ec.type, 
          status: ConditionStatus.Unknown,
          category: ec.category,
          tooltip_url: ec.tooltip_url,
        }));

        lab.levels.push({
            level: next_level,
            state: LabLevelState.InDevelopment,
            reached_at: new Date(),
            exit_conditions: exit_conditions as [{
              _id: string;
              category: number;
              type: number;
              status: number;
              discussion_url: string;
              comments: string;
              tooltip_url: string;
            }],
        });
        lab.current_level = next_level;

        lab.save();
    }catch(e){
      return Error(`Error ${e}`);
    }
  };