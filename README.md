# Xeneta's Rate API task | Express JS | Postgress SQL | Javascript | Currency convert
> A project demonstrating Xeneta's Rate API tasks

> Click :star:if you like it. Check me [@Bidyashish](https://www.bidyashish.com).


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
curl "http://localhost:5555/rates?date_from=2016-01-01&date_to=2016-01-10&origin=CNSGH&destination=north_europe_main"

```

![alt text](https://github.com/bidyashish/Xeneta/blob/currency-convert/screenshots/1.png?raw=true)

#### Part 2
> Task | API endpoint that returns a list with the average prices for each day on a route between Port Codes origin and destination.
> solution | Query SQL based on given valid input

Return : JSON object

```
curl "http://localhost:5555/rates_null?date_from=2016-01-01&date_to=2016-01-10&origin=CNSGH&destination=north_europe_main"

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
      http://localhost:5555/post_price

```


![alt text](https://github.com/bidyashish/Xeneta/blob/currency-convert/screenshots/2.png?raw=true)



---
Bidyashish Kumar [@Bidyashish](https://www.bidyashish.com).

LinkedIn profile: [@Bidyashish](https://www.linkedin.com/in/bidyashish/).