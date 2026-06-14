import { Link } from 'react-router-dom';

function CallToAction() {
    return (
        <div className="mt-20 relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 blur-xl"></div>
            <div className="relative p-10 md:p-16 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md border border-gray-700 rounded-3xl text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Discover Your Next Favorite</h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                    From timeless classics to the latest blockbusters, we have it all. Start your cinematic journey today.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link to="/movies" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all hover:shadow-cyan-500/50 hover:shadow-lg transform hover:-translate-y-1">
                        Explore Movies
                    </Link>
                    <Link to="/tv" className="px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-gray-400 text-white font-bold rounded-xl transition-all hover:bg-gray-800">
                        Browse TV Shows
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CallToAction;
