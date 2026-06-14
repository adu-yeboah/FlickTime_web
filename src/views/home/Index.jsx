import { usePopularMovies, useUpcomingMovies, useTrendingTv, useInfiniteMovies, useRecommendations } from '../../api/queries'
import { useWatchlist } from '../../context/WatchlistContext'
import { useHistory } from '../../context/HistoryContext'
import Navbar from '../../components/Navbar'
import Banner from '../../components/Banner'
import MoodMatcher from '../../components/MoodMatcher'
import SectionCarousel from './components/SectionCarousel';
import CallToAction from './components/CallToAction';
import { FiTrendingUp, FiFilm, FiTv, FiCalendar, FiAlertCircle, FiHeart, FiClock } from 'react-icons/fi';

function Index() {
    const { watchlist } = useWatchlist();
    const { history } = useHistory();
    const latestWatchlistItem = watchlist.length > 0 ? watchlist[watchlist.length - 1] : null;
    const latestItemType = latestWatchlistItem ? (latestWatchlistItem.title || latestWatchlistItem.original_title ? 'movie' : 'tv') : null;

    const { data: popularMovies = [], isLoading: isLoadingPopular, error: errorPopular } = usePopularMovies();
    const { data: upcomingMovies = [], isLoading: isLoadingUpcoming, error: errorUpcoming } = useUpcomingMovies();
    const { data: tv = [], isLoading: isLoadingTv, error: errorTv } = useTrendingTv();
    const { data: moviesData, isLoading: isLoadingMovies, error: errorMovies } = useInfiniteMovies();
    const { data: smartRecommendations = [], isLoading: isLoadingRecs } = useRecommendations(
        latestWatchlistItem?.id, 
        latestItemType
    );

    const movies = moviesData?.pages[0]?.results || [];

    const isLoading = isLoadingPopular || isLoadingUpcoming || isLoadingTv || isLoadingMovies || isLoadingRecs;
    const error = errorPopular || errorUpcoming || errorTv || errorMovies;

    const sections = [
        ...(latestWatchlistItem && smartRecommendations.length > 0 ? [{
            id: 'smart-recs',
            title: `Because you added "${latestWatchlistItem.title || latestWatchlistItem.name}"`,
            icon: FiHeart,
            items: smartRecommendations,
            color: 'from-purple-500 to-pink-500',
        }] : []),
        ...(history.length > 0 ? [{
            id: 'recently-viewed',
            title: 'Recently Viewed',
            icon: FiClock,
            items: history,
            color: 'from-green-500 to-emerald-500',
        }] : []),
        {
            id: 'trending',
            title: 'Trending Now',
            icon: FiTrendingUp,
            items: popularMovies,
            color: 'from-pink-500 to-rose-500',
        },
        {
            id: 'movies',
            title: 'Popular Movies',
            icon: FiFilm,
            items: movies,
            color: 'from-cyan-500 to-blue-500',
        },
        {
            id: 'tv-shows',
            title: 'TV Shows',
            icon: FiTv,
            items: tv,
            color: 'from-indigo-500 to-purple-500',
        },
        {
            id: 'upcoming',
            title: 'Coming Soon',
            icon: FiCalendar,
            items: upcomingMovies,
            color: 'from-amber-500 to-orange-500',
        },
    ];


    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                <div className="text-center p-8 bg-gray-800 rounded-2xl border border-red-500/30">
                    <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition">Try Again</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0b0f1a] to-black">
            <Navbar />
            <Banner />
            <MoodMatcher />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {sections.map((section) => (
                    <SectionCarousel key={section.id} section={section} />
                ))}

                <CallToAction />
            </div>
        </div>
    )
}

export default Index