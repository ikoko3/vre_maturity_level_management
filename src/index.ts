import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import lab_router from './routes/lab.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/lab', lab_router)

mongoose.connect(config.mongoUri)
  .then(() => console.log(`Connected to MongoDB [${config.nodeEnv}]`))
  .catch(err => console.error('MongoDB error:', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
