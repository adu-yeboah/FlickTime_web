import PropTypes from 'prop-types'
import { useWatchlist } from '../context/WatchlistContext'
import { FiHeart } from 'react-icons/fi'
import { Star } from 'lucide-react'

function Card({ item, onClick }) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    // Simple skeleton if item not loaded yet
    if (!item) {
        return (
            <div className="group w-48 sm:w-52 cursor-pointer">
                {/* Skeleton Image */}
                <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent animate-shimmer"></div>
                </div>

                {/* Skeleton Title */}
                <div className="mt-3 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full animate-pulse"></div>
                <div className="mt-2 h-3 w-3/4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full animate-pulse"></div>
            </div>
        )
    }

    const title = item.title || item.name || item.original_title || 'Untitled'
    const voteAverage = item.vote_average?.toFixed(1) || 'N/A'
    const isAdded = isInWatchlist(item.id);

    const handleWatchlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAdded) {
            removeFromWatchlist(item.id);
        } else {
            addToWatchlist(item);
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
        <div
            className="group w-48 sm:w-52 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            onClick={() => onClick && onClick(item)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${title}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onClick && onClick(item)
                }
            }}
        >
            {/* Card Container */}
            <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-black/40 transition-all duration-300">
                {/* Poster Image */}
                <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={`${title} poster`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Rating Badge */}
                <div
                    className={`absolute top-3 left-3 px-2.5 py-1.5 ${getRatingColor(item.vote_average)} text-white text-sm font-bold rounded-lg backdrop-blur-sm bg-opacity-90 shadow-lg flex items-center gap-1`}
                    aria-hidden="true"
                >
                    <Star className="w-3 h-3" aria-hidden="true" />
                    <span>{voteAverage}</span>
                </div>

                {/* Watchlist Button */}
                <button
                    onClick={handleWatchlistClick}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 z-10 ${isAdded ? 'bg-red-500 text-white' : 'bg-black/30 text-white hover:bg-white/20'}`}
                    title={isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                    <FiHeart className={`w-5 h-5 ${isAdded ? 'fill-current' : ''}`} />
                </button>

                {/* Hover Overlay Content */}
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="text-white">
                        <p className="text-xs font-medium text-gray-300 mb-1">
                            {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'N/A'}
                        </p>
                        <p className="text-sm font-semibold line-clamp-2">
                            {title}
                        </p>
                    </div>
                </div>
            </div>

            {/* Title Below Card */}
            <div
                className="mt-3 text-gray-300 font-medium text-sm sm:text-base line-clamp-1 group-hover:text-cyan-400 transition-colors duration-200"
                title={title}
            >
                {title}
            </div>

            {/* Additional Info on Hover */}
            <div className="mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.release_date ? (
                    new Date(item.release_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })
                ) : (
                    item.first_air_date ? 'TV Series' : 'Unknown Date'
                )}
            </div>
        </div>
    )
}

export default Card

Card.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func
}