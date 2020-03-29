import { Application } from 'express';
import auth from './auth.routes';
import comment from './comment.routes';
import rating from './rating.routes';
import movie from './movie.routes';

// Load routes
export default (app: Application) => {
  [
    auth,
    comment,
    rating,
    movie,
  ].forEach((route: (app: Application) => void) => route(app));
};
