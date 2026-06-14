import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { FiShare2, FiArrowLeft } from "react-icons/fi";
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
                } catch (e) { console.error('Color extraction failed', e); }
            };
            return () => fac.destroy();
        }
    }, [movie?.poster_path]);

    const handleShare = async () => {
        const shareData = {
            title: movie?.title || movie?.name,
            text: `Check out ${movie?.title || movie?.name} on FlickTime!`,
            url: window.location.href,
        };
        try {
            if (navigator.share) await navigator.share(shareData);
            else {
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
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
                <div
                    className="w-14 h-14 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: `${dominantColor} transparent transparent transparent` }}
                />
                <p className="text-gray-500 text-sm tracking-widest uppercase animate-pulse">Loading</p>
            </div>
        );
    }

    const isAdded = isInWatchlist(movie.id);
    const title = movie.title || movie.name || 'Untitled';
    const releaseDate = movie.release_date || movie.first_air_date || 'N/A';
    const runtime = movie.runtime
        ? `${movie.runtime} min`
        : movie.episode_run_time?.[0]
            ? `${movie.episode_run_time[0]} min`
            : 'N/A';
    const rating = movie.vote_average?.toFixed(1) || 'N/A';
    const ratingNum = parseFloat(rating);
    const genres = movie.genres?.map(g => g.name) || [];
    const director = movie.credits?.crew?.find(p => p.job === 'Director')?.name || 'Unknown';
    const creator = type === 'tv' ? movie.created_by?.map(c => c.name).join(', ') : null;
    const recommendations = movie.recommendations?.results || [];
    const keywords = movie.keywords?.keywords || movie.keywords?.results || [];
    const videos = movie.videos?.results || [];
    const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') || videos.find(v => v.site === 'YouTube');
    const providers = movie['watch/providers']?.results?.US;
    const allProviders = [...new Map([
        ...(providers?.flatrate || []),
        ...(providers?.rent || []),
        ...(providers?.buy || []),
    ].map(item => [item.provider_id, item])).values()];

    const handleWatchlistToggle = () => {
        isAdded ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
    };
    const toggleSeason = (n) => setExpandedSeasons(prev => ({ ...prev, [n]: !prev[n] }));
    const seasons = movie.seasons?.filter(s => s.season_number > 0) || [];
    const castToShow = showFullCast
        ? movie.credits?.cast?.slice(0, 20)
        : movie.credits?.cast?.slice(0, 8);
    const imdbId = movie.external_ids?.imdb_id;
    const homepage = movie.homepage;

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />

            {/* ── Share toast ── */}
            <AnimatePresence>
                {shareToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[3000] px-5 py-2.5 bg-gray-900 border border-green-500/30 text-green-400 rounded-xl shadow-2xl font-semibold text-sm flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                        Link copied to clipboard
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Hero backdrop ── */}
            <div className="relative h-[45vh] md:h-[65vh] overflow-hidden">
                {movie.backdrop_path && (
                    <MovieImage
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={title}
                        className="w-full h-full object-cover opacity-30"
                    />
                )}

                {/* Gradient layers */}
                <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                        background: `linear-gradient(to bottom, ${dominantColor}18 0%, transparent 40%, rgba(9,9,11,0.95) 90%, #09090b 100%)`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 to-transparent" />

                {/* Floating back button */}
                <div className="absolute top-6 left-4 md:left-8 z-20 flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-3.5 py-2 bg-black/50 hover:bg-black/70 text-white text-sm font-medium rounded-xl backdrop-blur-md transition-all border border-white/10 hover:border-white/20"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back</span>
                    </motion.button>
                </div>

                {/* Floating share button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="absolute top-6 right-4 md:right-8 z-20 p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-xl backdrop-blur-md transition-all border border-white/10 hover:border-white/20"
                    aria-label="Share"
                >
                    <FiShare2 className="w-4 h-4" />
                </motion.button>
            </div>

            {/* ── Main content ── */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="container mx-auto px-4 md:px-6 lg:px-8 -mt-28 md:-mt-44 relative z-10 pb-24"
            >
                <div className="flex flex-row lg:flex-row gap-8 lg:gap-14">
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