import express from 'express';
import {Lab} from '../models/lab.model'
import { LabLevel, LabLevelState } from '../const/lab.const';
import { labService } from '../services/labservice';
import { CreateLabDto } from '../dtos/lab.dto';

const router = express.Router();

            /**
            * @openapi
            *      requestBody:
            *            description: 'Lab Creation Api'
            *            schema:
            *              type: object
            *              required:
            *                  - name
            *                  - alias
            *              properties:
            *                  name:
            *                      type: string
            *                  alias:
            *                      type: string
            **/
router.post('/register', async ( req, res) => {
            
    const dto: CreateLabDto = req.body;
    const lab = await labService.registerLab(dto);

    res.status(201).json(lab);
});

router.post('/config-setup', async ( req, res) => {

    const config = await labService.registerConfiguration(req);

    res.status(201).json(config);
});


router.get('/:id', async (req, res) => {
    let lab = await Lab.findById(req.params['id']).lean();
    if (!lab){
        res.status(404).json({ message: "Lab not found" });
        return;
    }

    res.status(200).json(lab);
})

router.get('/by-alias/:alias', async (req, res) => {
    let lab = await Lab.findOne({alias: req.params['alias']}).lean();
    if (!lab){
        res.status(404).json({ message: "Lab not found" });
        return;
    }

    res.status(200).json(lab);
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

export default router;
