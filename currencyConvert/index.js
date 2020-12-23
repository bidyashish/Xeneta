module.exports = function currency() {
  return (req, res, next) => {
    if (!req.body.currency || req.body.currency == "USD") next();
    else {
      return res.status(400).send(`curr Parameter is missing`);
    }
  };
};
