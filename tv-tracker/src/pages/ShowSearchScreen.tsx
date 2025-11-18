import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, FlatList, Button, ActivityIndicator } from "react-native";
import { searchShows, Show } from "../services/tvmazeService";
import ShowListItem from "../components/ShowListItem";
import { ShowContext } from "../context/ShowContext";

export default function ShowSearchScreen({ navigation }: any) {
  const [query, setQuery] = useState<string>("Harley Quinn");
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);
    searchShows(query)
      .then(setShows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a show..."
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginBottom: 12, backgroundColor: "rgba(200, 200, 200, 0.3)" }}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={shows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
			      <>
            <ShowListItem item={item} nav={navigation} />
            </>
          )}
        />
      )}
    </View>
  );
}
