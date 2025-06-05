import express from 'express';
import {Lab} from '../models/lab.model'
import { userService } from '../services/userservice';
import { RoleDto } from '../dtos/userRole.dto';

const router = express.Router();


router.post('/role', async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/roleSchema"
                    }  
                }
            }
        } 
    */
    const dto: RoleDto = req.body;
    let update_result = await userService.addRole(dto);

    res.status(200).json(update_result);
});

//TODO: UPDATE THE ROLE
router.post('/role/:code', async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/roleSchema"
                    }  
                }
            }
        } 
    */
  

    res.status(200).json({});
});

router.get('/roles', async (req, res) => {
    let roles = await userService.getRoles();

    res.status(200).json(roles);
});

// User Endpoints
router.post('/users', async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userSchema"
                    }  
                }
            }
        } 
    */

    const user = await userService.addUser(req.body);
    res.status(201).json(user);
});

router.post('/users/:id/roles', async (req, res) => {
/*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userRolesSchema"
                    }  
                }
            }
        } 
    */

  try {
    const user = await userService.addRolesToUser({
      user_id: req.params.id,
      roles: req.body.roles,
    });
    res.status(200).json(user);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    res.status(400).json({ error: error.message, stack: error.stack });
    }
});


export default router;
