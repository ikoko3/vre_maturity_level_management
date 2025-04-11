import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';

import { User } from './models/user.model';


const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect(config.mongoUri)
  .then(() => console.log(`Connected to MongoDB [${config.nodeEnv}]`))
  .catch(err => console.error('MongoDB error:', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  });