import { motion, AnimatePresence } from 'framer-motion';

function TrailerModal({ isTrailerOpen, setIsTrailerOpen, trailer, dominantColor }) {
    return (
        <AnimatePresence>
            {isTrailerOpen && trailer && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setIsTrailerOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border"
                        style={{ borderColor: `${dominantColor}50`, boxShadow: `0 25px 50px -12px ${dominantColor}40` }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsTrailerOpen(false)}
                            className="absolute -top-12 right-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                        >
                            Press ESC or click outside to close
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                            title="Trailer"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default TrailerModal;
