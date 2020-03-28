/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import config from './config';
import routes from './routes';

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(methodOverride());

// CORS
app.use(cors({
  origin: '*',
}));

// Default route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome.' });
});

// Get routes
routes(app);

// Error handling
// https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // If Unauthorized
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      success: false,
    });
  }

  return res.status(500).send({
    error: {
      code: 500,
      message: err.message,
    },
  });
});

(async () => {
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${config.port}.`);
    // eslint-disable-next-line no-console
    console.log('The environment:', process.env.NODE_ENV);
  });
})();
