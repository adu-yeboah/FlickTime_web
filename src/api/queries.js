import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import apiDetails from './movieApi';

const fetchFromTMDB = async (endpoint) => {
    const separator = endpoint.includes('?') ? '&' : '?';
    const response = await fetch(`${apiDetails.base_url}${endpoint}${separator}api_key=${apiDetails.api_key}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: () => fetchFromTMDB('/movie/popular').then(data => data.results),
    });
};

export const useUpcomingMovies = () => {
    return useQuery({
        queryKey: ['movies', 'upcoming'],
        queryFn: () => fetchFromTMDB('/movie/upcoming').then(data => data.results),
    });
};

export const useTrendingTv = () => {
    return useQuery({
        queryKey: ['tv', 'trending'],
        queryFn: () => fetchFromTMDB('/trending/tv/day').then(data => data.results),
    });
};

export const useInfiniteMovies = (filters = {}) => {
    return useInfiniteQuery({
        queryKey: ['movies', 'discover', filters],
        queryFn: async ({ pageParam = 1 }) => {
            let url = `/discover/movie?page=${pageParam}`;
            if (filters.genre) url += `&with_genres=${filters.genre}`;
            if (filters.year) url += `&primary_release_year=${filters.year}`;
            if (filters.rating) url += `&vote_average.gte=${filters.rating}`;
            if (filters.sortBy) url += `&sort_by=${filters.sortBy}`;
            const data = await fetchFromTMDB(url);
            return data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });
};

export const useInfiniteTv = (filters = {}) => {
    return useInfiniteQuery({
        queryKey: ['tv', 'discover', filters],
        queryFn: async ({ pageParam = 1 }) => {
            let url = `/discover/tv?page=${pageParam}`;
            if (filters.genre) url += `&with_genres=${filters.genre}`;
            if (filters.year) url += `&first_air_date_year=${filters.year}`;
            if (filters.rating) url += `&vote_average.gte=${filters.rating}`;
            if (filters.sortBy) url += `&sort_by=${filters.sortBy}`;
            const data = await fetchFromTMDB(url);
            return data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });
};

export const useInfiniteSearch = (query, searchType) => {
    return useInfiniteQuery({
        queryKey: ['search', searchType, query],
        queryFn: async ({ pageParam = 1 }) => {
            if (!query) return { results: [], page: 1, total_pages: 1 };
            const endpoint = searchType === 'movie' ? '/search/movie' : '/search/tv';
            const data = await fetchFromTMDB(`${endpoint}?query=${query}&page=${pageParam}`);
            return data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
    });
};

export const useMovieDetails = (id, type) => {
    return useQuery({
        queryKey: ['details', type, id],
        queryFn: async () => {
            if (!id || !type) return null;
            const data = await fetchFromTMDB(`/${type}/${id}?append_to_response=credits,recommendations,videos,watch/providers`);
            return data;
    });
};

export const useRecommendations = (id, type) => {
    return useQuery({
        queryKey: ['recommendations', type, id],
        queryFn: async () => {
            if (!id || !type) return [];
            const data = await fetchFromTMDB(`/${type}/${id}/recommendations`);
            return data.results || [];
        },
        enabled: !!id && !!type,
    });
};
