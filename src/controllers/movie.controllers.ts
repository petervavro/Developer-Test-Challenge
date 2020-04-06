import { Request, Response } from 'express';

import { findAllService } from '../services/movie.services';

import { findAllService as findAllRatingsService } from '../services/rating.services';

// Read
export const readController = async (req: Request, res: Response) => {
  // Get movies from API
  const result = await findAllService({
    ...req.params
  });

  let ratings = [];

  // Get ratings
  if (Array.isArray(result.results)) {
    // Get ids of all movies
    // TODO :: Check if prop exists.
    const moviesIds = result.results.map((movie) => movie.id);

    // Get ratings for these movies
    ratings = await findAllRatingsService({
      movieId: moviesIds
    });
  }

  // Merge is intentionally performed in front-end to save server resources.
  return res.json({ movies: result, ratings });
};

export default {
  read: readController
};
