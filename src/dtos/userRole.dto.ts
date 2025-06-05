import { ConditionCategory, ConditionType } from "../const/condition.const";
import { LabLevel } from "../const/lab.const";


export interface RoleDto {
    code: string;
    name: string;
    description: string;
    is_global: boolean;
}
  
export interface UserDto {
  reference_id: string;
  email: string;
  name: string;
  global_roles?: string[]; 
}

export interface AddRolesToUserDto {
  user_id: string;
  roles: string[];
}
