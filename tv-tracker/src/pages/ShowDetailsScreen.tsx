import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { getShowById, Show } from "../services/tvmazeService";
import { ShowContext } from "../context/ShowContext";

export default function ShowDetailsScreen() {

  const { selectedShow } = useContext(ShowContext);

  return (
    <View style={{ flex: 1, padding: 16, flexDirection: 'column', alignItems: 'center' }}>
      {selectedShow ? (
            <>
              <Text style={styles.header}>{selectedShow?.name}</Text>
              <Image
                source={{ uri: selectedShow?.image?.original }}
                style={{ width: 200, height: 300, marginBottom: 20 }}
              />
              <Text style={styles.summary}>{selectedShow?.summary ? selectedShow.summary.replace(/<[^>]+>/g, '') : 'No summary available.'}</Text>
            </>
          ) : (
            <Text>No Show Selected</Text>
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
