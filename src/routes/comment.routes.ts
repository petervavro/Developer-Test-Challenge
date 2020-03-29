import { Application, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import middleware from '../middlewares';
import { wrap } from '../helpers';

import controller from '../controllers/comment.controllers';

export default (app: Application) => {
  const router = Router();

  // Create
  router.post(
    '/',
    celebrate({
      body: Joi.object({
        movieId: Joi.number().integer().required(),
        body: Joi.string().required(),
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
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.number().integer().required(),
      }),
      body: Joi.object({
        body: Joi.string().required(),
      }),
    }),
    middleware.isAuth,
    wrap(middleware.attachCurrentUser),
    wrap(controller.update),
  );

  // Delete
  router.delete(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.number().integer().required(),
      }),
    }),
    middleware.isAuth,
    wrap(middleware.attachCurrentUser),
    wrap(controller.delete),
  );

  app.use('/api/comments', router);
};
