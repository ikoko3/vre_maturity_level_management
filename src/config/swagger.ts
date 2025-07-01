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
          $status: 100,
          $comments: '',
          $discussion_url: 'http://google.com',
        },
        levelStatusUpdateSchema:{
          $level: 0,
          $state: 200,
        },
        roleSchema: {
          $code: "VLD",
          $name: "Virtual Lab Developer",
          $description: "Develops Virtual Labs",
          $is_global: false,
        },
        userSchema:{
          $reference_id: "12345",
          $email: "test@test.nl",
          $name: "Joe Doe",
          $global_roles: "['VLD']",
        },
        userRolesSchema:{
          $roles: "['VLD']",
        },
        labRoleSchema: [{
          $user_id: "68417f10dbbf0245911c648c",
          $role_codes: "[VLD]",
        }],
        labProposalSchema: {
          $title: "Dolphin watching Lab",
          $alias: "DLPH-01",
          $scope: "I need this lab for ...",
          $timeplan: "It will be completed by the end of 2100",
          $associated_users: [{'user_id':'12345', 'role_codes':['GLU']}],
          $lab_reference: {'lab_id':'12345', 'lab_level':0},
        },
    }
} 
};

const outputFile = './src/docs/swagger-output.json';
const endpointsFiles = ['./src/index.ts']; // main file that initializes routes

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
