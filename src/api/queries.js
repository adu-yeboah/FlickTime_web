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

// For Infinite Scrolling
export const useInfiniteMovies = () => {
    return useInfiniteQuery({
        queryKey: ['movies', 'discover'],
        queryFn: async ({ pageParam = 1 }) => {
            const data = await fetchFromTMDB(`/discover/movie?page=${pageParam}`);
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

export const useInfiniteTv = () => {
    return useInfiniteQuery({
        queryKey: ['tv', 'discover'],
        queryFn: async ({ pageParam = 1 }) => {
            const data = await fetchFromTMDB(`/discover/tv?page=${pageParam}`);
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
        },
        enabled: !!id && !!type,
    });
};
