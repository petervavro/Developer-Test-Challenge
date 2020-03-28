export interface CommentInterface {
  destroy();
  id: number;
  body: string;
  movieId: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentInputDTOInterface {
  id?: string | number;
  userId?: number;
  movieId?: string;
  body?: string;
}
