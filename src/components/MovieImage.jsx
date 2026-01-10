import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import noPoster from '../assets/no-poster.png';

const MovieImage = ({ src, alt, className, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
        setIsLoading(true);
        setError(false);
        setImageSrc(src);
    }, [src]);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setError(true);
        setImageSrc(noPoster);
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gray-800 animate-shimmer z-10"
                    />
                )}
            </AnimatePresence>

            <motion.img
                src={imageSrc || noPoster}
                alt={alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoading ? 0 : 1,
                    scale: isLoading ? 1.05 : 1
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onLoad={handleLoad}
                onError={handleError}
                className={`w-full h-full object-cover ${className}`}
                {...props}
            />
        </div>
    );
};

export default MovieImage;
