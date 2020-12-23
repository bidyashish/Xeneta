const pg = require("pg");

const pool = new pg.Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const queryHandler = (req, res, next) => {
  pool
    .query(req.sqlQuery)
    .then((r) => {
      return res.json(r.rows || []);
    })
    .catch(next);
};

module.exports = queryHandler;
