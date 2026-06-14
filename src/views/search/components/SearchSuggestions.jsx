import { motion, AnimatePresence } from 'framer-motion';
import { IoTimeOutline, IoClose } from 'react-icons/io5';
import { FiTrash2, FiTrendingUp } from 'react-icons/fi';
import { TRENDING_SEARCHES, GENRE_BROWSE } from '../constants';

function SearchSuggestions({ recentSearches, clearAllRecent, handleQuickSearch, removeRecentSearch }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <IoTimeOutline className="text-gray-400" /> Recent Searches
                        </h3>
                        <button onClick={clearAllRecent} className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1">
                            <FiTrash2 className="w-3 h-3" /> Clear all
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                            {recentSearches.map((term, i) => (
                                <motion.div
                                    key={term}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="group flex items-center gap-1"
                                >
                                    <button
                                        onClick={() => handleQuickSearch(term)}
                                        className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 rounded-full text-sm transition-colors border border-gray-700/50 hover:border-gray-600"
                                    >
                                        {term}
                                    </button>
                                    <button
                                        onClick={() => removeRecentSearch(term)}
                                        className="p-1 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <IoClose className="w-3.5 h-3.5" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Trending Searches */}
            <div className="max-w-4xl mx-auto mb-10">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <FiTrendingUp className="text-cyan-400" /> Trending Searches
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {TRENDING_SEARCHES.map((item, i) => (
                        <motion.button
                            key={item.term}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => handleQuickSearch(item.term)}
                            className="relative overflow-hidden px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-70 group-hover:opacity-90 transition-opacity`} />
                            <div className="absolute inset-0 bg-black/20" />
                            <span className="relative z-10">{item.term}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Browse by Genre */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-lg font-bold text-white mb-4">Browse by Genre</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {GENRE_BROWSE.map((item, i) => (
                        <motion.button
                            key={item.term}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => handleQuickSearch(item.term)}
                            className="flex flex-col items-center gap-2 p-4 bg-gray-800/40 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all hover:scale-105 group"
                        >
                            <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                            <span className="text-sm text-gray-300 font-medium">{item.term}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default SearchSuggestions;
