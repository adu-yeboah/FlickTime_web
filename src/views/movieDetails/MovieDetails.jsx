import { useState } from 'react';
import Navbar from '../../components/Navbar'
import { FiCalendar, FiClock, FiStar, FiPlay, FiBookmark, FiArrowLeft, FiUser, FiVideo, FiMonitor } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useWatchlist } from '../../context/WatchlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import MovieImage from '../../components/MovieImage';
import { useMovieDetails } from '../../api/queries';

function MovieDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // Get item from location state or id from search params
  const passedItem = location.state?.item;
  const movieIdFromUrl = searchParams.get('movieId');
  
  const id = passedItem?.id || movieIdFromUrl;
  const type = passedItem?.title || passedItem?.original_title || searchParams.get('type') === 'movie' ? 'movie' : 'tv';

  const { data: movie, isLoading } = useMovieDetails(id, type);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

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
  const genres = movie.genres?.map(g => g.name) || [];
  const director = movie.credits?.crew?.find(person => person.job === 'Director')?.name || "Unknown";
  const recommendations = movie.recommendations?.results || [];
  
  // Videos & Trailers
  const videos = movie.videos?.results || [];
  const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') || videos.find(v => v.site === 'YouTube');

  // Watch Providers (US Default)
  const providers = movie['watch/providers']?.results?.US;
  const streamingProviders = providers?.flatrate || [];
  const rentProviders = providers?.rent || [];
  const buyProviders = providers?.buy || [];
  const allProviders = [...new Map([...streamingProviders, ...rentProviders, ...buyProviders].map(item => [item['provider_id'], item])).values()];

  const handleWatchlistToggle = () => {
    if (isAdded) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />

      {/* Backdrop Image with Overlay */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <MovieImage
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 md:left-12 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all duration-300 z-20 group"
        >
          <FiArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4 md:px-6 lg:px-8 -mt-32 md:-mt-48 relative z-10 pb-20"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Poster Image & Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/3"
          >
            <div className="relative group max-w-sm mx-auto lg:mx-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/70 border border-gray-800">
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Rating Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg flex items-center gap-2">
                <FiStar className="w-5 h-5 fill-current" />
                <span className="text-xl">{rating}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 gap-4 max-w-sm mx-auto lg:mx-0">
              {trailer && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsTrailerOpen(true)}
                  className="flex items-center justify-center gap-2 py-4 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold rounded-xl transition-colors duration-300 shadow-lg shadow-cyan-400/30"
                >
                  <FiPlay className="w-6 h-6 fill-current" />
                  Watch Trailer
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWatchlistToggle}
                className={`flex items-center justify-center gap-2 py-4 font-bold rounded-xl transition-colors duration-300 border ${isAdded ? 'bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/30' : 'bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-700'}`}
              >
                <FiBookmark className={`w-6 h-6 ${isAdded ? 'fill-current' : ''}`} />
                {isAdded ? 'In Watchlist' : 'Add to Watchlist'}
              </motion.button>
            </div>
            
            {/* Where to Watch */}
            {allProviders.length > 0 && (
                <div className="mt-8 max-w-sm mx-auto lg:mx-0 bg-gray-800/40 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <FiMonitor className="text-cyan-400" /> Where to Watch
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {allProviders.slice(0, 6).map(provider => (
                            <img 
                                key={provider.provider_id}
                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                alt={provider.provider_name}
                                title={provider.provider_name}
                                className="w-12 h-12 rounded-lg shadow-md border border-gray-700 hover:scale-110 transition-transform"
                            />
                        ))}
                    </div>
                    {providers.link && (
                        <a href={providers.link} target="_blank" rel="noopener noreferrer" className="block mt-4 text-sm text-cyan-400 hover:text-cyan-300 hover:underline">
                            View all providers on TMDB →
                        </a>
                    )}
                </div>
            )}
          </motion.div>

          {/* Movie Details Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-2/3 text-white"
          >
            <div className="space-y-8">
              {/* Title and Tagline */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3">
                  {title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl md:text-2xl text-cyan-400/80 italic font-medium">{movie.tagline}</p>
                )}
              </div>

              {/* Info Stats */}
              <div className="flex flex-wrap items-center gap-3 md:gap-5">
                <div className="flex items-center gap-2 bg-gray-800/40 border border-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <FiCalendar className="w-5 h-5 text-cyan-400" />
                  <span className="font-semibold text-gray-200">{releaseDate.split('-')[0]}</span>
                </div>

                <div className="flex items-center gap-2 bg-gray-800/40 border border-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <FiClock className="w-5 h-5 text-cyan-400" />
                  <span className="font-semibold text-gray-200">{runtime}</span>
                </div>

                <div className="flex items-center gap-2 bg-gray-800/40 border border-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <FiStar className="w-5 h-5 text-cyan-400" />
                  <span className="font-semibold text-gray-200">{rating}/10</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-5 py-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full text-sm font-bold border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 shadow-lg"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-2 inline-block">Overview</h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  {movie.overview}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Production</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-800/50 py-2">
                      <span className="text-gray-400 font-medium">Director</span>
                      <span className="font-bold text-gray-200">{director}</span>
                    </div>
                    {movie.budget > 0 && (
                      <div className="flex justify-between border-b border-gray-800/50 py-2">
                        <span className="text-gray-400 font-medium">Budget</span>
                        <span className="font-bold text-gray-200">${(movie.budget / 1000000).toFixed(1)}M</span>
                      </div>
                    )}
                    {movie.revenue > 0 && (
                      <div className="flex justify-between border-b border-gray-800/50 py-2">
                        <span className="text-gray-400 font-medium">Revenue</span>
                        <span className="font-bold text-gray-200">${(movie.revenue / 1000000).toFixed(1)}M</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-gray-800/50 py-2">
                      <span className="text-gray-400 font-medium">Status</span>
                      <span className="font-bold text-gray-200">{movie.status}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Top Cast</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {movie.credits?.cast?.slice(0, 8).map((actor) => (
                      <div
                        key={actor.id}
                        className="flex items-center gap-3 p-2 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:bg-gray-700/40 transition-colors cursor-pointer group"
                      >
                        {actor.profile_path ? (
                            <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} className="w-10 h-10 rounded-full object-cover shadow-md group-hover:shadow-purple-500/30" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center"><FiUser /></div>
                        )}
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-bold text-white truncate">{actor.name}</span>
                            <span className="text-xs text-gray-400 truncate">{actor.character}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations Section */}
              {recommendations.length > 0 && (
                <div className="pt-12 border-t border-gray-800">
                  <h3 className="text-2xl font-bold text-white mb-6">You Might Also Like</h3>
                  <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {recommendations.slice(0, 10).map((rec, index) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -8 }}
                        onClick={() => {
                          navigate(`/movie_details?movieId=${rec.id}&type=${rec.title ? 'movie' : 'tv'}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex-shrink-0 w-40 group cursor-pointer"
                      >
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-gray-800 group-hover:border-cyan-400/50 transition-all duration-300">
                          <MovieImage
                            src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                            alt={rec.title || rec.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="text-sm font-bold text-gray-200 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                          {rec.title || rec.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {(rec.release_date || rec.first_air_date)?.split('-')[0]}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {isTrailerOpen && trailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsTrailerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsTrailerOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors"
              >
                Close
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title="Trailer"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default MovieDetails;