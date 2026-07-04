import * as usersService from './users.service.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.fetchAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await usersService.createNewUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
