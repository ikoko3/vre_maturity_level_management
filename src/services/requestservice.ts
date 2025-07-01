import { LabCreationRequest } from '../models/request.model';
import { LabCreationDto } from '../dtos/request.dto';
import { RequestStatus } from '../const/request.const';

export const requestService = {

  createNewRequest: async (data: LabCreationDto) => {
    try{
        let request = new LabCreationRequest({
          title: data.title,
          alias: data.alias,
          scope: data.scope,
          timeplan: data.timeplan,

          associated_users: data.associated_users,

          lab_reference: data.lab_reference,
          status: RequestStatus.Submitted,
        });

        await request.save();
        return request;
    }catch(e){
      return Error(`Error ${e}`);
    }
  } 
};