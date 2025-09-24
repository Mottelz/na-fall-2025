// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	FlatList,
	StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
	const [habit, setHabit] = useState('');
	const [habits, setHabits] = useState([]);

	useEffect(() => {
		const loadHabits = async () => {
			try {
				const stored = await AsyncStorage.getItem('habits');
				if (stored) {
					setHabits(JSON.parse(stored));
				}
			} catch (e) {
				console.error('Failed to load habits', e);
			}
		};
		loadHabits();
	}, []);

	const saveHabits = async (newHabits) => {
		try {
			await AsyncStorage.setItem('habits', JSON.stringify(newHabits));
		} catch (e) {
			console.error('Failed to save habits', e);
		}
	};

	const addHabit = () => {
		if (habit.trim()) {
			const newHabits = [...habits, { id: Date.now().toString(), name: habit }];
			setHabits(newHabits);
			saveHabits(newHabits);
			setHabit('');
		}
	};

	// 👇 JSX rendering is clean and declarative
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
			<Button title="Go to History" onPress={() => navigation.navigate('History')} />

			<FlatList
				style={styles.list}
				data={habits}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Text style={styles.habit}>{item.name}</Text>
				)}
			/>
		</View>
	);
};

export default HomeScreen;

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
