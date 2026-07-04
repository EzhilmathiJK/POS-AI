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
