import { Application, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import middleware from '../middlewares';
import { wrap } from '../helpers';

import controller from '../controllers/rating.controllers';

export default (app: Application) => {
  const router = Router();

  // Create
  router.post(
    '/',
    celebrate({
      body: Joi.object({
        movieId: Joi.number().integer().required(),
        rating: Joi.number().integer().min(1).max(5)
          .required(),
      }),
    }),
    middleware.isAuth,
    wrap(middleware.attachCurrentUser),
    wrap(controller.create),
  );

  // Read
  router.get(
    '/:movieId',
    celebrate({
      params: Joi.object({
        movieId: Joi.number().integer().required(),
      }),
    }),
    middleware.isAuth,
    wrap(middleware.attachCurrentUser),
    wrap(controller.read),
  );

  // Update
  router.put(
    '/:movieId',
    celebrate({
      params: Joi.object({
        movieId: Joi.number().integer().required(),
      }),
      body: Joi.object({
        rating: Joi.number().integer().min(1).max(5)
          .required(),
      }),
    }),
    middleware.isAuth,
    wrap(middleware.attachCurrentUser),
    wrap(controller.update),
  );

  // Delete
  router.delete(
    '/:movieId',
    celebrate({
      params: Joi.object({
        movieId: Joi.number().integer().required(),
      }),
    }),
    middleware.isAuth,
    wrap(middleware.attachCurrentUser),
    wrap(controller.delete),
  );

  app.use('/api/ratings', router);
};
