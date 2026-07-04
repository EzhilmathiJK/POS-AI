export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
  CASHIER: 'CASHIER',
};

// Default permissions applied when a role is first created
export const DEFAULT_ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: {
    dashboard: true,
    billing: true,
    inventory: true,
    item_request: true,
    sales_report: true,
    users: true,
    settings: true,
  },
  [ROLES.MANAGER]: {
    dashboard: true,
    billing: true,
    inventory: true,
    item_request: true,
    sales_report: true,
    users: false,
    settings: false,
  },
  [ROLES.STAFF]: {
    dashboard: false,
    billing: true,
    inventory: false,
    item_request: true,
    sales_report: false,
    users: false,
    settings: false,
  },
  [ROLES.CASHIER]: {
    dashboard: false,
    billing: true,
    inventory: false,
    item_request: false,
    sales_report: true,
    users: false,
    settings: false,
  },
};
