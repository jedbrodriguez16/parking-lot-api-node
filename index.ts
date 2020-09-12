import "reflect-metadata";
import app from "./app";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";

import iocContainer from "./iocContainer";
import configureServices from "./services/ioc";
import configureRepositories from "./repositories/ioc";

configureServices(iocContainer);
configureRepositories(iocContainer);

// load controller
import "./controllers/ParkingLotController";

// start **************** RATE LIMITING *************

// // start **** uncomment / use this section this for more robust and accurate solution for rate limiting, but you need to install and run redis server
// // brew install redis
// // redis-server
// import applyLimiter from "./limiter";
// applyLimiter(app);
// // end ****

// start **** simple rate limit (might not be 100% accurate)
import * as rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 10000, // 10 seconds
  max: 10, // 10 requests
  message: "Too many requests. Please try again later...",
});
app.use(limiter);
// end ****

// end **************** RATE LIMITING *************

// @ts-ignore
app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
let server = new InversifyExpressServer(iocContainer, app);
server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
});

// error handling
server.setErrorConfig((app) => {
  // @ts-ignore
  app.use((err: any, req: any, res: any, next: any) =>
    res.status(400).json({ error: err.message })
  );
});

let serverInstance = server.build();
serverInstance.listen(8080);

console.log("Parking Lot API started on port 8080...");
