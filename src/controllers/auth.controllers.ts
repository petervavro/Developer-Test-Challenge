import { Request, Response } from 'express';
import { UserInputDTOInterface } from '../interfaces/User';

import {
  signUpService,
  signInService,
} from '../services/auth.services';

// SignUp
export const signUpController = async (req: Request, res: Response) => {
  const { user, token } = await signUpService(req.body as UserInputDTOInterface);

  return res.status(201).json({ user, token });
};

// SignIn
export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await signInService(email, password);

  return res.json({ user, token }).status(200);
};

export default {
  signUp: signUpController,
  signIn: signInController,
};
