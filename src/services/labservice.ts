import {Lab } from '../models/lab.model'
import { LabLevel, LabLevelState, ConditionType } from '../const/lab.const';

export const labService = {


  registerLab: async (data: any) => {
    var lab = new Lab({
        name: "Test-Lab",
        vre_id: "23a71e1b-6a80-46b6-8d0d-54d0f6de370b",
        levels: [{
            level: LabLevel.One,
            state: LabLevelState.InProgress,
            reached_at: Date(),
            exit_points: [
                {name: "Do A", is_fullfilled: false, type: 10 },
                //{name: "Do B", is_fullfilled: false, type: ConditionType.LabLevelProgression},
                //{name: "Do C", is_fullfilled: true, type: ConditionType.LabLevelProgression },
            ]
        }]
    });

    lab.save();

    return lab;
  },
};
