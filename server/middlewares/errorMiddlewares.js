const routeNotFound = (res, req, next) => {
    const error = new Error(`Route Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, res, req, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === 'Cast Error' && err.kind === 'ObjectId'){
        statusCode = 404
        message = 'Resource Not Found'
    }
    req.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV !== 'Production' ? null : err.stack,
    });
};

export {routeNotFound, errorHandler};