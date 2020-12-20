const express = require("express");
const pg = require("pg");
const bodyParser = require("body-parser");
const moment = require("moment");

const validateParameters = require("./validateParameters");
const validateQueryStrings = require("./validateQueryStrings");

const checkCurrency = require("./currency");

const app = express();
app.use(bodyParser.json());

const pool = new pg.Pool({
  host: "localhost",
  database: "jojo",
  user: "ashish",
  password: "yournewpass",
  port: "5432",

  // host: process.env.PGHOST,
  // database: process.env.PGDATABASE,
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT
});

const queryHandler = (req, res, next) => {
  pool
    .query(req.sqlQuery)
    .then((r) => {
      return res.json(r.rows || []);
    })
    .catch(next);
};

app.get("/", (req, res) => {
  res.send(
    "Welcome to Xeneta API test by Bidyashish Kumar more info at http://bidyashish.com 😎"
  );
});

app.get(
  "/rates",
  validateQueryStrings(["date_from", "date_to", "origin", "destination"]),
  (req, res, next) => {
    req.sqlQuery = `
    SELECT   TO_CHAR(day,'YYYY-MM-DD') AS day, ROUND(avg(price)) AS average_price FROM prices
    WHERE  day BETWEEN '${req.query.date_from}' AND '${req.query.date_to}'
    AND (orig_code='${req.query.origin}' OR (orig_code IN ( SELECT code FROM ports WHERE parent_slug = '${req.query.destination}'))) 
    AND (dest_code='${req.query.origin}' OR (dest_code IN ( SELECT code FROM ports WHERE parent_slug = '${req.query.destination}')))
    group by day
    order by day
    `;
    return next();
  },
  queryHandler
);

app.get(
  "/rates_null",
  validateQueryStrings(["date_from", "date_to", "origin", "destination"]),
  (req, res, next) => {
    req.sqlQuery = `
    SELECT TO_CHAR(day,'YYYY-MM-DD') AS day,
    (CASE WHEN COUNT(price) > 3 THEN ROUND(AVG(price)) END) AS average_price
    FROM prices
    WHERE  day BETWEEN '${req.query.date_from}' AND '${req.query.date_to}'
    AND (orig_code='${req.query.origin}' OR (orig_code IN ( SELECT code FROM ports WHERE parent_slug = '${req.query.destination}'))) 
    AND (dest_code='${req.query.origin}' OR (dest_code IN ( SELECT code FROM ports WHERE parent_slug = '${req.query.destination}')))
    group by day
    order by day
    `;
    return next();
  },
  queryHandler
);

app.post(
  "/post_price",
  validateParameters([
    "date_from",
    "date_to",
    "origin_code",
    "destination_code",
    "price",
  ]),
  checkCurrency(),
  (req, res, next) => {
    let numberOfDays = moment(`${req.body.date_to}`).diff(
      moment(`${req.body.date_from}`),
      "days"
    );
    req.sqlQuery = `
    DO
    $do$
    BEGIN 
       FOR i IN 1..${numberOfDays} LOOP
            INSERT INTO prices (orig_code, dest_code, day, price)
            VALUES ('${req.body.origin_code}' , 
            '${req.body.destination_code}', 
            '${moment(req.body.date_from).add(1, "days").format("YYYY-MM-DD")}',
             ${req.body.price});
       END LOOP;
    END
    $do$;
    `;
    return next();
  },
  queryHandler
);

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Running on localhost ${process.env.PORT || 5555}`);
  }
});

// last resorts
process.on("uncaughtException", (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  process.exit(1);
});
