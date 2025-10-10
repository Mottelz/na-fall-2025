import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, StyleSheet } from "react-native";
import { fetchMovies } from "../api/omdb";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard";

export default function HomeScreen({ navigation }: any) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const load = async () => setMovies(await fetchMovies(query));
    load();
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate("Details", { movie: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
});
