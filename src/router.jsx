import { createBrowserRouter } from "react-router-dom";
import Movies from "./views/movie/Movies";
import MovieDetails from "./views/movieDetails/MovieDetails";
import Search from "./views/search/Search";
import Tv from "./views/tv/Tv";
import Index from "./views/home/Index";

import Watchlist from "./views/watchlist/Watchlist";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />
    },
    {
        path: '/movies',
        element: <Movies />
    },
    {
        path: '/tv',
        element: <Tv />
    },
    {
        path: '/movie_details',
        element: <MovieDetails />
    },
    {
        path: '/search',
        element: <Search />
    },
    {
        path: '/watchlist',
        element: <Watchlist />
    },
]);

export default router