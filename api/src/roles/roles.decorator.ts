import { SetMetadata } from '@nestjs/common';
import { AdminRole } from '../../generated/prisma/enums';

export const ROLES_KEY = 'roles';

/** Restrict a route to one or more AdminRoles. */
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);
