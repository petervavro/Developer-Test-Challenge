import { Application, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { wrap } from '../helpers';

import controller from '../controllers/movie.controllers';

export default (app: Application) => {
  const router = Router();

  // Read
  router.get(
    '/:year/:page?',
    celebrate({
      params: Joi.object({
        year: Joi.number().integer().min(2010).max(2019).required(),
        page: Joi.number().integer().default(1)
      })
    }),
    wrap(controller.read)
  );

  app.use('/api/movies', router);
};
