import * as usersService from './users.service.js';

export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const filters = {
      search: req.query.search || '',
      role: req.query.role || 'All Roles',
      status: req.query.status || 'All Status',
    };

    const data = await usersService.fetchAllUsers(page, limit, filters);
    
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data,
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

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await usersService.modifyUser(id, req.body);
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
};
