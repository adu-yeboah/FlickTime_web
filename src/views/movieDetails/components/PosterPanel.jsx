import { motion } from 'framer-motion';
import { FiPlay, FiBookmark, FiShare2, FiMonitor, FiAward, FiGlobe } from "react-icons/fi";
import MovieImage from '../../../components/MovieImage';

function PosterPanel({
    movie, title, dominantColor, trailer, setIsTrailerOpen,
    handleWatchlistToggle, isAdded, handleShare,
    allProviders, providers, imdbId, homepage
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/3"
        >
            <div className="relative group max-w-sm mx-auto lg:mx-0">
                <div
                    className="rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-1000 border border-gray-800"
                    style={{ boxShadow: `0 25px 50px -12px ${dominantColor}40` }}
                >
                    <MovieImage
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={title}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
                {trailer && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsTrailerOpen(true)}
                        className="col-span-2 flex items-center justify-center gap-2 py-4 text-gray-900 font-bold rounded-xl transition-all shadow-lg"
                        style={{ backgroundColor: dominantColor, boxShadow: `0 10px 15px -3px ${dominantColor}40` }}
                    >
                        <FiPlay className="w-5 h-5 fill-current" />
                        Watch Trailer
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWatchlistToggle}
                    className={`flex items-center justify-center gap-2 py-3 font-bold rounded-xl transition-colors border ${
                        isAdded
                            ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                            : 'bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-700'
                    }`}
                >
                    <FiBookmark className={`w-5 h-5 ${isAdded ? 'fill-current' : ''}`} />
                    {isAdded ? 'Saved' : 'Watchlist'}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold rounded-xl transition-colors border border-gray-700"
                >
                    <FiShare2 className="w-5 h-5" />
                    Share
                </motion.button>
            </div>

            {/* Where to Watch */}
            {allProviders.length > 0 && (
                <div className="mt-6 max-w-sm mx-auto lg:mx-0 bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <FiMonitor style={{ color: dominantColor }} /> Where to Watch
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {allProviders.slice(0, 6).map(provider => (
                            <img
                                key={provider.provider_id}
                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                alt={provider.provider_name}
                                title={provider.provider_name}
                                className="w-10 h-10 rounded-lg shadow-md border border-gray-700 hover:scale-110 transition-transform"
                            />
                        ))}
                    </div>
                    {providers?.link && (
                        <a href={providers.link} target="_blank" rel="noopener noreferrer" className="block mt-3 text-sm hover:underline transition-colors" style={{ color: dominantColor }}>
                            View all providers →
                        </a>
                    )}
                </div>
            )}

            {/* External Links */}
            {(imdbId || homepage) && (
                <div className="mt-4 max-w-sm mx-auto lg:mx-0 flex gap-3">
                    {imdbId && (
                        <a
                            href={`https://www.imdb.com/title/${imdbId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold rounded-xl transition-colors border border-yellow-500/30 text-sm"
                        >
                            <FiAward className="w-4 h-4" /> IMDb
                        </a>
                    )}
                    {homepage && (
                        <a
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold rounded-xl transition-colors border border-gray-700 text-sm"
                        >
                            <FiGlobe className="w-4 h-4" /> Website
                        </a>
                    )}
                </div>
            )}
        </motion.div>
    );
}

export default PosterPanel;
