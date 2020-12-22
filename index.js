const express = require("express");
const bodyParser = require("body-parser");

const validateParameters = require("./validation/validateParameters");
const validateQueryStrings = require("./validation/validateQueryStrings");

const checkCurrency = require("./validation/currency");
const queryHandler = require("./db/index")

const app = express();
app.use(bodyParser.json());


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
    
    req.sqlQuery = `INSERT INTO prices (orig_code, dest_code, day, price)
                    SELECT '${req.body.origin_code}' ,'${req.body.destination_code}', numberOfDays, '${req.body.price}'
                    FROM generate_series('${req.body.date_from}'::date, '${req.body.date_to}','1 days') AS numberOfDays;`;
     

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
