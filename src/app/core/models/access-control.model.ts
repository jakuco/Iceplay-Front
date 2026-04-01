import type { DbId } from './db.types';

export interface Role {
    id: DbId;
    name: string;
    description: string;
    isActive: boolean;
}

export interface Permission {
    id: DbId;
    action: string;
    resource: string;
    isActive: boolean;
}

export interface RolePermission {
    roleId: DbId;
    permissionId: DbId;
}
