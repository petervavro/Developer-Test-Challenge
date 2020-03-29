export interface CommentInterface {
  destroy();
  id: number;
  body: string;
  movieId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentInputDTOInterface {
  id?: string | number;
  userId?: number;
  movieId?: number;
  body?: string;
}
