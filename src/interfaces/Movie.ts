export interface MovieInterface {
  id?: number;
  results?: any;
  [index: number]: string;
}

export interface MovieInputDTOInterface {
  year?: string | number;
  page?: string | number;
}

export interface TheMovieDBDiscoverResponseResultItemInterface {
  id?: number;
}

export interface TheMovieDBDiscoverResponseInterface {
  page: number;
  total_results: number;
  total_pages: number;
  results: Array<TheMovieDBDiscoverResponseResultItemInterface>;
}
