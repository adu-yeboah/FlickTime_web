import { useEffect, useRef, useState, useMemo } from 'react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import { useInfiniteMovies } from '../../api/queries'
import {
    FiFilter, FiX, FiStar, FiCalendar, FiList,
    FiGrid, FiChevronDown, FiChevronUp, FiArrowUp,
    FiTrendingUp, FiAward, FiPlayCircle, FiClock,
    FiSliders
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

import MoviesHeader from './components/MoviesHeader';
import MoviesSidebar from './components/MoviesSidebar';
import { GENRES, SORT_OPTIONS } from './constants';

function Movies() {
    const [filters, setFilters] = useState({
        genre: '',
        year: '',
        rating: '',
        sortBy: 'popularity.desc'
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'
    const [activePreset, setActivePreset] = useState('popular');
    const [showScrollTop, setShowScrollTop] = useState(false);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteMovies(filters);
    const movies = data?.pages.flatMap(page => page.results) || [];
    const loader = useRef(null);

    // Scroll to top visibility
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 600);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Infinite scroll
    useEffect(() => {
        const currentLoader = loader.current;
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 1.0 });
        if (currentLoader) observer.observe(currentLoader);
        return () => { if (currentLoader) observer.unobserve(currentLoader); }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setActivePreset(null);
    };

    const toggleGenre = (id) => {
        const currentGenres = filters.genre ? filters.genre.split(',') : [];
        let newGenres;
        if (currentGenres.includes(id.toString())) {
            newGenres = currentGenres.filter(g => g !== id.toString());
        } else {
            newGenres = [...currentGenres, id.toString()];
        }
        handleFilterChange('genre', newGenres.join(','));
    };

    const applyPreset = (preset) => {
        setFilters(preset.filters);
        setActivePreset(preset.id);
    };

    const resetFilters = () => {
        setFilters({ genre: '', year: '', rating: '', sortBy: 'popularity.desc' });
        setActivePreset('popular');
    };

    // Active filter chips
    const activeFilters = useMemo(() => {
        const chips = [];
        if (filters.genre) {
            filters.genre.split(',').forEach(id => {
                const genre = GENRES.find(g => g.id.toString() === id);
                if (genre) chips.push({ key: 'genre', id: genre.id, label: genre.name });
            });
        }
        if (filters.year) chips.push({ key: 'year', label: `Year: ${filters.year}` });
        if (filters.rating) chips.push({ key: 'rating', label: `Rating: ${filters.rating}+` });
        if (filters.sortBy !== 'popularity.desc') {
            const sort = SORT_OPTIONS.find(s => s.value === filters.sortBy);
            if (sort) chips.push({ key: 'sortBy', label: sort.label });
        }
        return chips;
    }, [filters]);

    const removeChip = (chip) => {
        if (chip.key === 'genre') {
            toggleGenre(chip.id);
        } else {
            handleFilterChange(chip.key, chip.key === 'sortBy' ? 'popularity.desc' : '');
        }
    };

    return (
        <div className="bg-[#0b0f1a] min-h-screen">
            <Navbar />

            <MoviesHeader 
                viewMode={viewMode} setViewMode={setViewMode}
                isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
                activeFilters={activeFilters} removeChip={removeChip} resetFilters={resetFilters}
                activePreset={activePreset} applyPreset={applyPreset}
            />

            <div className="container mx-auto px-4 pb-12 flex flex-row lg:flex-row gap-8">
                <MoviesSidebar 
                    isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
                    filters={filters} handleFilterChange={handleFilterChange}
                    toggleGenre={toggleGenre} resetFilters={resetFilters}
                />

                {/* Movie Grid */}
                <div className="w-full lg:w-3/4 xl:w-4/5">
                    {/* Results Count */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            {isLoading ? 'Loading...' : `Showing ${movies.length}+ movies`}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className={`grid gap-4 lg:gap-6 ${
                            viewMode === 'grid'
                                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        }`}>
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className={`bg-gray-800/50 rounded-xl mb-3 ${
                                        viewMode === 'compact' ? 'h-48' : 'h-64 sm:h-72'
                                    }`} />
                                    <div className="h-4 bg-gray-800/50 rounded mb-2 w-3/4" />
                                    <div className="h-3 bg-gray-800/50 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : movies.length > 0 ? (
                        <div className={`grid gap-4 lg:gap-6 ${
                            viewMode === 'grid'
                                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        }`}>
                            {movies.map((item, index) => (
                                <Card key={`${item.id}-${index}`} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <FiFilter className="w-16 h-16 mb-4 opacity-30" />
                            <p className="text-xl font-medium mb-2">No movies found</p>
                            <p className="text-sm text-gray-500 mb-4">Try adjusting your filters for more results</p>
                            <button
                                onClick={resetFilters}
                                className="px-6 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors font-semibold"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Infinite Scroll Loader */}
                    <div ref={loader} className="h-20 flex items-center justify-center my-8">
                        {isFetchingNextPage && (
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400" />
                                <span className="text-gray-400 text-sm">Loading more...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 right-8 z-40 p-3 bg-cyan-500 text-white rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-colors"
                    >
                        <FiArrowUp className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Movies