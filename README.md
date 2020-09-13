# parking-lot-api-node

Parking Lot Web API

## Running the App

- Install dependencies

```
npm install
```

- Optionally update Parking Lot Size in .env file, default size is 10

```
PARKING_LOT_SIZE=10
```

- Start the server (http://localhost:8080)

```
npm start
```

### Endpoints

- Park a car

```
Request:

POST http://localhost:8080/api/car/park

{
    "registrationNumber": "1"
}

Response:

HTTP 200 OK
{
    "slotNumber": "1"
}
```

- Unpark a car / free a slot

```
Request:

POST http://localhost:8080/api/car/unpark

{
    "slotNumber": "4"
}

Response:

HTTP 204 Content
```

- Get Slot and Car information where query param 'number' is either car or slot number

```
Request:

GET http://localhost:8080/api/slot/info?number=1

Response:

HTTP 200 OK
{
    "slotNumber": "1",
    "carNumber": "1"
}
```

## Testing the API

- You can make use of the postman collection located below

```
postman/nas-parking-lot.postman_collection.json
```

## Unit Test

```
npm test
```

###### You can view the coverage report at /test/coverage/lcov-report/index.html

## Rate Limiting

##### For more accurate and robust solution, you can opt to uncomment the redis implementation as per the code snippet below. Although you will need to install and start a local redis server

index.ts

```

// start **************** RATE LIMITING *************

// // start **** uncomment / use this section this for more robust and accurate solution for rate limiting, but you need to install and run redis server
// // brew install redis
// // redis-server
// import applyLimiter from "./limiter";
// applyLimiter(app);
// // end ****

// start **** simple rate limit (might not be 100% accurate), comment this section if you uncomment the redis implementation right above
import * as rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 10000, // 10 seconds
  max: 10, // 10 requests
  message: "Too many requests. Please try again later...",
});
app.use(limiter);
// end ****

// end **************** RATE LIMITING *************
```

### Prettify

```
npm run format
```

### Linting

```
npm run lint
```
