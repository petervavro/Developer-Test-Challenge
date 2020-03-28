import { Application } from 'express';
import auth from './auth.routes';
import comment from './comment.routes';
import rating from './rating.routes';

// Load routes
export default (app: Application) => {
  [
    auth,
    comment,
    rating,
  ].forEach((route: (app: Application) => void) => route(app));
};
