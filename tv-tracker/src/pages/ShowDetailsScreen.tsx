import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { getShowById, Show } from "../services/tvmazeService";

export default function ShowDetailsScreen({ route }: {route: any}) {
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { showId } = route.params;


  useEffect(() => {
    setLoading(true);
    getShowById(showId)
      .then(setShow)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, flexDirection: 'column', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
            <>
              <Text style={styles.header}>{show?.name}</Text>
              <Image
                source={{ uri: show?.image?.original }}
                style={{ width: 200, height: 300, marginBottom: 20 }}
              />
              <Text style={styles.summary}>{show?.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available.'}</Text>
            </>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    summary: {
        fontSize: 16,
        maxWidth: 600,
    },
});
