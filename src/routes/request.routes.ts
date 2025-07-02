import express from 'express';
import { requestService } from '../services/requestservice';
import { labService } from '../services/labservice';
import { LabCreationDto, LabRequestUpdateDto } from '../dtos/request.dto';
import { ILabCreationRequest, LabCreationRequest } from '../models/request.model';
import { RequestStatus } from '../const/request.const';



const router = express.Router();


router.post('/labs/create', async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/labProposalSchema"
                    }  
                }
            }
        } 
    */
    const dto: LabCreationDto = req.body;
    
    const lab = await requestService.createNewRequest(dto);
  
    res.status(201).json(lab);
  });

  router.post('/labs/:id/update', async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/labProposalUpdateSchema"
                    }  
                }
            }
        } 
    */
    const dto: LabRequestUpdateDto = req.body;
    
    const lab = await requestService.updateLab(req.params["id"], dto);
    if (!lab)
    {
        res.status(400).json(lab);
        return;
    }

    if (dto.status == RequestStatus.Approved){
        var lab_request = lab as ILabCreationRequest;
       
        var lab_creation = labService.registerLab({
                name: lab_request.title,
                alias: lab_request.alias,
                parent_lab_id: '',
            });

        if (!lab_creation)
        {
            res.status(500).json(lab_creation);
            return;
        }

        //Add also the associated users
        //labService.updateUsers(lab_creation.id, lab_request.associated_users.map(u => {u.user_id, u.role_codes)));
    }
  
    res.status(201).json(lab);
  });

  router.get('/labs/:id', async (req, res) => {
      const request = (await LabCreationRequest.findById(req.params["id"]).lean());
      res.status(200).json(request);
  })

 router.get('/labs', async (req, res) => {
  let predicate = {};

  if (!req.query['show_all']) {
    predicate = {
      status: {
        $nin: [RequestStatus.Approved, RequestStatus.Rejected]
      }
    };
  }

  const request = await LabCreationRequest.find(predicate).lean();
  res.status(200).json(request);
});




export default router;
