import { Request, Response } from 'express';
import { RatingInputDTOInterface } from '../interfaces/Rating';

import {
  createService,
  findAllService,
  updateService,
  deleteService,
} from '../services/rating.services';


// Create
export const createController = async (req: Request, res: Response) => {
  const { id } = await createService({
    ...req.body,
    userId: req.currentUser.id,
  } as RatingInputDTOInterface);

  return res.status(201).json({ id });
};

// Read
export const readController = async (req: Request, res: Response) => {
  const items = await findAllService({
    ...req.params,
    userId: req.currentUser.id,
  });

  return res.json({ items });
};

// Update
export const updateController = async (req: Request, res: Response) => {
  // Check if exists
  const items = await findAllService({
    movieId: req.params.movieId,
    userId: req.currentUser.id,
  });

  if (items.length === 0) return res.status(404).json({});

  // Proceed to update
  const result = await updateService(
    items[0].id,
    {
      ...req.body,
    } as RatingInputDTOInterface,
  );

  return res.json({ success: result });
};

// Delete
export const deleteController = async (req: Request, res: Response) => {
  const result = await deleteService({
    movieId: req.params.movieId,
    userId: req.currentUser.id,
  });

  return res.json({
    success: true,
    payload: {
      deleted: result,
    },
  });
};

export default {
  create: createController,
  read: readController,
  update: updateController,
  delete: deleteController,
};
