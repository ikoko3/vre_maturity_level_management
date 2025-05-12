import express from 'express';
import {Lab} from '../models/lab.model'
import { LabLevel, LabLevelState } from '../const/lab.const';
import { labService } from '../services/labservice';

const router = express.Router();


/**
 * @swagger
 * /register:
 *   get:
 *     tags: [Lab]
 *     summary: Register new lab
 *     responses:
 *       201:
 *         description: Lab Created.
 */

router.post('/register', async ( req, res) => {

    const lab = await labService.registerLab(req);

    res.status(201).json({"user":"hi"});
});

router.get('/{id}', async (req, res) => {
    res.status(200).json({"user":"hi"});
})

export default router;
