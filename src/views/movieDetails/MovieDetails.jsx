import { useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/Navbar'
import {
    FiCalendar, FiClock, FiStar, FiPlay, FiBookmark,
    FiArrowLeft, FiUser, FiVideo, FiMonitor,
    FiShare2, FiExternalLink, FiHash, FiChevronDown,
    FiChevronUp, FiAward, FiGlobe
} from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useWatchlist } from '../../context/WatchlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import MovieImage from '../../components/MovieImage';
import { useMovieDetails } from '../../api/queries';
import { FastAverageColor } from 'fast-average-color';
import CircularRating from './components/CircularRating';
import TrailerModal from './components/TrailerModal';
import PosterPanel from './components/PosterPanel';
import DetailsPanel from './components/DetailsPanel';

function MovieDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    const passedItem = location.state?.item;
    const movieIdFromUrl = searchParams.get('movieId');
    const id = passedItem?.id || movieIdFromUrl;
    const type = passedItem?.title || passedItem?.original_title || searchParams.get('type') === 'movie' ? 'movie' : 'tv';

    const { data: movie, isLoading } = useMovieDetails(id, type);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [dominantColor, setDominantColor] = useState('#22d3ee');
    const [showFullCast, setShowFullCast] = useState(false);
    const [shareToast, setShareToast] = useState(false);
    const [expandedSeasons, setExpandedSeasons] = useState({});

    // Dynamic Color
    useEffect(() => {
        if (movie?.poster_path) {
            const fac = new FastAverageColor();
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
            img.onload = () => {
                try {
                    const color = fac.getColor(img);
                    setDominantColor(color.hex);
                } catch (e) { console.error("Color extraction failed", e); }
            };
            return () => fac.destroy();
        }
    }, [movie?.poster_path]);

    // Share handler
    const handleShare = async () => {
        const shareData = {
            title: movie?.title || movie?.name,
            text: `Check out ${movie?.title || movie?.name} on CineScope!`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setShareToast(true);
                setTimeout(() => setShareToast(false), 2500);
            }
        } catch {
            await navigator.clipboard.writeText(window.location.href);
            setShareToast(true);
            setTimeout(() => setShareToast(false), 2500);
        }
    };

    if (isLoading || !movie) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    const isAdded = isInWatchlist(movie.id);
    const title = movie.title || movie.name || "Untitled";
    const releaseDate = movie.release_date || movie.first_air_date || "N/A";
    const runtime = movie.runtime ? `${movie.runtime} min` : movie.episode_run_time ? `${movie.episode_run_time[0]} min` : "N/A";
    const rating = movie.vote_average?.toFixed(1) || "N/A";
    const ratingNum = parseFloat(rating);
    const genres = movie.genres?.map(g => g.name) || [];
    const director = movie.credits?.crew?.find(person => person.job === 'Director')?.name || "Unknown";
    const creator = type === 'tv' ? movie.created_by?.map(c => c.name).join(', ') : null;
    const recommendations = movie.recommendations?.results || [];
    const keywords = movie.keywords?.keywords || movie.keywords?.results || [];

    const videos = movie.videos?.results || [];
    const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') || videos.find(v => v.site === 'YouTube');

    const providers = movie['watch/providers']?.results?.US;
    const streamingProviders = providers?.flatrate || [];
    const rentProviders = providers?.rent || [];
    const buyProviders = providers?.buy || [];
    const allProviders = [...new Map([...streamingProviders, ...rentProviders, ...buyProviders].map(item => [item['provider_id'], item])).values()];

    const handleWatchlistToggle = () => {
        isAdded ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
    };

    const toggleSeason = (seasonNumber) => {
        setExpandedSeasons(prev => ({ ...prev, [seasonNumber]: !prev[seasonNumber] }));
    };

    const seasons = movie.seasons?.filter(s => s.season_number > 0) || [];
    const castToShow = showFullCast ? movie.credits?.cast?.slice(0, 20) : movie.credits?.cast?.slice(0, 8);

    const imdbId = movie.external_ids?.imdb_id;
    const homepage = movie.homepage;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Navbar />

            {/* Share Toast */}
            <AnimatePresence>
                {shareToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[3000] px-6 py-3 bg-green-500 text-white rounded-xl shadow-2xl font-semibold flex items-center gap-2"
                    >
                        ✓ Link copied to clipboard!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
                <MovieImage
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={title}
                    className="w-full h-full object-cover opacity-40"
                />
                <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                        background: `linear-gradient(to top, rgba(17, 24, 39, 1) 0%, rgba(17, 24, 39, 0.6) 50%, ${dominantColor}33 100%)`
                    }}
                />

                {/* Back & Share Buttons */}
                <div className="absolute top-24 left-6 md:left-12 flex items-center gap-3 z-20">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(-1)}
                        className="p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all border border-transparent hover:border-white/20"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </motion.button>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="absolute top-24 right-6 md:right-12 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all border border-transparent hover:border-white/20 z-20"
                >
                    <FiShare2 className="w-5 h-5" />
                </motion.button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="container mx-auto px-4 md:px-6 lg:px-8 -mt-32 md:-mt-48 relative z-10 pb-20"
            >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <PosterPanel 
                        movie={movie} title={title} dominantColor={dominantColor}
                        trailer={trailer} setIsTrailerOpen={setIsTrailerOpen}
                        handleWatchlistToggle={handleWatchlistToggle} isAdded={isAdded}
                        handleShare={handleShare} allProviders={allProviders}
                        providers={providers} imdbId={imdbId} homepage={homepage}
                    />

                    <DetailsPanel 
                        movie={movie} title={title} dominantColor={dominantColor}
                        ratingNum={ratingNum} rating={rating} releaseDate={releaseDate}
                        runtime={runtime} genres={genres} keywords={keywords}
                        director={director} creator={creator}
                        showFullCast={showFullCast} setShowFullCast={setShowFullCast}
                        castToShow={castToShow} seasons={seasons}
                        expandedSeasons={expandedSeasons} toggleSeason={toggleSeason}
                        recommendations={recommendations}
                    />
                </div>
            </motion.div>

            <TrailerModal 
                isTrailerOpen={isTrailerOpen} 
                setIsTrailerOpen={setIsTrailerOpen} 
                trailer={trailer} 
                dominantColor={dominantColor} 
            />
        </div>
    );
}

export default MovieDetails;