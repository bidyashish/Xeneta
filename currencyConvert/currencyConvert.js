const { currencyList } = require("./currencyList");
const axios = require("axios");
require("dotenv").config();

const url = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_KEY}`;

module.exports = async function getRatesFunc() {
  const response = await axios.get(url);
  const data = response.data;
  return data;
};
