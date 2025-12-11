import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowSearchScreen from '../pages/ShowSearchScreen';
import ShowDetailsScreen from '../pages/ShowDetailsScreen';
import { ShowProvider } from '../context/ShowContext';
import FavouritesScreen from '../pages/FavouritesScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <ShowProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Search" component={ShowSearchScreen} />
                    <Stack.Screen name="Show" component={ShowDetailsScreen} />
                    <Stack.Screen name="Favourites" component={FavouritesScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ShowProvider>
    );
};

export default AppNavigator;