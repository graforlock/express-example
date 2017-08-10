const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
     if(err.name === 'CastError') {
        const error = new Error(404);
        error.status = 404;
        error.message = 'Sorry, this recipe doesn\'t exist or may have been removed';
        return next(error);
     }
     return next(err)   
    });
};

module.exports = asyncMiddleware;
