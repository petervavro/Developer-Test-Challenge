import { Application } from 'express';
import auth from './auth.routes';
import comment from './comment.routes';

// Load routes
export default (app: Application) => {
  [
    auth,
    comment,
  ].forEach((route: (app: Application) => void) => route(app));
};
