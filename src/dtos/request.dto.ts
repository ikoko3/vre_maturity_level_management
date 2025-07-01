import { ConditionCategory, ConditionType } from "../const/condition.const";
import { LabLevel } from "../const/lab.const";
import { RequestStatus } from '../const/request.const';

export interface LabCreationDto{
  title: string;
  alias: string;
  scope: string;
  timeplan: string;

  associated_users: [{user_id: string, role_codes: string[]}];
  lab_reference: {lab_id: string, lab_level: LabLevel};

  status: RequestStatus; 
  reviewer_user_id: string; 
}

