import { createContext } from "react";
import React, { useEffect, useState } from 'react'
import apiDetails from "../api/movieAPi";


export const ApiContext = createContext({})

export const ApiContextProvider = ({ children }) => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);


    const getPopular = () => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiDetails.api_key}`)
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
        console.log(popularMovies)
    }

    const getmovies = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiDetails.api_key}`)
        .then(res => res.json())
        .then(data => setMovies(data.results))
    } 

    const getTv = () => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiDetails.api_key}`)
        .then(res => res.json())
        .then(data => setTv(data.results))
    }

    const getUpcoming = () => {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiDetails.api_key}`)
        .then(res => res.json())
        .then(data => setUpcomingMovies(data.results))
    }

    useEffect(() => {
        getPopular()
        getmovies()
        getTv()
        getUpcoming()
    }, [])



    const values ={
        popularMovies,
        upcomingMovies,
        movies,
        tv,
    }

    return (
        <ApiContext.Provider value={values}>
            {children}
        </ApiContext.Provider>
    )
}