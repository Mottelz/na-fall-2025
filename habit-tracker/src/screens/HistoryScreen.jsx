// src/screens/HistoryScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem("history");
        if (stored) setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit History</Text>

      {history.length === 0 ? (
        <Text>No history yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.date}>{item.date}</Text>
              {item.completed.map((habit, i) => (
                <Text key={i} style={styles.habit}>
                  • {habit}
                </Text>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  historyItem: { marginBottom: 16 },
  date: { fontSize: 18, fontWeight: "bold" },
  habit: { fontSize: 16, marginLeft: 10 },
});
