import express from 'express';
import {Lab} from '../models/lab.model'
import { LabLevel, LabLevelState } from '../const/lab.const';
import { labService } from '../services/labservice';
import { AssignUserDto, ConditionUpdateDto, CreateLabDto, LabResponseDto } from '../dtos/lab.dto';
import { authenticate } from '../middleware/authMiddleware';


const router = express.Router();


router.post('/register', async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/labCreationSchema"
                    }  
                }
            }
        } 
    */
    const dto: CreateLabDto = req.body;
    
    const lab = await labService.registerLab(dto);
  
    res.status(201).json(lab);
  });

router.post('/config-setup', async ( req, res) => {

    const config = await labService.registerConfiguration(req);

    res.status(201).json(config);
});


router.get('/:id', authenticate, async (req, res) => {
     //const user = req.kauth.grant.access_token.content;
    //console.log("User info:", user);

    let lab = await Lab.findById(req.params['id']).lean();
    if (!lab){
        res.status(404).json({ message: "Lab not found" });
        return;
    }

    res.status(200).json(await labService.currentExitConditions(lab));
})

router.get('/by-alias/:alias', async (req, res) => {
    let lab = await Lab.findOne({alias: req.params['alias']}).lean();
    if (!lab){
        res.status(404).json({ message: "Lab not found" });
        return;
    }

    res.status(200).json(await labService.currentExitConditions(lab));
})


router.get('/detailed/:id', async (req, res) => {
    let lab = await Lab.findById(req.params['id']).lean();
    if (!lab){
        res.status(404).json({ message: "Lab not found" });
        return;
    }

    res.status(200).json(lab);
})


router.get('/detailed/by-alias/:alias', async (req, res) => {
    let lab = await Lab.findOne({alias: req.params['alias']}).lean();
    if (!lab){
        res.status(404).json({ message: "Lab not found" });
        return;
    }

    res.status(200).json(lab);
})

router.post('/:id/exit_condition/:exit_condition_id/update', async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conditionUpdateSchema"
                    }  
                }
            }
        } 
    */
    const dto: ConditionUpdateDto = req.body;
    let update_result = await labService.updateExitCondition(req.params['id'], req.params['exit_condition_id'], dto);

    res.status(200).json(update_result);
})

router.post('/:id/assign-users', async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/labRoleSchema"
                    }  
                }
            }
        } 
    */
   try{
        const dto: AssignUserDto[] = req.body;
        let update_result = await labService.updateUsers(req.params['id'], dto );
        
        res.status(200).json(update_result);
    } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error(String(e));
        res.status(400).json({ error: error.message, stack: error.stack });
    }
})

export default router;
