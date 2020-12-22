module.exports = function validateParameters(fields) {
  return (req, res, next) => {
    for (const field of fields) {
      if (!req.body[field]) {
        // Field isn't present, end request
        return res.status(400).send(`${field} Parameter is missing`);
      }
    }
    next();
  };
};
