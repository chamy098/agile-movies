import axios, { AxiosError } from 'axios';
import { GenreResponse, MovieResponse } from 'src/datamodel/models';
import { Notify } from 'quasar';

const API_KEY = 'f37cab0dd05e6569184d4180a2281fce';

const getMovieList = async (page: number): Promise<MovieResponse> => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: page,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    Notify.create({ type: 'negative', message: axiosError.message });
    throw error;
  }
};

const filterMoviesByGenre = async (
  genres: string,
  page: number
): Promise<MovieResponse> => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
      api_key: API_KEY,
      with_genres: genres,
      language: 'en-US',
      page: page,
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    Notify.create({ type: 'negative', message: axiosError.message });
    throw error;
  }
};

const getGenreList = async (): Promise<GenreResponse> => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list',
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    Notify.create({ type: 'negative', message: axiosError.message });
    throw error;
  }
};

export const MovieApi = {
  getMovieList,
  filterMoviesByGenre,
};

export const GenreApi = {
  getGenreList,
};
