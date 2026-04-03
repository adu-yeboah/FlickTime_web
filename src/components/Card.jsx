import PropTypes from 'prop-types'
import { useWatchlist } from '../context/WatchlistContext'
import { useHistory } from '../context/HistoryContext'
import { FiHeart } from 'react-icons/fi'
import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MovieImage from './MovieImage'

function Card({ item, onClick }) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const { addToHistory } = useHistory();
    const navigate = useNavigate();

    // Simple skeleton if item not loaded yet
    if (!item) {
        return (
            <div className="group w-48 sm:w-52 cursor-pointer">
                {/* Skeleton Image */}
                <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-gray-800 animate-shimmer">
                </div>

                {/* Skeleton Title */}
                <div className="mt-3 h-4 bg-gray-800 rounded-full animate-pulse"></div>
                <div className="mt-2 h-3 w-3/4 bg-gray-800 rounded-full animate-pulse"></div>
            </div>
        )
    }

    const title = item.title || item.name || item.original_title || 'Untitled'
    const voteAverage = item.vote_average?.toFixed(1) || 'N/A'
    const isAdded = isInWatchlist(item.id);
    const altTitle = title.split(' ').slice(0, 2).join(' ');

    const handleWatchlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAdded) {
            removeFromWatchlist(item.id);
        } else {
            addToWatchlist(item);
        }
    };

    const handleClick = () => {
        addToHistory(item);
        if (onClick) {
            onClick(item);
        } else {
            navigate('/movie_details', { state: { item } });
        }
    };

    // Determine rating color based on score
    const getRatingColor = (rating) => {
        if (rating >= 8) return 'bg-green-500'
        if (rating >= 6) return 'bg-yellow-500'
        if (rating >= 4) return 'bg-orange-500'
        return 'bg-red-500'
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group w-48 sm:w-52 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 rounded-xl"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label={`${title}, ${voteAverage} rating`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick()
                }
            }}
        >
            {/* Card Container */}
            <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-gray-900 shadow-lg shadow-black/20 group-hover:shadow-2xl group-hover:shadow-black/60 transition-shadow duration-500">
                {/* Poster Image */}
                <MovieImage
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={`${altTitle} poster`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Rating Badge */}
                <div
                    className={`absolute top-3 left-3 px-2.5 py-1.5 ${getRatingColor(item.vote_average)} text-white text-xs font-bold rounded-lg backdrop-blur-md bg-opacity-90 shadow-lg flex items-center gap-1 z-10`}
                    aria-label={`Rating: ${voteAverage} out of 10`}
                >
                    <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                    <span aria-hidden="true">{voteAverage}</span>
                </div>

                {/* Watchlist Button */}
                <button
                    onClick={handleWatchlistClick}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${isAdded ? 'bg-red-500 text-white shadow-lg shadow-red-500/40' : 'bg-black/30 text-white hover:bg-white/20'}`}
                    aria-label={isAdded ? `Remove ${title} from Watchlist` : `Add ${title} to Watchlist`}
                    title={isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                    <FiHeart className={`w-4 h-4 ${isAdded ? 'fill-current' : ''}`} aria-hidden="true" />
                </button>

                {/* Hover Overlay Content */}
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1" aria-hidden="true">
                            {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'N/A'}
                        </p>
                        <p className="text-sm font-bold line-clamp-2" aria-hidden="true">
                            {title}
                        </p>
                    </div>
                </div>
            </div>

            {/* Title Below Card */}
            <div
                className="mt-3 text-gray-300 font-semibold text-sm sm:text-base line-clamp-1 group-hover:text-cyan-400 transition-colors duration-300"
                title={title}
            >
                {title}
            </div>

            {/* Additional Info on Hover */}
            <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                <span>
                    {item.release_date ? (
                        new Date(item.release_date).getFullYear()
                    ) : (
                        item.first_air_date ? 'Series' : 'N/A'
                    )}
                </span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>{item.media_type === 'tv' ? 'TV' : 'Movie'}</span>
            </div>
        </motion.div>
    )
}

Card.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func
}

export default Card