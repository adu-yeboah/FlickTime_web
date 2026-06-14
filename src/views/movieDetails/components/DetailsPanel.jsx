import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiStar, FiHash, FiChevronDown } from "react-icons/fi";
import CircularRating from './CircularRating';
import MovieImage from '../../../components/MovieImage';
import { useNavigate } from 'react-router-dom';

function StatPill({ icon: Icon, label, color }) {
    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.07] text-sm">
            <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
            <span className="text-gray-200 font-medium">{label}</span>
        </div>
    );
}

function SectionHeading({ children, color, className = '' }) {
    return (
        <h2 className={`text-base font-bold text-gray-100 tracking-wide flex items-center gap-2 ${className}`}>
            <span className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: color }} />
            {children}
        </h2>
    );
}

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

                {/* ── Title block ── */}
                <div className="flex items-start gap-5">
                    <CircularRating rating={ratingNum} color={dominantColor} size={72} />
                    <div className="flex-1 min-w-0 pt-1">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                            {title}
                        </h1>
                        {movie.tagline && (
                            <p
                                className="text-sm md:text-base italic font-medium mt-1.5 opacity-80"
                                style={{ color: dominantColor }}
                            >
                                "{movie.tagline}"
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Stat pills ── */}
                <div className="flex flex-wrap gap-2">
                    <StatPill icon={FiCalendar} label={releaseDate.split('-')[0]} color={dominantColor} />
                    {runtime !== 'N/A' && (
                        <StatPill icon={FiClock} label={runtime} color={dominantColor} />
                    )}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.07] text-sm">
                        <FiStar className="w-3.5 h-3.5 flex-shrink-0 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-200 font-medium">{rating}/10</span>
                        {movie.vote_count && (
                            <span className="text-gray-500 text-xs">({movie.vote_count.toLocaleString()})</span>
                        )}
                    </div>
                    {movie.status && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.07] text-sm">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                movie.status === 'Released' || movie.status === 'Returning Series'
                                    ? 'bg-green-400' : 'bg-yellow-400'
                            }`} />
                            <span className="text-gray-200 font-medium">{movie.status}</span>
                        </div>
                    )}
                </div>

                {/* ── Genres ── */}
                {genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre, i) => (
                            <span
                                key={i}
                                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-default"
                                style={{
                                    borderColor: `${dominantColor}35`,
                                    color: dominantColor,
                                    background: `${dominantColor}10`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = `${dominantColor}25`;
                                    e.currentTarget.style.borderColor = `${dominantColor}70`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = `${dominantColor}10`;
                                    e.currentTarget.style.borderColor = `${dominantColor}35`;
                                }}
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}

                {/* ── Overview ── */}
                <div className="space-y-2.5">
                    <SectionHeading color={dominantColor}>Overview</SectionHeading>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
                        {movie.overview || 'No overview available.'}
                    </p>
                </div>

                {/* ── Production + Cast grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Production */}
                    <div className="space-y-3">
                        <SectionHeading color={dominantColor}>Production</SectionHeading>
                        <div className="divide-y divide-white/[0.05]">
                            {[
                                { label: 'Director', value: director },
                                creator && { label: 'Created by', value: creator },
                                movie.budget > 0 && { label: 'Budget', value: `$${(movie.budget / 1e6).toFixed(1)}M` },
                                movie.revenue > 0 && { label: 'Revenue', value: `$${(movie.revenue / 1e6).toFixed(1)}M` },
                                movie.production_companies?.length > 0 && {
                                    label: 'Studios',
                                    value: movie.production_companies.slice(0, 3).map(c => c.name).join(', '),
                                },
                                movie.original_language && {
                                    label: 'Language',
                                    value: movie.original_language.toUpperCase(),
                                },
                            ].filter(Boolean).map((row, i) => (
                                <div key={i} className="flex justify-between items-start gap-4 py-2.5">
                                    <span className="text-gray-500 text-xs flex-shrink-0">{row.label}</span>
                                    <span className="text-gray-200 text-xs font-semibold text-right">{row.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cast */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <SectionHeading color={dominantColor}>Top Cast</SectionHeading>
                            {movie.credits?.cast?.length > 8 && (
                                <button
                                    onClick={() => setShowFullCast(!showFullCast)}
                                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
                                >
                                    {showFullCast ? 'Show less' : `All (${movie.credits.cast.length})`}
                                    <FiChevronDown
                                        className="w-3 h-3 transition-transform duration-200"
                                        style={{ transform: showFullCast ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    />
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {castToShow?.map((actor) => (
                                <div
                                    key={actor.id}
                                    className="flex items-center gap-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-xl p-2 transition-colors"
                                >
                                    <MovieImage
                                        src={actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=1f2937&color=9ca3af&size=64`
                                        }
                                        alt={actor.name}
                                        className="w-9 h-9 rounded-full object-cover border border-white/10 flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-gray-200 truncate">{actor.name}</p>
                                        <p className="text-[10px] text-gray-500 truncate">{actor.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Keywords ── */}
                {keywords.length > 0 && (
                    <div className="space-y-3">
                        <SectionHeading color={dominantColor}>
                            <FiHash className="w-3.5 h-3.5" /> Keywords
                        </SectionHeading>
                        <div className="flex flex-wrap gap-1.5">
                            {keywords.map((kw, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 bg-white/[0.04] text-gray-400 rounded-lg text-[11px] font-medium border border-white/[0.06] hover:text-gray-200 hover:border-white/15 transition-colors cursor-default"
                                >
                                    {kw.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Seasons ── */}
                {seasons.length > 0 && (
                    <div className="pt-6 border-t border-white/[0.06] space-y-3">
                        <SectionHeading color={dominantColor}>
                            <FiCalendar className="w-3.5 h-3.5" /> Seasons
                        </SectionHeading>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {seasons.map(season => (
                                <div key={season.id} className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.02]">
                                    <button
                                        onClick={() => toggleSeason(season.season_number)}
                                        className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.04] transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            {season.poster_path && (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w92${season.poster_path}`}
                                                    alt={season.name}
                                                    className="w-10 h-14 object-cover rounded-lg shadow border border-white/10"
                                                />
                                            )}
                                            <div>
                                                <h4 className="font-semibold text-gray-200 text-sm">{season.name}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {season.episode_count} ep · {season.air_date?.split('-')[0] || 'TBA'}
                                                </p>
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: expandedSeasons[season.season_number] ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/[0.05] flex-shrink-0"
                                        >
                                            <FiChevronDown className="w-4 h-4 text-gray-400" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {expandedSeasons[season.season_number] && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-4 pb-4 pt-2 text-sm text-gray-400 leading-relaxed border-t border-white/[0.05]">
                                                    {season.overview || 'No overview available for this season.'}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Recommendations ── */}
                {recommendations.length > 0 && (
                    <div className="pt-6 border-t border-white/[0.06] space-y-4">
                        <SectionHeading color={dominantColor}>You Might Also Like</SectionHeading>
                        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent -mx-1 px-1">
                            {recommendations.slice(0, 12).map((rec, index) => (
                                <motion.div
                                    key={rec.id}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    whileHover={{ y: -4 }}
                                    onClick={() => {
                                        navigate(`/movie_details?movieId=${rec.id}&type=${rec.title ? 'movie' : 'tv'}`);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="flex-shrink-0 w-32 cursor-pointer group"
                                >
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 border border-white/[0.07] group-hover:border-white/20 transition-all duration-300">
                                        <MovieImage
                                            src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                                            alt={rec.title || rec.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {rec.vote_average > 0 && (
                                            <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                                <FiStar className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                                                {rec.vote_average.toFixed(1)}
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="text-xs font-semibold text-gray-300 line-clamp-2 group-hover:text-white transition-colors leading-snug">
                                        {rec.title || rec.name}
                                    </h4>
                                    <p className="text-[10px] text-gray-600 mt-0.5">
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