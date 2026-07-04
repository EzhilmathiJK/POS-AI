/**
 * Centralized Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  // Console log error for internal debugging
  console.error('[Error]:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Format consistent with user requirements
  const errorResponse = {
    success: false,
    message: message,
    errors: err.errors || []
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
