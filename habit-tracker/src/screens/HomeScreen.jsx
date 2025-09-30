// src/screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToday } from "../utils/date";

const HomeScreen = ({ navigation }) => {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [lastDate, setLastDate] = useState(getToday());

  useEffect(() => {
    const initData = async () => {
      try {
        const storedHabits = await AsyncStorage.getItem("habits");
        const storedDate = await AsyncStorage.getItem("lastDate");
        const storedHistory = await AsyncStorage.getItem("history");

        const today = getToday();
        let habitsData = storedHabits ? JSON.parse(storedHabits) : [];
        let historyData = storedHistory ? JSON.parse(storedHistory) : [];

        if (storedDate && storedDate !== today) {
          // Save yesterday’s completed habits
          const completed = habitsData.filter((h) => h.completed);
          if (completed.length > 0) {
            historyData.push({
              date: storedDate,
              completed: completed.map((h) => h.name),
            });
          }
          // Reset habits
          habitsData = habitsData.map((h) => ({ ...h, completed: false }));
        }

        setHabits(habitsData);
        setLastDate(today);

        await AsyncStorage.setItem("habits", JSON.stringify(habitsData));
        await AsyncStorage.setItem("lastDate", today);
        await AsyncStorage.setItem("history", JSON.stringify(historyData));
      } catch (e) {
        console.error("Init failed", e);
      }
    };
    initData();
  }, []);

  const saveHabits = async (newHabits) => {
    setHabits(newHabits);
    await AsyncStorage.setItem("habits", JSON.stringify(newHabits));
  };

  const addHabit = () => {
    if (habit.trim()) {
      const newHabits = [
        ...habits,
        { id: Date.now().toString(), name: habit, completed: false },
      ];
      saveHabits(newHabits);
      setHabit("");
    }
  };

  const toggleHabit = (id) => {
    const newHabits = habits.map((h) =>
      h.id === id ? { ...h, completed: !h.completed } : h
    );
    saveHabits(newHabits);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Habits</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a habit..."
        value={habit}
        onChangeText={setHabit}
      />

      <Button title="Add Habit" onPress={addHabit} />
      <Button
        title="Go to History"
        onPress={() => navigation.navigate("History")}
      />

      <FlatList
        style={styles.list}
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitRow}>
            <Checkbox
              value={item.completed}
              onValueChange={() => toggleHabit(item.id)}
              style={styles.checkbox}
            />
            <Text
              style={[styles.habit, item.completed && styles.completedHabit]}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  list: { marginTop: 10 },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  checkbox: { marginRight: 10 },
  habit: { fontSize: 18 },
  completedHabit: { textDecorationLine: "line-through", color: "gray" },
});
