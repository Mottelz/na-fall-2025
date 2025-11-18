import React, { createContext, ReactNode, useState } from 'react';
import { Show } from '../services/tvmazeService';

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

    return (
        <ShowContext.Provider value={{selectedShow, setSelectedShow, favourites, setFavourites}}>
            {children}
        </ShowContext.Provider>
    );
}