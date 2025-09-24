// src/screens/HistoryScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit History</Text>
      <Text>Later we’ll show completed habits here 📊</Text>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
