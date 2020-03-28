export interface RatingInterface {
  destroy();
  id: number;
  movieId: string;
  userId: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RatingInputDTOInterface {
  id?: string | number;
  userId?: number;
  movieId?: string;
  rating?: number;
}
