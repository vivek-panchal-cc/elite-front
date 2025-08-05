import { NextApiRequest, NextApiResponse } from "next";

const rateLimit = new Map();

export function rateLimiter(limit: number = 10, timeWindow: number = 60000) {
  return function (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
  ) {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const now = Date.now();
    const key = `${ip}`;

    const windowData = rateLimit.get(key) || {
      count: 0,
      startTime: now,
    };

    if (now - windowData.startTime > timeWindow) {
      windowData.count = 0;
      windowData.startTime = now;
    }

    windowData.count++;
    rateLimit.set(key, windowData);

    if (windowData.count > limit) {
      return res.status(429).json({
        error: "Too Many Requests",
        message: "Please try again later",
      });
    }

    next();
  };
}
