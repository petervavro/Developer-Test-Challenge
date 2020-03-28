import { Application } from 'express';

// Load routes
export default (app: Application) => {
  [].forEach((route: (app: Application) => void) => route(app));
};
