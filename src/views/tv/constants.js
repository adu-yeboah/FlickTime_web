import { FiTrendingUp, FiAward, FiRadio, FiZap } from 'react-icons/fi';

export const GENRES = [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' }
];

export const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'first_air_date.desc', label: 'Newest First' },
    { value: 'first_air_date.asc', label: 'Oldest First' }
];

export const QUICK_PRESETS = [
    { id: 'popular', label: 'Popular', icon: FiTrendingUp, filters: { genre: '', year: '', rating: '', sortBy: 'popularity.desc' } },
    { id: 'top_rated', label: 'Top Rated', icon: FiAward, filters: { genre: '', year: '', rating: '7', sortBy: 'vote_average.desc' } },
    { id: 'airing', label: 'Airing Now', icon: FiRadio, filters: { genre: '', year: new Date().getFullYear().toString(), rating: '', sortBy: 'popularity.desc' } },
    { id: 'binge', label: 'Binge-Worthy', icon: FiZap, filters: { genre: '18', year: '', rating: '8', sortBy: 'vote_average.desc' } },
];
