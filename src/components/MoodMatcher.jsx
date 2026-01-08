import React, { useState, useContext } from 'react';
import { ApiContext } from '../context/apiContext';
import { FiSmile, FiFrown, FiMeh, FiHeart, FiZap, FiCoffee, FiX } from 'react-icons/fi';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const MoodMatcher = () => {
    const { movies, popularMovies } = useContext(ApiContext);
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [mood, setMood] = useState(null);
    const [genre, setGenre] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    const allMovies = [...movies, ...popularMovies];

    // Simple keyword mapping for "simulated" AI matching
    const moodKeywords = {
        happy: [35, 10751, 12], // Comedy, Family, Adventure
        sad: [18, 10749], // Drama, Romance
        excited: [28, 878, 53], // Action, Sci-Fi, Thriller
        relaxed: [99, 36, 10402], // Documentary, History, Music
        scared: [27, 9648], // Horror, Mystery
        romantic: [10749, 35] // Romance, Comedy
    };

    const handleMatch = (selectedGenre) => {
        setGenre(selectedGenre);
        setStep(2);

        // "AI" Logic: Filter movies based on mood (genre ids)
        const targetGenres = moodKeywords[mood] || [];
        const matched = allMovies.filter(m =>
            m.genre_ids.some(id => targetGenres.includes(id))
        ).slice(0, 5); // Top 5 matches

        setRecommendations(matched);
    };

    const reset = () => {
        setIsOpen(false);
        setStep(0);
        setMood(null);
        setGenre(null);
        setRecommendations([]);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce"
            >
                <FiZap size={24} />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">
                        <button
                            onClick={reset}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                                Smart Mood Matcher
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Let our AI find the perfect movie for your vibe right now.
                            </p>

                            {step === 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl text-white font-semibold">How are you feeling?</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {[
                                            { id: 'happy', icon: FiSmile, label: 'Happy', color: 'text-yellow-400' },
                                            { id: 'sad', icon: FiFrown, label: 'Melancholy', color: 'text-blue-400' },
                                            { id: 'excited', icon: FiZap, label: 'Excited', color: 'text-orange-400' },
                                            { id: 'relaxed', icon: FiCoffee, label: 'Relaxed', color: 'text-green-400' },
                                            { id: 'scared', icon: FiMeh, label: 'Brave', color: 'text-purple-400' },
                                            { id: 'romantic', icon: FiHeart, label: 'Romantic', color: 'text-red-400' },
                                        ].map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => { setMood(item.id); setStep(1); }}
                                                className="p-6 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 flex flex-col items-center gap-3 group border border-transparent hover:border-purple-500/50"
                                            >
                                                <item.icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform`} />
                                                <span className="text-white font-medium">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl text-white font-semibold">Select your vibe</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Blockbuster', 'Hidden Gem', 'Critics Choice', 'Fan Favorite'].map((g) => (
                                            <button
                                                key={g}
                                                onClick={() => handleMatch(g)}
                                                className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-all"
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setStep(0)} className="text-gray-500 hover:text-white text-sm">Back</button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="text-center">
                                        <h3 className="text-2xl text-white font-bold mb-2">Top Picks for You</h3>
                                        <p className="text-purple-400">Based on your {mood} mood</p>
                                    </div>

                                    {recommendations.length > 0 ? (
                                        <Swiper
                                            slidesPerView={2}
                                            spaceBetween={20}
                                            autoplay={{ delay: 3000 }}
                                            modules={[Autoplay]}
                                            breakpoints={{
                                                640: { slidesPerView: 3 },
                                            }}
                                            className="pb-8"
                                        >
                                            {recommendations.map(movie => (
                                                <SwiperSlide key={movie.id}>
                                                    <Card item={movie} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <div className="text-center text-gray-400 py-8">
                                            No perfect matches found. Try a different mood!
                                            <button onClick={() => setStep(0)} className="block mx-auto mt-4 text-purple-400 hover:underline">Start Over</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MoodMatcher;
