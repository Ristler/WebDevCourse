const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error); // forward error to error handler
};
  
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500); // default is 500 if err.status is not defined
    res.json({
        error: {
            message: err.message,
            status: err.status || 500
        }
    });
};

export { notFoundHandler, errorHandler };

