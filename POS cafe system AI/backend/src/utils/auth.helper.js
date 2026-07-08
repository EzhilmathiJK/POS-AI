import * as authRepo from '../modules/auth/auth.repository.js';
import { generateAccessToken, generateRefreshToken } from './jwt.util.js';
import { DEFAULT_ROLE_PERMISSIONS } from '../modules/auth/auth.constants.js';

export const generateAuthTokens = async (user) => {
    let permissions = await authRepo.findPermissionsByRole(user.role);

    if(!permissions) {
        permissions = {
            role: user.role,
            ...DEFAULT_ROLE_PERMISSIONS[user.role],
        };
    }

    const jwtPayload = {
        userId: user.id,
        username: user.username,
        fullname: user.full_name,
        role: user.role,
        permissions: {
            dashboard: permissions.dashboard,
            billing: permissions.billing,
            inventory: permissions.inventory,
            item_request: permissions.item_request,
            sales_report: permissions.sales_report,
            users: permissions.users,
            settings: permissions.settings,
        },
    };

    return {
        accessToken: generateAccessToken(jwtPayload),
        refreshToken: generateRefreshToken(jwtPayload),
    };
};