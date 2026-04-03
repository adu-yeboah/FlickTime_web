import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('flicktime_history');
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('flicktime_history', JSON.stringify(history));
    }, [history]);

    const addToHistory = (item) => {
        setHistory(prevHistory => {
            // Remove the item if it already exists to prevent duplicates
            const filteredHistory = prevHistory.filter(m => m.id !== item.id);
            // Add to the beginning of the array
            const newHistory = [item, ...filteredHistory];
            // Keep only the last 15 items
            return newHistory.slice(0, 15);
        });
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

HistoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useHistory = () => useContext(HistoryContext);
