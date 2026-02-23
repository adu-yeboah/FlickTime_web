import { useEffect, useRef, useState } from 'react'
import './Movies.scss'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import { useInfiniteMovies } from '../../api/queries'
import { FiFilter, FiX, FiStar, FiCalendar, FiList } from 'react-icons/fi'

const GENRES = [
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

const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'primary_release_date.desc', label: 'Newest First' },
    { value: 'primary_release_date.asc', label: 'Oldest First' },
    { value: 'revenue.desc', label: 'Highest Revenue' }
];

function Movies() {
    const [filters, setFilters] = useState({
        genre: '',
        year: '',
        rating: '',
        sortBy: 'popularity.desc'
    });
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMovies(filters)
    const movies = data?.pages.flatMap(page => page.results) || [];
    const loader = useRef(null)

    useEffect(() => {
        const currentLoader = loader.current;

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 1.0 });

        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
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

    return (
        <div className="bg-[#0b0f1a] min-h-screen">
            <Navbar />

            <div className="pt-8 pb-4">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end border-b border-gray-800 pb-4 mb-6">
                        <div className="head text-4xl font-bold text-white">
                            <span className="text-cyan-400">movies</span>.
                        </div>
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <FiFilter className="w-5 h-5" />
                            <span className="font-semibold">Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-8">
                
                {/* Discovery Sidebar */}
                <div className={`
                    fixed inset-0 z-50 lg:static lg:block lg:w-1/4 xl:w-1/5
                    ${isSidebarOpen ? 'block' : 'hidden'}
                `}>
                    {/* Mobile Overlay */}
                    <div className="absolute inset-0 bg-black/80 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
                    
                    <div className="relative bg-gray-900 lg:bg-transparent h-full w-4/5 lg:w-full max-w-sm p-6 lg:p-0 overflow-y-auto lg:overflow-visible">
                        <div className="flex justify-between items-center lg:hidden mb-6">
                            <h2 className="text-2xl font-bold text-white">Filters</h2>
                            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-8 sticky top-24">
                            
                            {/* Sort By */}
                            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <FiList className="text-cyan-400" /> Sort By
                                </h3>
                                <select 
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                                >
                                    {SORT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Release Year */}
                            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <FiCalendar className="text-cyan-400" /> Release Year
                                </h3>
                                <input 
                                    type="number" 
                                    placeholder="e.g. 2023"
                                    value={filters.year}
                                    onChange={(e) => handleFilterChange('year', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                                />
                            </div>

                            {/* Minimum Rating */}
                            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <FiStar className="text-cyan-400" /> Min Rating ({filters.rating || '0'}+)
                                </h3>
                                <input 
                                    type="range" 
                                    min="0" max="10" step="1"
                                    value={filters.rating || 0}
                                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                                    className="w-full accent-cyan-400"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>0</span>
                                    <span>5</span>
                                    <span>10</span>
                                </div>
                            </div>

                            {/* Genres */}
                            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <FiFilter className="text-cyan-400" /> Genres
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {GENRES.map(g => {
                                        const isSelected = filters.genre && filters.genre.split(',').includes(g.id.toString());
                                        return (
                                            <button
                                                key={g.id}
                                                onClick={() => toggleGenre(g.id)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                                                    isSelected 
                                                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' 
                                                    : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500'
                                                }`}
                                            >
                                                {g.name}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Reset Buttons */}
                            <button 
                                onClick={() => setFilters({ genre: '', year: '', rating: '', sortBy: 'popularity.desc' })}
                                className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors"
                            >
                                Reset Filters
                            </button>

                        </div>
                    </div>
                </div>

                {/* Movie Grid */}
                <div className="w-full lg:w-3/4 xl:w-4/5">
                    {movies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                            {movies.map((item, index) => (
                                <Card
                                    key={`${item.id}-${index}`}
                                    item={item}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <FiFilter className="w-12 h-12 mb-4 opacity-50" />
                            <p className="text-xl">No movies found matching your filters.</p>
                            <button 
                                onClick={() => setFilters({ genre: '', year: '', rating: '', sortBy: 'popularity.desc' })}
                                className="mt-4 text-cyan-400 hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Infinite Scroll Loader */}
                    <div ref={loader} className="h-20 flex items-center justify-center my-8">
                        {isFetchingNextPage && (
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Movies
