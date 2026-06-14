import { motion } from 'framer-motion';
import { FiPlay, FiBookmark, FiShare2, FiMonitor, FiAward, FiGlobe, FiCheck } from "react-icons/fi";
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
            className="w-full lg:w-1/3 flex-shrink-0"
        >
            {/* ── Poster card ── */}
            <div className="relative max-w-sm mx-auto lg:mx-0 group">
                {/* Glow halo behind poster */}
                <div
                    className="absolute -inset-3 rounded-3xl blur-2xl opacity-30 transition-opacity duration-700 group-hover:opacity-50 pointer-events-none"
                    style={{ background: dominantColor }}
                />

                <div
                    className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl"
                    style={{ boxShadow: `0 30px 60px -15px ${dominantColor}35` }}
                >
                    <MovieImage
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={title}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Subtle bottom fade on poster */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950/60 to-transparent pointer-events-none" />

                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                        style={{ background: `linear-gradient(90deg, transparent, ${dominantColor}70, transparent)` }}
                    />
                </div>
            </div>

            {/* ── Action buttons ── */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 max-w-sm mx-auto lg:mx-0">
                {trailer && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsTrailerOpen(true)}
                        className="col-span-2 flex items-center justify-center gap-2.5 py-3.5 text-gray-950 font-bold rounded-xl transition-all text-sm shadow-lg"
                        style={{
                            backgroundColor: dominantColor,
                            boxShadow: `0 8px 20px -4px ${dominantColor}50`,
                        }}
                    >
                        <FiPlay className="w-4 h-4 fill-current flex-shrink-0" />
                        Watch Trailer
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleWatchlistToggle}
                    className={`flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all border ${isAdded
                            ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
                            : 'bg-white/[0.05] hover:bg-white/[0.09] text-white border-white/10 hover:border-white/20'
                        }`}
                >
                    {isAdded
                        ? <FiCheck className="w-4 h-4 flex-shrink-0" />
                        : <FiBookmark className="w-4 h-4 flex-shrink-0" />
                    }
                    {isAdded ? 'Saved' : 'Watchlist'}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/10 hover:border-white/20"
                >
                    <FiShare2 className="w-4 h-4 flex-shrink-0" />
                    Share
                </motion.button>
            </div>

            {/* ── External links ── */}
            {(imdbId || homepage) && (
                <div className="mt-3 max-w-sm mx-auto lg:mx-0 flex gap-2.5">
                    {imdbId && (
                        <a
                            href={`https://www.imdb.com/title/${imdbId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-yellow-400/8 hover:bg-yellow-400/15 text-yellow-400 font-bold rounded-xl transition-all border border-yellow-400/20 hover:border-yellow-400/40 text-xs"
                        >
                            <FiAward className="w-3.5 h-3.5" /> IMDb
                        </a>
                    )}
                    {homepage && (
                        <a
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/[0.05] hover:bg-white/[0.09] text-white font-bold rounded-xl transition-all border border-white/10 hover:border-white/20 text-xs"
                        >
                            <FiGlobe className="w-3.5 h-3.5" /> Website
                        </a>
                    )}
                </div>
            )}

            {/* ── Where to Watch ── */}
            {allProviders.length > 0 && (
                <div className="mt-4 max-w-sm mx-auto lg:mx-0 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                        <FiMonitor className="w-3.5 h-3.5 flex-shrink-0" style={{ color: dominantColor }} />
                        <h3 className="text-xs font-bold text-gray-300 tracking-wide uppercase">Where to Watch</h3>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-wrap gap-2.5">
                            {allProviders.slice(0, 8).map(provider => (
                                <img
                                    key={provider.provider_id}
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    title={provider.provider_name}
                                    className="w-9 h-9 rounded-lg border border-white/10 hover:border-white/30 hover:scale-110 transition-all duration-200 cursor-default shadow-md"
                                />
                            ))}
                        </div>
                        {providers?.link && (
                            <a
                                href={providers.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 text-xs font-medium hover:underline transition-colors"
                                style={{ color: dominantColor }}
                            >
                                View all providers →
                            </a>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default PosterPanel;