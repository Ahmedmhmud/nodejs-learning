const notFoundHandler = (req, res, next) => {
    const error = { message: "Page not found", status: 404 };
    next(error);
};

export default notFoundHandler;