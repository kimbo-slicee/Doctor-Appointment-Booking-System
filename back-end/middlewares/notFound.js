const notFoundError = (req, res, next) => {
    res.status(404).json({ msg: "Route not found" });
};

export default notFoundError;