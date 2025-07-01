import express from 'express';
import { requestService } from '../services/requestservice';
import { LabCreationDto } from '../dtos/request.dto';



const router = express.Router();


router.post('/propose-lab', async (req, res) => {
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


export default router;
