import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation with swagger-autogen',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    {
      name: 'Users',
      description: 'User-related endpoints',
    },
  ],
  components: {
    schemas: {
        labCreationSchema: {
          $name: "Dolphin watching Lab",
          $alias: "DLPH-01",
          $parent_lab_id: "",
        },
        conditionUpdateSchema:{
          $is_fullfilled: true,
          $comments: ''
        }
    }
} 
};

const outputFile = './src/docs/swagger-output.json';
const endpointsFiles = ['./src/index.ts']; // main file that initializes routes

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
