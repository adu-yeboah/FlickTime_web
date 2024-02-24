import {createBrowserRouter} from "react-router-dom";
import Index from "./views/home";
import Movies from "./views/movie/movies";
import MovieDetails from "./views/movieDetails/movieDetails";
import Search from "./views/search/Search";
import Tv from "./views/tv/Tv";

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
]);

export default router