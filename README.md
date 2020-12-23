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
#### Part 1
> Task | API endpoint that returns a list with the average prices for each day on a route between Port Codes origin and destination.
> solution | Query SQL based on given valid input

Return : JSON object

```
curl "http://localhost:5555/rates?date_from=2016-01-01&date_to=2016-01-10&origin=CNSGH&destination=north_europe_main"

```

check [Image 1](/screeshots/1.png).

![alt text](https://github.com/bidyashish/bidyashish/Xeneta/blob/master/screenshots/1.png?raw=true)

#### Part 2
> Task | API endpoint that returns a list with the average prices for each day on a route between Port Codes origin and destination.
> solution | Query SQL based on given valid input

Return : JSON object

```
curl "http://localhost:5555/rates_null?date_from=2016-01-01&date_to=2016-01-10&origin=CNSGH&destination=north_europe_main"

```

check [Image 1](/screeshots/2.png).

![alt text](https://github.com/bidyashish/bidyashish/Xeneta/blob/master/screenshots/2.png?raw=true)

check [Back End](/backEnd).
```
cd backEnd

npm run dev

```
Demo at: https://sheltered-mesa-51060.herokuapp.com
---
**[⬆ Back to Top](#Getting-Started)**
---

> A React application utilizing React Bootsrap, React Highcharts, React Hooks and API for show Vizualization
check [Front End](/frontEnd).
```
cd frontEnd

npm start

```
Demo at: https://jolly-yalow-18c1a4.netlify.app
---

### Screenshots

check [Image 1](/screeshots/im1.png).

![alt text](https://github.com/bidyashish/EQworks_Test/blob/master/screeshots/im1.png?raw=true)

check [Image 2](/screeshots/img2.png).

![alt text](https://github.com/bidyashish/EQworks_Test/blob/master/screeshots/img2.png?raw=true)


---
Bidyashish Kumar [@Bidyashish](https://www.bidyashish.com).

LinkedIn profile: [@Bidyashish](https://www.linkedin.com/in/bidyashish/).