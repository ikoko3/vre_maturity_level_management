import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import { keycloak, memoryStore } from './config/keycloak';
import { config } from './config/config';
import lab_router from './routes/lab.routes';
import request_router from './routes/request.routes';
import userRole_router from './routes/userRoles.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './docs/swagger-output.json';


import taskDefinitionRoutes from './auto_assess/routes/taskDefinition.routes';



const app = express();
const PORT = 3000;

app.use(cors());
app.use(
  session({
    secret: 'some-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(keycloak.middleware());

app.use(express.json());
app.use('/lab', lab_router);
app.use('/request', request_router);
app.use(userRole_router);

app.use('/task-definitions', taskDefinitionRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


mongoose.connect(config.mongoUri)
  .then(() => console.log(`Connected to MongoDB [${config.nodeEnv}]`))
  .catch(err => console.error('MongoDB error:', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
