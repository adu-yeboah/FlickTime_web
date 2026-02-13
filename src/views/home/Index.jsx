import { usePopularMovies, useUpcomingMovies, useTrendingTv, useInfiniteMovies } from '../../api/queries'
import Navbar from '../../components/Navbar'
import Banner from '../../components/Banner'
import Card from '../../components/Card'
import MoodMatcher from '../../components/MoodMatcher'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { FiTrendingUp, FiFilm, FiTv, FiCalendar, FiAlertCircle } from 'react-icons/fi';

function Index() {
    const { data: popularMovies = [], isLoading: isLoadingPopular, error: errorPopular } = usePopularMovies();
    const { data: upcomingMovies = [], isLoading: isLoadingUpcoming, error: errorUpcoming } = useUpcomingMovies();
    const { data: tv = [], isLoading: isLoadingTv, error: errorTv } = useTrendingTv();
    const { data: moviesData, isLoading: isLoadingMovies, error: errorMovies } = useInfiniteMovies();

    const movies = moviesData?.pages[0]?.results || [];

    const isLoading = isLoadingPopular || isLoadingUpcoming || isLoadingTv || isLoadingMovies;
    const error = errorPopular || errorUpcoming || errorTv || errorMovies;

    const sections = [
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
            color: 'from-purple-500 to-indigo-500',
        },
        {
            id: 'upcoming',
            title: 'Coming Soon',
            icon: FiCalendar,
            items: upcomingMovies,
            color: 'from-amber-500 to-orange-500',
        },
    ];

    const swiperBreakpoints = {
        320: { slidesPerView: 2, spaceBetween: 12 },
        480: { slidesPerView: 3, spaceBetween: 16 },
        640: { slidesPerView: 4, spaceBetween: 18 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 24 },
        1280: { slidesPerView: 6, spaceBetween: 28 },
        1440: { slidesPerView: 6, spaceBetween: 30 },
    };

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
                    <div key={section.id} className="mb-12 lg:mb-16">
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-6 md:mb-8 pl-2 border-l-4 border-l-transparent hover:border-l-cyan-400 transition-all">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color} shadow-lg shadow-gray-900/50`}>
                                    <section.icon className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                    {section.title}
                                </h2>
                            </div>

                            <Link
                                to={section.id === 'tv-shows' ? '/tv' : section.id === 'movies' ? '/movies' : '/movies'}
                                className="group flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                            >
                                View All
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>

                        {/* Swiper Carousel */}
                        <div className="relative group">
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={30}
                                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                navigation={{ nextEl: `.swiper-button-next-${section.id}`, prevEl: `.swiper-button-prev-${section.id}` }}
                                modules={[Autoplay, Navigation]}
                                className="custom-swiper py-4"
                                breakpoints={swiperBreakpoints}
                            >
                                {section.items && section.items.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <Card item={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <button className={`swiper-button-prev-${section.id} absolute left-[-1rem] top-1/2 -translate-y-1/2 z-20 p-3 bg-gray-900/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cyan-600 shadow-xl border border-gray-700`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button className={`swiper-button-next-${section.id} absolute right-[-1rem] top-1/2 -translate-y-1/2 z-20 p-3 bg-gray-900/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cyan-600 shadow-xl border border-gray-700`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                ))}

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
            </div>
        </div>
    )
}

export default Index