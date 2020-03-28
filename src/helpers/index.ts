/* tslint:disable */

import {
  Request, Response, NextFunction, RequestHandler,
} from 'express';

// Use promises : https://expressjs.com/en/advanced/best-practice-performance.html
// eslint-disable-next-line max-len
export const wrap = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);

// eslint-disable-next-line max-len
// export const wrap = (fn: RequestHandler) => (...arg) => fn(...arg).catch(arg[2]);

export default {
  wrap,
};
