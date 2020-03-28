import { Application, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
// import middleware from '../middlewares';
import { wrap } from '../helpers';

import controller from '../controllers/auth.controllers';

export default (app: Application) => {
  const router = Router();

  // SignUp
  router.post(
    '/signup',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    wrap(controller.signUp),
  );

  // SignIn
  router.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    wrap(controller.signIn),
  );

  app.use('/api/auth', router);
};
