/* eslint-disable max-len */
import { RatingInterface, RatingInputDTOInterface } from '../interfaces/Rating';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../models');

const { Rating } = db;

/**
 * Create service
 * @param ratingInputDTO
 */
export const createService = async (
  ratingInputDTO: RatingInputDTOInterface
): Promise<{ id: string }> => {
  // There will be only one record like this
  const record = await Rating.findOrCreate({
    where: {
      movieId: ratingInputDTO.movieId,
      userId: ratingInputDTO.userId
    },
    defaults: {
      ...ratingInputDTO
    }
  });

  if (!record[1]) throw new Error('Item cannot be created.');

  return {
    id: record[0].id
  };
};

/**
 * Find all service
 * @param ratingInputDTO
 */
export const findAllService = async (
  ratingInputDTO: RatingInputDTOInterface
): Promise<Array<RatingInterface>> => {
  const records = await Rating.findAll({
    where: { ...ratingInputDTO }
  });

  return records;
};

/**
 * Update service
 * @param ratingInputDTO
 */
export const updateService = async (
  id: number,
  ratingInputDTO: RatingInputDTOInterface
): Promise<boolean> => {
  const record = await Rating.update(
    {
      ...ratingInputDTO
    },
    {
      where: {
        id
      }
    }
  );

  // https://sequelize.org/master/class/lib/model.js~Model.html#static-method-update
  return record[0] === 1;
};

/**
 * Delete service
 * @param ratingInputDTO
 */
export const deleteService = async (
  ratingInputDTO: RatingInputDTOInterface
): Promise<number> => {
  // Check if exists
  const items = await findAllService({
    ...ratingInputDTO
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
