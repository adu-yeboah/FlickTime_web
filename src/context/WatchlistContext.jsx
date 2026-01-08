import React, { createContext, useState, useEffect, useContext } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('flicktime_watchlist');
        if (stored) {
            setWatchlist(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('flicktime_watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        if (!watchlist.some(m => m.id === movie.id)) {
            setWatchlist([...watchlist, movie]);
        }
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist(watchlist.filter(m => m.id !== movieId));
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some(m => m.id === movieId);
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);
