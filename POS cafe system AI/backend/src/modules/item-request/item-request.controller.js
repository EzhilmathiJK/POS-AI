import * as ItemRequestService from './item-request.service.js';

export const createItemRequest = async (req, res, next) => {
  try {
    const result = await ItemRequestService.createItemRequest(req.body, req.user.fullname);
    res.status(201).json({ success: true, message: 'Request created successfully.', data: result });
  } catch (error) {
    next(error);
  }
};

export const submitItemRequest = async (req, res, next) => {
  try {
    const result = await ItemRequestService.submitItemRequest(req.params.id);
    res.status(200).json({ success: true, message: 'Item request submitted successfully.', data: result });
  } catch (error) {
    next(error);
  }
};

export const getAllItemRequests = async (req, res, next) => {
  try {
    const pagination = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };

    const filters = {
      requestNo: req.query.requestNo,
      subject: req.query.subject,
      requestedBy: req.query.requestedBy,
      status: req.query.status,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    };

    const result = await ItemRequestService.getAllItemRequests(pagination, filters);
    res.status(200).json({ success: true, message: 'Requests fetched successfully.', data: result });
  } catch (error) {
    next(error);
  }
};

export const getItemRequestFilters = async (req, res, next) => {
  try {
    const result = await ItemRequestService.getItemRequestFilters();
    res.status(200).json({ success: true, message: 'Request filters fetched successfully.', data: result });
  } catch (error) {
    next(error);
  }
};

export const getItemRequestById = async (req, res, next) => {
  try {
    const result = await ItemRequestService.getItemRequestById(req.params.id);
    res.status(200).json({ success: true, message: 'Request fetched successfully.', data: result });
  } catch (error) {
    next(error);
  }
};

export const updateItemRequest = async (req, res, next) => {
  try {
    const result = await ItemRequestService.updateItemRequest(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Item request updated successfully.', data: result });
  } catch (error) {
    next(error);
  }
};

export const cancelItemRequest = async (req, res, next) => {
  try {
    const result = await ItemRequestService.cancelItemRequest(req.params.id);
    res.status(200).json({ success: true, message: 'Item request cancelled successfully.', data: result });
  } catch (error) {
    next(error);
  }
};
