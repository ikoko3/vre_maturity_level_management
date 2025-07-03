import { RoleDto, UserDto, AddRolesToUserDto } from '../dtos/userRole.dto'
import { RoleDefinition } from '../models/role.model';
import { User } from '../models/user.model';

export const userService = {
  addRole: async (data: RoleDto) => {
    var role = new RoleDefinition({
      code: data.code,
      name: data.name,
      description: data.description,
      is_global: data.is_global,       
    });

    await role.save();

    return role;
  },
  getRoles: async () => {
      const roles = await RoleDefinition.find().lean();

      return roles;
  },
  getUsers: async () => {
      const users = (await User.find().lean()).map(
        u => 
        ({
          id: u._id,
          reference_id: u.reference_id,
          email: u.email,
          name: u.name,
          global_roles: u.global_roles,
        })
      );

      return users;
  },
    getUser: async (id: string) => {
      const user = await User.findById(id).lean();
      if (!user) throw new Error('User not found');

      return {
          id: user._id,
          reference_id: user.reference_id,
          email: user.email,
          name: user.name,
          global_roles: user.global_roles,
        };
  },
   getUserByReference: async (reference: string) => {
      const user = await User.findOne({reference_id : reference}).lean();
      if (!user) throw new Error('User not found');

      return {
          id: user._id,
          reference_id: user.reference_id,
          email: user.email,
          name: user.name,
          global_roles: user.global_roles,
        };
  },
   addUser: async (data: UserDto) => {
    const user = new User({
      reference_id: data.reference_id,
      email: data.email,
      name: data.name,
      global_roles: data.global_roles || [],
    });

    await user.save();
    return user;
  },
  addRolesToUser: async (data: AddRolesToUserDto) => {
    const user = await User.findById(data.user_id);
    if (!user) throw new Error('User not found');

    const roles = Array.isArray(data.roles) ? data.roles : [data.roles];
    const updatedRoles = new Set([
      ...(user.global_roles || []),
      ...roles,
    ]);

 
    user.global_roles = Array.from(updatedRoles);
    await user.save();

    return user;
  },

};
