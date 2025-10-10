import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { Movie } from "../types/Movie";

export default function DetailsScreen({ route }: any) {
  const { movie }: { movie: Movie } = route.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFav = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text>Year: {movie.Year}</Text>
      <Button
        title={isFav ? "Remove from Favorites" : "Add to Favorites"}
        onPress={() => (isFav ? removeFavorite(movie.imdbID) : addFavorite(movie))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
  poster: { width: 200, height: 300, marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
