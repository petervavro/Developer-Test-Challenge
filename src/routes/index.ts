import { Application } from 'express';
import auth from './auth.routes';

// Load routes
export default (app: Application) => {
  [
    auth,
  ].forEach((route: (app: Application) => void) => route(app));
};
