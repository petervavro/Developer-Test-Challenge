import { Request, Response } from 'express';
import { CommentInputDTOInterface } from '../interfaces/Comment';

import {
  createService,
  findAllService,
  updateService,
  deleteService
} from '../services/comment.services';

// Create
export const createController = async (req: Request, res: Response) => {
  const { id } = await createService({
    ...req.body,
    userId: req.currentUser.id
  } as CommentInputDTOInterface);

  return res.status(201).json({ id });
};

// Read
export const readController = async (req: Request, res: Response) => {
  const items = await findAllService(req.params);

  return res.json({ items });
};

// Update
export const updateController = async (req: Request, res: Response) => {
  // Check if exists
  const items = await findAllService({
    id: req.params.id,
    userId: req.currentUser.id // User must be author
  });

  if (items.length === 0) return res.status(404).json({});

  // Proceed to update
  const result = await updateService(parseInt(req.params.id, 10), {
    ...req.body
  } as CommentInputDTOInterface);

  return res.json({ success: result });
};

// Delete
export const deleteController = async (req: Request, res: Response) => {
  const result = await deleteService({
    id: parseInt(req.params.id, 10),
    userId: req.currentUser.id
  });

  return res.json({
    success: true,
    payload: {
      deleted: result
    }
  });
};

export default {
  create: createController,
  read: readController,
  update: updateController,
  delete: deleteController
};
