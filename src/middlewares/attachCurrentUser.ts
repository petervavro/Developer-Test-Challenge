/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import { wrap } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../models');

const { User } = db;

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  if (
    !(
      typeof req.token !== 'undefined' && req.token !== undefined
        && typeof req.token.id !== 'undefined' && req.token.id !== undefined
    )
  ) return res.sendStatus(401);

  // Get user
  const userRecord = await User.findOne({ id: req.token.id });

  if (!userRecord) return res.sendStatus(401);

  req.currentUser = {
    ...userRecord.dataValues,
  };

  return next();
};

export default wrap(attachCurrentUser);
