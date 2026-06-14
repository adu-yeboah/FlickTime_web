import { useState } from 'react';
import { FiCalendar, FiStar, FiPlay, FiInfo } from 'react-icons/fi';
import { usePopularMovies } from '../api/queries';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MovieImage from './MovieImage';

function Banner() {
  const { data: popularMovies = [] } = usePopularMovies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const movie = popularMovies[0];

  if (!movie) {
    return (
      <div className="relative mt-4 w-full h-[70vh] bg-gray-900/50 rounded-2xl mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40" 
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.015) 2px,rgba(255,255,255,.015) 3px)',
               backgroundSize: '100% 3px',
             }} 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-sm tracking-widest uppercase">Loading featured</span>
          </div>
        </div>
      </div>
    );
  }

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative mt-4 w-full h-[72vh] md:h-[82vh] mx-auto container px-4 sm:px-6 lg:px-8"
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden group">

        {/* Backdrop image */}
        <MovieImage
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.original_title}
          className="w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-105"
        />

        {/* Multi-layer gradient — left-heavy for content legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/85 to-gray-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
        {/* Subtle vignette around all edges */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />

        
        {/* ── Main content ── */}
        <div className="absolute inset-y-0 left-0 flex items-end md:items-center w-full md:w-3/5 lg:w-[52%]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="w-full p-6 md:p-10 lg:p-12 pb-8 md:pb-10"
          >

            {/* Rating + date row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center flex-wrap gap-3 mb-4"
            >
              {rating && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-400/15 border border-yellow-400/25 text-yellow-300 text-xs font-bold">
                  <FiStar className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                  {rating}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-gray-400 text-xs">
                <FiCalendar className="w-3 h-3 text-cyan-400/70" />
                {new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight"
            >
              {movie.original_title}
              {/* Cyan accent underline on last word effect */}
              <span className="block h-px w-16 bg-gradient-to-r from-cyan-400 to-transparent mt-3 ml-0.5 opacity-70" />
            </motion.h1>

            {/* Overview */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300/90 text-sm md:text-base leading-relaxed mb-7 line-clamp-3 md:line-clamp-4 max-w-lg"
            >
              {movie.overview}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={openModal}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-gray-950 font-bold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-400/30 text-sm"
                aria-label="Play trailer"
              >
                <FiPlay className="w-4 h-4 fill-gray-950" />
                Play Trailer
              </motion.button>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to={`/movie_details?movieId=${movie.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.07] hover:bg-white/[0.12] text-white font-bold rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 text-sm"
                >
                  <FiInfo className="w-4 h-4" />
                  View Details
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative bg-gray-900 border border-white/[0.07] rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent z-10" />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-gray-800/90 hover:bg-gray-700 text-white rounded-full border border-white/10 transition-colors text-lg leading-none"
                aria-label="Close modal"
              >
                ×
              </motion.button>

              {/* Poster */}
              <div className="md:w-2/5 flex-shrink-0">
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-56 md:h-full object-cover"
                />
              </div>

              {/* Modal body */}
              <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
                <div>
                  {/* Rating badge in modal */}
                  {rating && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-400/15 border border-yellow-400/25 text-yellow-300 text-xs font-bold mb-4">
                      <FiStar className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                      {rating} / 10
                    </span>
                  )}

                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1 leading-tight">
                    {movie.original_title}
                  </h2>

                  <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-5">
                    <FiCalendar className="w-3.5 h-3.5 text-cyan-400/70" />
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {movie.overview}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={closeModal}
                    className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.10] text-white text-sm font-semibold rounded-xl transition-colors border border-white/10"
                  >
                    Close
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to={`/movie_details?movieId=${movie.id}`}
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-gray-950 text-sm font-bold rounded-xl transition-colors"
                    >
                      <FiInfo className="w-3.5 h-3.5" />
                      View Full Details
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Banner;