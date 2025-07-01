import { LabCreationRequest, ILabCreationRequest } from '../models/request.model';
import { LabCreationDto, LabRequestUpdateDto } from '../dtos/request.dto';
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
  },
  updateLab: async (lab_id: string, data: LabRequestUpdateDto) : Promise<ILabCreationRequest | Error>  => {
    try{
      let request = await LabCreationRequest.findById(lab_id);

      if (!request)
        return Error(`lab ${lab_id} not found`);
     
      request.comments = data.comments;
      request.reviewer_user_id = data.reviewer_user_id;
      request.status = data.status;

      await request.save();

      return request;
    }catch(e){
      return Error(`Error ${e}`);
    }
  }
};