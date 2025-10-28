import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ShowSearchScreen from './src/pages/ShowSearchScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ShowSearchScreen />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
});
