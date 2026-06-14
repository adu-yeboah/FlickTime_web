import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import { IoSearch, IoClose, IoTv, IoFilm, IoTimeOutline } from 'react-icons/io5'
import { FiSearch, FiTrash2, FiTrendingUp } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useInfiniteSearch } from '../../api/queries'
import { motion, AnimatePresence } from 'framer-motion'

import SearchHeader from './components/SearchHeader';
import SearchSuggestions from './components/SearchSuggestions';

const MAX_RECENT = 8;

function Search() {
    const [input, setInput] = useState("")
    const [debouncedInput, setDebouncedInput] = useState("")
    const [searchType, setSearchType] = useState('movie')
    const [recentSearches, setRecentSearches] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('recentSearches') || '[]');
        } catch { return []; }
    });
    const navigate = useNavigate()
    const loader = useRef(null)
    const inputRef = useRef(null)

    // Debounce
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedInput(input), 500)
        return () => clearTimeout(timer)
    }, [input])

    // Save to recent searches
    const saveRecentSearch = useCallback((term) => {
        if (!term.trim()) return;
        setRecentSearches(prev => {
            const filtered = prev.filter(s => s !== term);
            const updated = [term, ...filtered].slice(0, MAX_RECENT);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
            return updated;
        });
    }, []);

    // Save on search execution (when debounced input changes to a non-empty value)
    useEffect(() => {
        if (debouncedInput.trim()) {
            saveRecentSearch(debouncedInput.trim());
        }
    }, [debouncedInput, saveRecentSearch]);

    const removeRecentSearch = (term) => {
        setRecentSearches(prev => {
            const updated = prev.filter(s => s !== term);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
            return updated;
        });
    };

    const clearAllRecent = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteSearch(debouncedInput, searchType)
    const results = data?.pages.flatMap(page => page.results) || []
    const showResults = !!debouncedInput

    // Infinite scroll
    useEffect(() => {
        const currentLoader = loader.current;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
        }, { threshold: 1.0 });
        if (currentLoader) observer.observe(currentLoader);
        return () => { if (currentLoader) observer.unobserve(currentLoader); }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    const handleChange = (value) => setInput(value)
    const clearSearch = () => { setInput(""); inputRef.current?.focus(); }

    const handleQuickSearch = (term) => {
        setInput(term);
        inputRef.current?.focus();
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Navbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <SearchHeader 
                        input={input} handleChange={handleChange} clearSearch={clearSearch}
                        inputRef={inputRef} searchType={searchType} setSearchType={setSearchType}
                        showResults={showResults} debouncedInput={debouncedInput}
                        isLoading={isLoading} resultsLength={results.length}
                    />
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="w-full h-64 sm:h-72 bg-gray-800/50 rounded-xl mb-3" />
                                <div className="h-4 bg-gray-800/50 rounded mb-2 w-3/4" />
                                <div className="h-3 bg-gray-800/50 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : showResults ? (
                    results.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                                {results.map((item, idx) => (
                                    <Card
                                        key={`${item.id}-${idx}`}
                                        item={item}
                                        onClick={(item) => navigate('/movie_details', { state: { item } })}
                                    />
                                ))}
                            </div>
                            <div ref={loader} className="h-20 flex items-center justify-center my-8">
                                {isFetchingNextPage && (
                                    <div className="flex items-center gap-3">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400" />
                                        <span className="text-gray-400 text-sm">Loading more...</span>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800/50 rounded-full mb-6 border border-gray-700/50">
                                <IoSearch className="w-12 h-12 text-gray-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-6">
                                We couldn't find any {searchType === 'movie' ? 'movies' : 'TV shows'} matching "{debouncedInput}". Try different keywords.
                            </p>
                            <button
                                onClick={clearSearch}
                                className="px-6 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors font-semibold"
                            >
                                Try another search
                            </button>
                        </motion.div>
                    )
                ) : (
                    <SearchSuggestions 
                        recentSearches={recentSearches} clearAllRecent={clearAllRecent}
                        handleQuickSearch={handleQuickSearch} removeRecentSearch={removeRecentSearch}
                    />
                )}
            </div>
        </div>
    )
}

export default Search