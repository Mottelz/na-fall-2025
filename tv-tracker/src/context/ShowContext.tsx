import React, { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Show from '../models/show';

interface ShowContextType {
    selectedShow: Show | null;
    setSelectedShow: (show: Show | null) => void;
    favourites: Show[];
    setFavourites: (shows: Show[]) => void;
}

export const ShowContext = createContext<ShowContextType>({
    selectedShow: null,
    setSelectedShow: () => {},
    favourites: [],
    setFavourites: () => {}
});

export const ShowProvider = ({ children }: {children: ReactNode}) => {
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);
    const [favourites, setFavourites] = useState<Show[]>([]);

    useEffect(() => {
        const loadFavourites = async () => {
            try {
                const storedFavourites = await AsyncStorage.getItem('tvtracker_favourites');
                if (storedFavourites) {
                    const parsed = JSON.parse(storedFavourites);
                    // Ensure parsed data is an array
                    if (Array.isArray(parsed)) {
                        setFavourites(parsed);
                    } else {
                        console.warn("Stored favourites is not an array, resetting to empty array");
                        setFavourites([]);
                    }
                }
            } catch (error) {
                console.error("Failed to load favourites from AsyncStorage:", error);
                // Reset to empty array if parsing fails
                setFavourites([]);
            }
        };
        loadFavourites();
    }, []);

    useEffect(() => {
        const saveFavourites = async () => {
            try {
                await AsyncStorage.setItem('tvtracker_favourites', JSON.stringify(favourites));
            } catch (error) {
                console.error("Failed to save favourites to AsyncStorage:", error);
            }
        };
        saveFavourites();
    }, [favourites]);

    return (
        <ShowContext.Provider value={{selectedShow, setSelectedShow, favourites, setFavourites}}>
            {children}
        </ShowContext.Provider>
    );
}