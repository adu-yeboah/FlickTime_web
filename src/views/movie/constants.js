import { FiTrendingUp, FiAward, FiPlayCircle, FiClock } from 'react-icons/fi';

export const GENRES = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
];

export const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'primary_release_date.desc', label: 'Newest First' },
    { value: 'primary_release_date.asc', label: 'Oldest First' },
    { value: 'revenue.desc', label: 'Highest Revenue' }
];

export const QUICK_PRESETS = [
    { id: 'popular', label: 'Popular', icon: FiTrendingUp, filters: { genre: '', year: '', rating: '', sortBy: 'popularity.desc' } },
    { id: 'top_rated', label: 'Top Rated', icon: FiAward, filters: { genre: '', year: '', rating: '7', sortBy: 'vote_average.desc' } },
    { id: 'newest', label: 'New Releases', icon: FiPlayCircle, filters: { genre: '', year: new Date().getFullYear().toString(), rating: '', sortBy: 'popularity.desc' } },
    { id: 'upcoming', label: 'Upcoming', icon: FiClock, filters: { genre: '', year: '', rating: '', sortBy: 'primary_release_date.desc' } },
];
