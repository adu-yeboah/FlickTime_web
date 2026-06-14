import { Link } from 'react-router-dom';
import { FiFilm, FiTv, FiPlay } from 'react-icons/fi';

function CallToAction() {
    return (
        <div className="mt-24 relative">
            {/* Ambient glow layers */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 via-blue-600/10 to-purple-600/20 blur-3xl rounded-3xl pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-3xl pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-gray-900/80 backdrop-blur-xl">

                {/* Scanline texture overlay — the signature cinematic detail */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
                        backgroundSize: '100% 3px',
                    }}
                />

                {/* Top edge accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                {/* Film strip perforations — left side */}
                <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-around items-center opacity-10 pointer-events-none select-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-4 h-3 rounded-sm border border-white/60" />
                    ))}
                </div>
                {/* Film strip perforations — right side */}
                <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-around items-center opacity-10 pointer-events-none select-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-4 h-3 rounded-sm border border-white/60" />
                    ))}
                </div>

                {/* Main content */}
                <div className="relative px-14 py-14 md:py-20 text-center">

                    {/* Play icon badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 mb-8 mx-auto">
                        <FiPlay className="w-7 h-7 text-white fill-white" />
                    </div>

                    <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                        Discover Your Next
                        <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                            Favorite Watch
                        </span>
                    </h3>

                    <p className="text-gray-400 mb-10 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                        Timeless classics to the latest blockbusters — all in one place. Start your cinematic journey.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/movies"
                            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5 text-sm md:text-base"
                        >
                            <FiFilm className="w-5 h-5" />
                            Explore Movies
                        </Link>
                        <Link
                            to="/tv"
                            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white/[0.05] border border-white/10 hover:bg-white/[0.10] hover:border-white/20 text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm md:text-base"
                        >
                            <FiTv className="w-5 h-5 text-cyan-400" />
                            Browse TV Shows
                        </Link>
                    </div>
                </div>

                {/* Bottom edge accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
            </div>
        </div>
    );
}

export default CallToAction;