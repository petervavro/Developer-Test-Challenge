export interface RatingInterface {
  destroy();
  id: number;
  movieId: number;
  userId: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RatingInputDTOInterface {
  id?: string | number;
  userId?: number;
  movieId?: Array<number> | number;
  rating?: number;
}
