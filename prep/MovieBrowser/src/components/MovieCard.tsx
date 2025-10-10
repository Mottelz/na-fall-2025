import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Movie } from "../types/Movie";

export default function MovieCard({
  movie,
  onPress,
}: {
  movie: Movie;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text>{movie.Year}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
  poster: { width: 60, height: 90, marginRight: 10, borderRadius: 6 },
  title: { fontWeight: "bold", fontSize: 16 },
});
