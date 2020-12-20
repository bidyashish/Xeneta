module.exports = function validateQueryStrings(fields) {
  return (req, res, next) => {
    for (const field of fields) {
      if (!req.query[field]) {
        // Field isn't present, end request
        return res.status(400).send(`${field} Query String is missing`);
      }
    }
    next();
  };
};
