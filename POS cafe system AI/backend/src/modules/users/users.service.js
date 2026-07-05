import bcrypt from 'bcrypt';
import * as usersRepo from './users.repository.js';
import * as authRepo from '../auth/auth.repository.js'; // reuse for duplicate check & create

export const fetchAllUsers = async () => {
  return await usersRepo.getAllUsers();
};

export const createNewUser = async (userData) => {
  const { full_name, username, email, password, role } = userData;

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

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 3. Create user
  const newUser = await authRepo.createUser({
    full_name,
    username,
    email,
    password: hashedPassword,
    role, 
  });

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const modifyUser = async (id, updateData) => {
  const { full_name, username, email, password, role, is_active } = updateData;

  // Build the data object for update
  const data = {};
  if (full_name) data.full_name = full_name;
  if (role) data.role = role;
  if (is_active !== undefined) data.is_active = is_active;
  if (username) data.username = username;
  if (email) data.email = email;

  if (password && password.trim() !== '') {
    data.password = await bcrypt.hash(password, 12);
  }

  // Handle unique constraints safely
  try {
    return await usersRepo.updateUser(id, data);
  } catch (error) {
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0] || 'Field';
      const customError = new Error(`${field} is already in use`);
      customError.statusCode = 400;
      throw customError;
    }
    throw error;
  }
};
