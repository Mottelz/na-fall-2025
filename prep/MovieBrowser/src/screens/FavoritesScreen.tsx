import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function FavoritesScreen({ navigation }: any) {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate("Details", { movie: item })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});
