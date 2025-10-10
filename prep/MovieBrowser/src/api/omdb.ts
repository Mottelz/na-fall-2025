// src/api/omdb.ts
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.omdbApiKey;

export const fetchMovies = async (query: string) => {
  if (!query) return [];
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
};
