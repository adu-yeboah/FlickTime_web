import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { IoClose, IoTv, IoFilm } from 'react-icons/io5';

function SearchHeader({
    input, handleChange, clearSearch, inputRef,
    searchType, setSearchType, showResults,
    debouncedInput, isLoading, resultsLength
}) {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
                    Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Movies</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">TV Shows</span>
                </h1>
                <p className="text-gray-400 text-lg">
                    Search through thousands of titles to find your next favorite
                </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative mb-8"
            >
                <div className="relative flex items-center group">
                    <div className="absolute left-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                        <FiSearch className="w-5 h-5" />
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for movies or TV shows..."
                        className="w-full pl-14 pr-36 py-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-lg backdrop-blur-sm"
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                        autoFocus
                    />

                    {input && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={clearSearch}
                            className="absolute right-28 p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <IoClose className="w-5 h-5" />
                        </motion.button>
                    )}

                    {/* Search Type Toggle */}
                    <div className="absolute right-3 flex items-center gap-1 bg-gray-900/60 rounded-xl p-1">
                        <button
                            onClick={() => setSearchType('movie')}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                searchType === 'movie'
                                    ? 'bg-cyan-500 text-gray-900 shadow-lg shadow-cyan-500/30'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <IoFilm className="w-4 h-4" />
                            <span className="hidden sm:inline">Movies</span>
                        </button>
                        <button
                            onClick={() => setSearchType('tv')}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                searchType === 'tv'
                                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <IoTv className="w-4 h-4" />
                            <span className="hidden sm:inline">TV</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Search Results Header */}
            {showResults && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 border-b border-gray-800 pb-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Results for <span className="text-cyan-400">"{debouncedInput}"</span>
                            </h2>
                            <p className="text-gray-400 mt-1 text-sm">
                                {isLoading ? 'Searching...' : `${resultsLength}+ ${searchType === 'movie' ? 'movies' : 'TV shows'} found`}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default SearchHeader;
