const { currencyList } = require("./currencyList");
const getRates = require("./currencyConvert");

module.exports = function currency() {
  return (req, res, next) => {
    if (!req.body.currency || req.body.currency == "USD") next();
    else if (!currencyList.hasOwnProperty(req.body.currency)) {
      return res.status(400).send(`Invalid currency code`);
    } else {
      async function convert() {
        let tempCur = req.body.currency;
        let tempPrice = req.body.price;

        const jsonData = await getRates();
        let rate = jsonData.rates[tempCur];

        tempPrice = parseInt(tempPrice);
        tempPrice =   tempPrice / rate;
        Math.floor(tempPrice);

        tempPrice = String(tempPrice);

        req.body.price = tempPrice;

        // console.log(rate);
        next();
      }
      convert();
      //next();
    }
  };
};
