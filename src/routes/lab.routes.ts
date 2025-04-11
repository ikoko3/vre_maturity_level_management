import express from 'express';
import {Lab} from '../models/lab.model'
import { LabLevel, LabLevelState } from '../const/lab.const';

const router = express.Router();

//These methods are added mainly to demonstrate what can be created

router.post('/register', async ( req, res) => {

    var lab = new Lab({
        name: "Test-Lab",
        vre_id: "23a71e1b-6a80-46b6-8d0d-54d0f6de370b",
        levels: [{
            level: LabLevel.One,
            state: LabLevelState.InProgress,
            reached_at: Date(),
            exit_points: [
                {name: "Do A", is_fullfilled: false},
                {name: "Do B", is_fullfilled: false},
                {name: "Do C", is_fullfilled: true},
            ]
        }]
    });

    lab.save();

    res.status(201).json({"user":"hi"});
});

router.get('/{id}', async (req, res) => {
    res.status(200).json({"user":"hi"});
})

export default router;
