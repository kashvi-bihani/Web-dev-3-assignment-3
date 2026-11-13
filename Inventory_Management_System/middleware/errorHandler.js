const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

const errorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error";

    if (error.name === "ValidationError" || error.name === "CastError") {
        statusCode = 400;
    }

    if (error.code === 11000) {
        statusCode = 409;
        message = "SKU already exists";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = {
    notFound,
    errorHandler
};
