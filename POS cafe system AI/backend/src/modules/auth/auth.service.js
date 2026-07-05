import bcrypt from 'bcrypt';
import * as authRepo from './auth.repository.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.util.js';
import { ROLES, DEFAULT_ROLE_PERMISSIONS } from './auth.constants.js';

export const registerUser = async (userData) => {
  const { full_name, username, email, password } = userData;

  // 1. Check duplicate username or email
  const existingEmail = await authRepo.findUserByEmail(email);
  if (existingEmail) {
    const error = new Error('Email is already registered');
    error.statusCode = 400;
    throw error;
  }

  const existingUsername = await authRepo.findUserByUsername(username);
  if (existingUsername) {
    const error = new Error('Username is already taken');
    error.statusCode = 400;
    throw error;
  }

  // 2. Hash password with 12 salt rounds
  const hashedPassword = await bcrypt.hash(password, 12);

  // 3. Create user with STAFF role default
  const newUser = await authRepo.createUser({
    full_name,
    username,
    email,
    password: hashedPassword,
    role: ROLES.STAFF, 
  });

  // Omit password from return object
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const loginUser = async (username, password) => {
  // 1. Find user by username
  const user = await authRepo.findUserByUsername(username);
  if (!user || user.is_deleted || !user.is_active) {
    const error = new Error('Invalid username or password');
    error.statusCode = 401;
    throw error;
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid username or password');
    error.statusCode = 401;
    throw error;
  }

  // 3. Get Role Permissions
  let permissions = await authRepo.findPermissionsByRole(user.role);
  if (!permissions) {
    permissions = { role: user.role, ...DEFAULT_ROLE_PERMISSIONS[user.role] };
  }

  // 4. Generate Tokens
  const jwtPayload = {
    userId: user.id,
    role: user.role,
    fullname: user.full_name,
  };

  const accessToken = generateAccessToken(jwtPayload);
  const refreshToken = generateRefreshToken(jwtPayload);

  // Omit password
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    permissions,
    accessToken,
    refreshToken,
  };
};

export const getUserWithPermissions = async (userId) => {
  const user = await authRepo.findUserById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const permissions = await authRepo.findPermissionsByRole(user.role);
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, permissions };
};
