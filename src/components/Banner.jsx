import { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
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
      <div className="relative mt-4 w-full h-[70vh] bg-gray-900 animate-shimmer rounded-2xl mx-auto max-w-7xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading featured movie...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mt-4 w-full h-[70vh] md:h-[80vh] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden group">
        <MovieImage
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.original_title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-y-0 left-0 flex items-center w-full md:w-3/5 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="p-6 md:p-8 lg:p-10 bg-gray-900/80 backdrop-blur-sm rounded-r-2xl md:bg-gradient-to-r md:from-gray-900/90 md:via-gray-900/80 md:to-transparent w-full md:max-w-2xl"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-400 mb-3"
            >
              {movie.original_title}
            </motion.h1>

            {/* Release Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2 text-gray-300 mb-4"
            >
              <FiCalendar className="w-5 h-5 text-cyan-400" />
              <span className="text-sm md:text-base">
                {new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3 md:line-clamp-4"
            >
              {movie.overview}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold rounded-lg transition-colors duration-300 shadow-lg shadow-cyan-400/30 focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
                aria-label="Play trailer"
              >
                Play Trailer
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={`/movie_details?movieId=${movie.id}`}
                  className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg shadow-white/10 border border-gray-700 hover:border-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  View Details
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-gray-900 rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-colors duration-200"
                aria-label="Close modal"
              >
                <span className="text-2xl">×</span>
              </motion.button>

              {/* Poster Image */}
              <div className="md:w-2/5">
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">
                  {movie.original_title}
                </h2>

                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <FiCalendar className="w-5 h-5 text-cyan-400" />
                  <span>
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {movie.overview}
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 border border-gray-700"
                  >
                    Close
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={`/movie_details?movieId=${movie.id}`}
                      onClick={closeModal}
                      className="inline-block px-6 py-2 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
                    >
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
