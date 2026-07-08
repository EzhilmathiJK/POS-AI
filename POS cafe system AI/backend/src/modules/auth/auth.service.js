import bcrypt from 'bcrypt';
import * as authRepo from './auth.repository.js';
import { generateAuthTokens } from '../../utils/auth.helper.js';
import { ROLES } from './auth.constants.js';

export const registerUser = async (userData) => {
  const { full_name, username, email, password } = userData;

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
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await authRepo.createUser({
    full_name,
    username,
    email,
    password: hashedPassword,
    role: ROLES.STAFF,
  });

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const loginUser = async (username, password) => {
  
  const user = await authRepo.findUserByUsername(username);
  if (!user || user.is_deleted || !user.is_active) {
    const error = new Error('Invalid username or password');
    error.statusCode = 401;
    throw error;
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid username or password');
    error.statusCode = 401;
    throw error;
  }

  return await generateAuthTokens(user);
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

export const loginWithGoogle = async (googleUser) => {
  const email = googleUser.emails?.[0]?.value;

  if(!email) {
    const error = new Error('Google account does not contain an email');
    error.statusCode = 400;
    throw error;
  }

  const user = await authRepo.findUserByEmail(email);

  if (!user || user.is_deleted || !user.is_active) {
    const error = new Error('Google email is not registered');
    error.statusCode = 401;
    throw error;
  }

  return await generateAuthTokens(user);
};
