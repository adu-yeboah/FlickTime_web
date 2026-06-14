import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiStar, FiHash, FiChevronUp, FiChevronDown } from "react-icons/fi";
import CircularRating from './CircularRating';
import MovieImage from '../../../components/MovieImage';
import { useNavigate } from 'react-router-dom';

function DetailsPanel({
    movie, title, dominantColor, ratingNum, rating, releaseDate,
    runtime, genres, keywords, director, creator,
    showFullCast, setShowFullCast, castToShow,
    seasons, expandedSeasons, toggleSeason, recommendations
}) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-2/3 text-white"
        >
            <div className="space-y-8">
                {/* Title, Rating & Tagline */}
                <div>
                    <div className="flex items-start gap-5 mb-3">
                        <div className="flex-shrink-0">
                            <CircularRating rating={ratingNum} color={dominantColor} size={70} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-tight">
                                {title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-lg md:text-xl italic font-medium mt-1 transition-colors duration-1000" style={{ color: dominantColor }}>
                                    {movie.tagline}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Stats */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-800/40 border border-gray-700/50 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                        <FiCalendar className="w-4 h-4" style={{ color: dominantColor }} />
                        <span className="font-semibold text-gray-200 text-sm">{releaseDate.split('-')[0]}</span>
                    </div>
                    {runtime !== 'N/A' && (
                        <div className="flex items-center gap-2 bg-gray-800/40 border border-gray-700/50 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                            <FiClock className="w-4 h-4" style={{ color: dominantColor }} />
                            <span className="font-semibold text-gray-200 text-sm">{runtime}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 bg-gray-800/40 border border-gray-700/50 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                        <FiStar className="w-4 h-4" style={{ color: dominantColor }} />
                        <span className="font-semibold text-gray-200 text-sm">{rating}/10</span>
                        <span className="text-gray-500 text-xs">({movie.vote_count?.toLocaleString()})</span>
                    </div>
                    {movie.status && (
                        <div className="flex items-center gap-2 bg-gray-800/40 border border-gray-700/50 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                            <span className={`w-2 h-2 rounded-full ${movie.status === 'Released' || movie.status === 'Returning Series' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                            <span className="font-semibold text-gray-200 text-sm">{movie.status}</span>
                        </div>
                    )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-gray-800/50 rounded-full text-sm font-semibold border border-gray-700/50 hover:border-opacity-100 transition-all cursor-default"
                            style={{ borderColor: `${dominantColor}40` }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = dominantColor;
                                e.currentTarget.style.backgroundColor = `${dominantColor}15`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = `${dominantColor}40`;
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                {/* Overview */}
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-white">Overview</h2>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                        {movie.overview || 'No overview available.'}
                    </p>
                </div>

                {/* Keywords */}
                {keywords.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <FiHash style={{ color: dominantColor }} /> Keywords
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {keywords.map((kw, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-gray-800/40 text-gray-400 rounded-lg text-xs font-medium border border-gray-700/30 hover:text-gray-200 hover:border-gray-600 transition-colors cursor-default"
                                >
                                    {kw.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Production Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold" style={{ color: dominantColor }}>Production</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between border-b border-gray-800/50 py-2">
                                <span className="text-gray-400 text-sm">Director</span>
                                <span className="font-semibold text-gray-200 text-sm">{director}</span>
                            </div>
                            {creator && (
                                <div className="flex justify-between border-b border-gray-800/50 py-2">
                                    <span className="text-gray-400 text-sm">Created By</span>
                                    <span className="font-semibold text-gray-200 text-sm">{creator}</span>
                                </div>
                            )}
                            {movie.budget > 0 && (
                                <div className="flex justify-between border-b border-gray-800/50 py-2">
                                    <span className="text-gray-400 text-sm">Budget</span>
                                    <span className="font-semibold text-gray-200 text-sm">${(movie.budget / 1000000).toFixed(1)}M</span>
                                </div>
                            )}
                            {movie.revenue > 0 && (
                                <div className="flex justify-between border-b border-gray-800/50 py-2">
                                    <span className="text-gray-400 text-sm">Revenue</span>
                                    <span className="font-semibold text-gray-200 text-sm">${(movie.revenue / 1000000).toFixed(1)}M</span>
                                </div>
                            )}
                            {movie.production_companies?.length > 0 && (
                                <div className="flex justify-between border-b border-gray-800/50 py-2">
                                    <span className="text-gray-400 text-sm">Studios</span>
                                    <span className="font-semibold text-gray-200 text-sm text-right max-w-[60%]">
                                        {movie.production_companies.slice(0, 3).map(c => c.name).join(', ')}
                                    </span>
                                </div>
                            )}
                            {movie.original_language && (
                                <div className="flex justify-between border-b border-gray-800/50 py-2">
                                    <span className="text-gray-400 text-sm">Language</span>
                                    <span className="font-semibold text-gray-200 text-sm uppercase">{movie.original_language}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cast */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold" style={{ color: dominantColor }}>Top Cast</h3>
                            {movie.credits?.cast?.length > 8 && (
                                <button
                                    onClick={() => setShowFullCast(!showFullCast)}
                                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                                >
                                    {showFullCast ? 'Show less' : `View all (${movie.credits.cast.length})`}
                                    {showFullCast ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />}
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {castToShow?.map((actor) => (
                                <div key={actor.id} className="flex items-center gap-3 bg-gray-800/30 p-2 rounded-lg hover:bg-gray-800/60 transition-colors">
                                    <MovieImage
                                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : `https://ui-avatars.com/api/?name=${actor.name}&background=random`}
                                        alt={actor.name}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-700"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-gray-200 truncate" title={actor.name}>{actor.name}</p>
                                        <p className="text-xs text-gray-500 truncate" title={actor.character}>{actor.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Seasons */}
                {seasons.length > 0 && (
                    <div className="pt-6 border-t border-gray-800/50">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <FiCalendar style={{ color: dominantColor }} /> Seasons
                        </h3>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700">
                            {seasons.map(season => (
                                <div key={season.id} className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50">
                                    <button
                                        onClick={() => toggleSeason(season.season_number)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-gray-700/30 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            {season.poster_path && (
                                                <img src={`https://image.tmdb.org/t/p/w92${season.poster_path}`} alt={season.name} className="w-12 h-16 object-cover rounded shadow" />
                                            )}
                                            <div>
                                                <h4 className="font-bold text-gray-200">{season.name}</h4>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {season.episode_count} Episodes • {season.air_date?.split('-')[0] || 'TBA'}
                                                </p>
                                            </div>
                                        </div>
                                        <motion.div animate={{ rotate: expandedSeasons[season.season_number] ? 180 : 0 }} className="p-2 bg-gray-900/50 rounded-full">
                                            <FiChevronDown className="w-5 h-5 text-gray-400" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {expandedSeasons[season.season_number] && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-gray-900/30"
                                            >
                                                <div className="p-4 text-sm text-gray-300 leading-relaxed border-t border-gray-800/50">
                                                    {season.overview || 'No overview available for this season.'}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <div className="pt-8 border-t border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-6">You Might Also Like</h3>
                        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {recommendations.slice(0, 12).map((rec, index) => (
                                <motion.div
                                    key={rec.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    whileHover={{ y: -6 }}
                                    onClick={() => {
                                        navigate(`/movie_details?movieId=${rec.id}&type=${rec.title ? 'movie' : 'tv'}`);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="flex-shrink-0 w-36 group cursor-pointer"
                                >
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 border border-gray-800 transition-all duration-300 hover:border-cyan-500/50">
                                        <MovieImage
                                            src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                                            alt={rec.title || rec.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Quick Rating Badge */}
                                        {rec.vote_average > 0 && (
                                            <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                                <FiStar className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                                                {rec.vote_average.toFixed(1)}
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="text-xs font-semibold text-gray-200 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                        {rec.title || rec.name}
                                    </h4>
                                    <p className="text-[10px] text-gray-500 mt-0.5">
                                        {(rec.release_date || rec.first_air_date)?.split('-')[0]}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default DetailsPanel;
