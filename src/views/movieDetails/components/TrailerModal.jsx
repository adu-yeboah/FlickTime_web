import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

function TrailerModal({ isTrailerOpen, setIsTrailerOpen, trailer, dominantColor }) {

    // Close on Escape key
    useEffect(() => {
        if (!isTrailerOpen) return;
        const handler = (e) => { if (e.key === 'Escape') setIsTrailerOpen(false); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isTrailerOpen, setIsTrailerOpen]);

    return (
        <AnimatePresence>
            {isTrailerOpen && trailer && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
                    onClick={() => setIsTrailerOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

                    {/* Ambient glow behind modal */}
                    <div
                        className="absolute w-[60vw] h-[40vh] rounded-full blur-[100px] opacity-20 pointer-events-none"
                        style={{ background: dominantColor }}
                    />

                    <motion.div
                        initial={{ scale: 0.88, opacity: 0, y: 24 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.88, opacity: 0, y: 24 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                        className="relative w-full max-w-5xl z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top bar: title + close */}
                        <div className="flex items-center justify-between mb-3 px-1">
                            <span className="text-sm font-medium text-gray-400 tracking-wide truncate pr-4">
                                {trailer.name || 'Official Trailer'}
                            </span>
                            <button
                                onClick={() => setIsTrailerOpen(false)}
                                className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors group"
                                aria-label="Close trailer"
                            >
                                <span className="hidden sm:inline">ESC to close</span>
                                <span className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                                    <FiX className="w-3.5 h-3.5" />
                                </span>
                            </button>
                        </div>

                        {/* Video container */}
                        <div
                            className="relative aspect-video rounded-2xl overflow-hidden border"
                            style={{
                                borderColor: `${dominantColor}40`,
                                boxShadow: `0 0 0 1px ${dominantColor}20, 0 40px 80px -20px ${dominantColor}50, 0 20px 40px -10px rgba(0,0,0,0.8)`,
                            }}
                        >
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
                                style={{ background: `linear-gradient(90deg, transparent, ${dominantColor}80, transparent)` }}
                            />

                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
                                title="Trailer"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Click outside hint */}
                        <p className="text-center text-xs text-gray-600 mt-3">Click outside to close</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default TrailerModal;