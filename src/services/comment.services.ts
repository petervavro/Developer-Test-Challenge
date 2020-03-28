/* eslint-disable max-len */
import { CommentInterface, CommentInputDTOInterface } from '../interfaces/Comment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../models');

const { Comment } = db;

/**
 * Create service
 * @param commentInputDTO
 */
export const createService = async (commentInputDTO: CommentInputDTOInterface): Promise<{ id: string }> => {
  const record = await Comment.create({
    ...commentInputDTO,
  });

  if (!record) {
    throw new Error('Item cannot be created.');
  }

  return {
    id: record.id,
  };
};


/**
 * Find all service
 * @param commentInputDTO
 */
export const findAllService = async (commentInputDTO: CommentInputDTOInterface): Promise<Array<CommentInterface>> => {
  const records = await Comment.findAll({
    where: { ...commentInputDTO },
  });

  return records;
};

/**
 * Update service
 * @param commentInputDTO
 */
export const updateService = async (id: number, commentInputDTO: CommentInputDTOInterface): Promise<boolean> => {
  const record = await Comment.update({
    ...commentInputDTO,
  }, {
    where: {
      id,
    },
  });

  // https://sequelize.org/master/class/lib/model.js~Model.html#static-method-update
  return (record[0] === 1);
};

/**
 * Delete service
 * @param commentInputDTO
 */
export const deleteService = async (commentInputDTO: CommentInputDTOInterface): Promise<number> => {
  // Check if exists
  const items = await findAllService({
    ...commentInputDTO,
  });

  let results = [];

  // Item does not exist.
  if (items.length === 0) return items.length;

  for (let i = 0; i < items.length; i += 1) {
    results.push(items[i].destroy());
  }

  results = await Promise.all(results);

  return results.length;
};


export default {};
