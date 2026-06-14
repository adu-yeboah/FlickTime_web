import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

function EmptyWatchlist() {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-800/30 rounded-3xl border border-gray-800">
            <FiHeart className="w-24 h-24 text-gray-700 mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">It is quiet here...</h2>
            <p className="text-gray-500 mb-8 max-w-md text-center">
                Start adding movies and TV shows to your watchlist to keep track of what you want to watch next.
            </p>
            <Link
                to="/movies"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all"
            >
                Browse Movies
            </Link>
        </div>
    );
}

export default EmptyWatchlist;
