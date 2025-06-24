import express from 'express';
import { TaskDefinitionService } from '../services/TaskDefinitionService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { short_description, description_url, version, associated_exit_conditions } = req.body;

    if (!short_description || !Array.isArray(associated_exit_conditions)) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    const taskDef = await TaskDefinitionService.createTaskDefinition({
      short_description,
      description_url,
      version,
      associated_exit_conditions,
    });

    res.status(201).json(taskDef);
  } catch (err) {
    console.error('Error creating task definition:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const taskDef = await TaskDefinitionService.getTaskDefinitionById(req.params.id);

    if (!taskDef) {
      res.status(404).json({ message: 'TaskDefinition not found.' });
    }

     res.json(taskDef);
  } catch (err) {
    console.error('Error retrieving task definition:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const list = await TaskDefinitionService.listTaskDefinitions();
     res.json(list);
  } catch (err) {
    console.error('Error listing task definitions:', err);
     res.status(500).json({ message: 'Internal server error.' });
  }
});


export default router;
