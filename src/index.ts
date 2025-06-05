import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import lab_router from './routes/lab.routes';
import userRole_router from './routes/userRoles.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './docs/swagger-output.json';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/lab', lab_router);
app.use(userRole_router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

mongoose.connect(config.mongoUri)
  .then(() => console.log(`Connected to MongoDB [${config.nodeEnv}]`))
  .catch(err => console.error('MongoDB error:', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
