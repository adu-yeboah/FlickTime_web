import { createContext, useEffect, useState } from 'react';
import apiDetails from "../api/movieApi";

export const ApiContext = createContext({});

export const ApiContextProvider = ({ children }) => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);

    // Loading & Error States
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination States
    const [moviePage, setMoviePage] = useState(1);
    const [tvPage, setTvPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchData = async (endpoint, setter) => {
        try {
            const response = await fetch(`${apiDetails.base_url}${endpoint}&api_key=${apiDetails.api_key}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setter(data.results);
        } catch (err) {
            console.error(`Error fetching ${endpoint}:`, err);
            setError(err.message);
        }
    };

    const fetchMoreData = async (endpoint, page, currentData, setter, pageSetter) => {
        if (isLoadingMore) return;
        setIsLoadingMore(true);
        try {
            const nextPage = page + 1;
            const response = await fetch(`${apiDetails.base_url}${endpoint}&page=${nextPage}&api_key=${apiDetails.api_key}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setter([...currentData, ...data.results]);
            pageSetter(nextPage);
        } catch (err) {
            console.error(`Error fetching more ${endpoint}:`, err);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const loadMoreMovies = () => fetchMoreData('/discover/movie?', moviePage, movies, setMovies, setMoviePage);
    const loadMoreTv = () => fetchMoreData('/discover/tv?', tvPage, tv, setTv, setTvPage);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([
                fetchData('/movie/popular?', setPopularMovies),
                fetchData('/discover/movie?', setMovies),
                fetchData('/discover/tv?', setTv),
                fetchData('/movie/upcoming?', setUpcomingMovies)
            ]);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const values = {
        popularMovies,
        upcomingMovies,
        movies,
        tv,
        isLoading,
        error,
        apiDetails,
        loadMoreMovies,
        loadMoreTv,
        isLoadingMore
    };

    return (
        <ApiContext.Provider value={values}>
            {children}
        </ApiContext.Provider>
    );
};