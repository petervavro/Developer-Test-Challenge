/* eslint-disable max-len */
import axios from 'axios';
import { MovieInterface, MovieInputDTOInterface, TheMovieDBDiscoverResponseInterface } from '../interfaces/Movie';
import config from '../config';

/**
 * Find all service
 * @param movieInputDTO
 */
export const findAllService = async (movieInputDTO: MovieInputDTOInterface): Promise<TheMovieDBDiscoverResponseInterface> => {
  // URL to resource
  const url = `${config.themoviedb.url}/discover/movie?api_key=${config.themoviedb.apiKey}&primary_release_year=${movieInputDTO.year}&page=${movieInputDTO.page}`;

  // Request from resource
  const response = await axios.get(url);

  return response.data;
};

export default {};
