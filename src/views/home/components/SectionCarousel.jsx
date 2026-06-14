import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Card from '../../../components/Card';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function SectionCarousel({ section }) {
    const swiperBreakpoints = {
        320: { slidesPerView: 2, spaceBetween: 12 },
        480: { slidesPerView: 3, spaceBetween: 16 },
        640: { slidesPerView: 4, spaceBetween: 18 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 24 },
        1280: { slidesPerView: 6, spaceBetween: 28 },
        1440: { slidesPerView: 6, spaceBetween: 30 },
    };

    return (
        <div className="mb-12 lg:mb-16">
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

                {section.id !== 'smart-recs' && section.id !== 'recently-viewed' && (
                    <Link
                        to={section.id === 'tv-shows' ? '/tv' : '/movies'}
                        className="group flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                    >
                        View All
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                )}
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
    );
}

export default SectionCarousel;
