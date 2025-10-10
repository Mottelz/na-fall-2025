import React, { createContext, useState, useContext, ReactNode } from "react";
import { Movie } from "../types/Movie";

type FavoritesContextType = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const addFavorite = (movie: Movie) =>
    setFavorites((prev) =>
      prev.find((m) => m.imdbID === movie.imdbID) ? prev : [...prev, movie]
    );

  const removeFavorite = (id: string) =>
    setFavorites((prev) => prev.filter((m) => m.imdbID !== id));

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
