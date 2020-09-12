import * as redis from "redis";
import * as expressLimiter from "express-limiter";
import * as express from "express";

export default function applyLimiter(app: express.Application) {
  const limiter = expressLimiter(app, redis.createClient());
  limiter({
    path: "*",
    method: "all",
    lookup: ["connection.remoteAddress"],
    // 10 requests for 10 seconds
    total: 10,
    expire: 10000,
    // @ts-ignore
    onRateLimited: function (req, res, next) {
      res
        .status(429)
        .json({ error: "Too many requests. Please try again later..." });
    },
  });
}
