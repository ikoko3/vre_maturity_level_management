import { ConditionCategory, ConditionType } from "../const/condition.const";
import { LabLevel } from "../const/lab.const";

export interface ExitConditionDto{
  id: string;
  category: ConditionCategory;
  type: ConditionType;
  comments: string;
  status: number;
  discussion_url: string;
  tooltip_url: string;
}

export interface LabResponseDto {
    id: string;
    name: string;
    alias: string;
    current_level: LabLevel;
    exit_conditions: ExitConditionDto[];
    assigned_users: AssignedUserDto[];
  }
  
  export interface CreateLabDto {
    name: string;
    alias: string;
    parent_lab_id: string;
    parent_lab_level: LabLevel;
  }

  export interface ConditionUpdateDto {
    status: number;
    comments: string;
    discussion_url: string;
  }
  
  export interface LevelUpdateDto {
    level: number;
    state: number;
  }

  export interface AssignedUserDto{
      user_id: string;
      role_codes: [string];
      email: string;
      name: string;
      reference_id: string;
  }

    export interface UsersToAssignDto{
      role_codes: string[];
      user_id: string;
  }
