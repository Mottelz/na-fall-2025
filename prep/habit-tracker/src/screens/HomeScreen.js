// src/screens/HomeScreen.js
import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
	const [habit, setHabit] = useState('');
	const [habits, setHabits] = useState([]);

	const addHabit = () => {
		if (habit.trim().length > 0) {
			setHabits([...habits, { id: Date.now().toString(), name: habit }]);
			setHabit(''); // clear input
		}
	}

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

			<FlatList
				style={styles.list}
				data={habits}
				renderItem={({ item }) => {
					<Text style={styles.habit}>{item.name}</Text>
				}}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, marginTop: 40 },
	title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
	},
	list: { marginTop: 10 },
	habit: { fontSize: 18, paddingVertical: 6 },
});
