export function isSuperAdmin(user) {
  return !!user && user.roles_id === 99;
}

export function hasRole(user, roleId) {
  if (isSuperAdmin(user)) return true;
  return !!user && user.roles_id === roleId;
}

export function anyRole(user, roleIds = []) {
  if (isSuperAdmin(user)) return true;
  return Array.isArray(roleIds) && !!user && roleIds.includes(user.roles_id);
}

export function canOperational(user) {
  // role 3 operational officer
  return isSuperAdmin(user) || hasRole(user, 3);
}

export function canCEO(user) {
  return isSuperAdmin(user) || hasRole(user, 1);
}

export function canFinance(user) {
  return isSuperAdmin(user) || hasRole(user, 2);
}

export function canHR(user) {
  return isSuperAdmin(user) || hasRole(user, 6);
}

export function canManagement(user) {
  return anyRole(user, [1,2,3,5,6]);
}
