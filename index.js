const express = require("express");
const bodyParser = require("body-parser");
const validateParameters = require("./validation/validateParameters");
const validateQueryStrings = require("./validation/validateQueryStrings");
const checkCurrency = require("./currencyConvert/index");
const queryHandler = require("./db/index");

require("dotenv").config();
const app = express();

// Configuring body parser middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    `Welcome to Xeneta API test by Bidyashish Kumar more info at <a href="http://bidyashish.com" target="_blank"> bidyashish.com </a> </br>😎
     Documentation at <a href="https://github.com/bidyashish/Xeneta" target="_blank">https://github.com/bidyashish/Xeneta</a>
    `
  );
});

/* 
   Method GET /rates
   Required : Query string "date_from", "date_to", "origin", "destination"
   Return : JSON object containing Average rates as per input Query String
*/
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

/* 
   Method GET /rates_null
   Required : Query string "date_from", "date_to", "origin", "destination"
   Return : JSON object containing Average rates greater than 3 days as per input Query String
*/
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

/* 
   Method : POST /post_price
   Required : Parameters "date_from", "date_to", "origin", "destination" | Optional "currency"
   Return : JSON object containing Average rates greater than 3 days as per input Query String
*/

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
                    SELECT '${req.body.origin_code}' ,'${req.body.destination_code}', numberOfDays, '${req.body.price}'::numeric::integer
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

process.on("uncaughtException", (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  process.exit(1);
});
