# Xeneta's Rate API task | Express JS | Postgress SQL | Javascript | Currency convert
> A project demonstrating Xeneta's Rate API tasks

> Click :star:if you like it. Check me [@Bidyashish](https://www.bidyashish.com).

> Checkout demo at https://xeneta-bidyashish.herokuapp.com/


---

### Getting Started 

First Clone the project
```bash
git clone https://github.com/bidyashish/Xeneta.git
```

Checkout to master branch 
```bash
git checkout master
```
create and populate the `.env` using `.env.example` file

Add Database credentials and `opencurrency` API key values
```
PGHOST=localhost
PGDATABASE=xeneta	 
PGUSER=ashish	 
PGPASSWORD=yournewpass
PGPORT=5432
```

Require NODE 10.X + version | check node is installed or get latest NODE at https://nodejs.org/en/download/
```bash
node -v && npm -v
```

To run Application in development mode
```bash
npm run dev
```

To run Application in production mode
```bash
npm start
```

Application will be listening on 
```
localhost:5555
```

---
### GET Request Task
#### Part 1
> Task | API endpoint that returns a list with the average prices for each day on a route between Port Codes origin and destination.
> solution | Query SQL based on given valid input

Return : JSON object

```
curl "https://xeneta-bidyashish.herokuapp.com/rates?date_from=2016-01-01&date_to=2016-01-10&origin=CNSGH&destination=north_europe_main"

```

![alt text](https://github.com/bidyashish/Xeneta/blob/currency-convert/screenshots/1.png?raw=true)

#### Part 2
> Task | API endpoint that returns a list with the average prices for each day on a route between Port Codes origin and destination.
> solution | Query SQL based on given valid input

Return : JSON object

```
curl "https://xeneta-bidyashish.herokuapp.com/rates_null?date_from=2016-01-01&date_to=2016-01-10&origin=CNSGH&destination=north_europe_main"

```


![alt text](https://github.com/bidyashish/Xeneta/blob/currency-convert/screenshots/2.png?raw=true)

### POST Request Task

#### Part 1
> API endpoint to upload a price, including the following required parameters:

* date_from
* date_to
* origin_code,
* destination_code
* price (default USD currency)

> solution 
Update data in price table of the database, parsing  date range 
case 1. upload only 1 day | keep date range date_from  and date_to same
case 2  Date ranging from certain date_from to date_to. Date is inserted in incremental way taking base date as date_from  till date_to.

```
 curl --header "Content-Type: application/json" \
      --request POST \
      --data '{"date_from":"2016-10-01","date_to":"2016-11-02","origin_code": "CNSGH","destination_code":"CNSGH","price":"99443"}' \
      https://xeneta-bidyashish.herokuapp.com/post_price

```

![alt text](https://github.com/bidyashish/Xeneta/blob/currency-convert/screenshots/3.png?raw=true)

#### Part 2
> Extend the upload API to Support Currency format and Automatic rates conversion:

* date_from
* date_to
* origin_code,
* destination_code
* price (default USD currency)
* currency (optional)

> solution used to implemeted this feature

1. If no currency parameter is provided, default currency is USD
2. Parse the valid currency code to get comparable rates to USD 
3. Update the price based in the current rate.
4. Perform the save data operation in Prices table in PostGress

###### Rates conversion
Rates conversion is happening in Real time using openexchange rates https://openexchangerates.org/ 

```
const url = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_KEY}`;
```






List of Currency Supported [@Currency List](https://github.com/bidyashish/Xeneta/blob/master/currencyConvert/currencyList.js).


```
 curl --header "Content-Type: application/json" \
      --request POST \
      --data '{"date_from":"2016-10-01","date_to":"2016-11-02","origin_code": "CNSGH","destination_code":"CNSGH","price":"99443" "currency":"AED"}' \
      http://localhost:5555/post_price

```


![alt text](https://github.com/bidyashish/Xeneta/blob/currency-convert/screenshots/4.png?raw=true)



---
Bidyashish Kumar [@Bidyashish](https://www.bidyashish.com).

LinkedIn profile: [@Bidyashish](https://www.linkedin.com/in/bidyashish/).