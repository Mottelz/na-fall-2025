import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  title="Favs"
                  onPress={() => navigation.navigate("Favorites")}
                />
              ),
            })}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
