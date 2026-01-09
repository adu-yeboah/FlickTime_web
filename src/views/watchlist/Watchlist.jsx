import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import { useWatchlist } from '../../context/WatchlistContext';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

const Watchlist = () => {
    const { watchlist } = useWatchlist();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0b0f1a] to-black">
            <Navbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-red-500/10 rounded-full border border-red-500/20">
                        <FiHeart className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>
                        <p className="text-gray-400 mt-1">
                            {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                </div>

                {watchlist.length === 0 ? (
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
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {watchlist.map((item) => (
                            <Card
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
