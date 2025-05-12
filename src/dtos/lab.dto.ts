import { ConditionCategory, ConditionType } from "../const/condition.const";
import { LabLevel } from "../const/lab.const";

export interface ExitConditionDto{
  id: string;
  category: ConditionCategory;
  type: ConditionType;
  comments: string;
  is_fullfilled: boolean;
}

export interface LabResponseDto {
    id: string;
    name: string;
    alias: string;
    current_level: LabLevel;
    exit_conditions: ExitConditionDto[];
  }
  
  export interface CreateLabDto {
    name: string;
    alias: string;
  }

  export interface ConditionUpdateDto {
    is_fullfilled: boolean;
    comments: string;
  }
  