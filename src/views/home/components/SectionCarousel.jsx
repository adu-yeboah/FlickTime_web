import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Card from '../../../components/Card';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function SectionCarousel({ section }) {
    const swiperBreakpoints = {
        320: { slidesPerView: 2,   spaceBetween: 10 },
        480: { slidesPerView: 3,   spaceBetween: 14 },
        640: { slidesPerView: 4,   spaceBetween: 16 },
        768: { slidesPerView: 4,   spaceBetween: 18 },
        1024: { slidesPerView: 5,  spaceBetween: 22 },
        1280: { slidesPerView: 6,  spaceBetween: 26 },
        1440: { slidesPerView: 6,  spaceBetween: 28 },
    };

    const prevClass = `swiper-prev-${section.id}`;
    const nextClass = `swiper-next-${section.id}`;

    return (
        <div className="mb-14 lg:mb-18">

            {/* ── Section header ─────────────────────────────── */}
            <div className="flex items-center justify-between mb-5 md:mb-7">
                <div className="flex items-center gap-3 min-w-0">
                    {/* Icon pill */}
                    <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${section.color} shadow-md`}>
                        <section.icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Title + subtle underline gradient */}
                    <div className="relative">
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight truncate">
                            {section.title}
                        </h2>
                        {/* Thin accent line under title */}
                        <div className={`absolute -bottom-1 left-0 h-px w-12 bg-gradient-to-r ${section.color} opacity-70`} />
                    </div>
                </div>

                {section.id !== 'smart-recs' && section.id !== 'recently-viewed' && (
                    <Link
                        to={section.id === 'tv-shows' ? '/tv' : '/movies'}
                        className="flex-shrink-0 ml-4 flex items-center gap-1.5 text-xs md:text-sm text-cyan-400/80 hover:text-cyan-300 font-medium transition-colors group"
                    >
                        View all
                        <svg
                            className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                )}
            </div>

            {/* ── Swiper ─────────────────────────────────────── */}
            <div className="relative group/carousel">

                {/* Left fade mask */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0b0f1a] to-transparent z-10" />
                {/* Right fade mask */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0b0f1a] to-transparent z-10" />

                <Swiper
                    slidesPerView={6}
                    spaceBetween={28}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    navigation={{
                        nextEl: `.${nextClass}`,
                        prevEl: `.${prevClass}`,
                    }}
                    modules={[Autoplay, Navigation]}
                    className="py-3 px-1"
                    breakpoints={swiperBreakpoints}
                >
                    {section.items?.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Card item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Prev button */}
                <button
                    className={`
                        ${prevClass}
                        absolute left-0 top-1/2 -translate-y-1/2 z-20
                        w-9 h-9 flex items-center justify-center
                        bg-gray-900/95 border border-white/10
                        rounded-full text-white
                        opacity-0 group-hover/carousel:opacity-100
                        hover:bg-cyan-600 hover:border-cyan-500
                        hover:shadow-lg hover:shadow-cyan-500/20
                        transition-all duration-200
                        -translate-x-1/2
                    `}
                    aria-label="Previous"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next button */}
                <button
                    className={`
                        ${nextClass}
                        absolute right-0 top-1/2 -translate-y-1/2 z-20
                        w-9 h-9 flex items-center justify-center
                        bg-gray-900/95 border border-white/10
                        rounded-full text-white
                        opacity-0 group-hover/carousel:opacity-100
                        hover:bg-cyan-600 hover:border-cyan-500
                        hover:shadow-lg hover:shadow-cyan-500/20
                        transition-all duration-200
                        translate-x-1/2
                    `}
                    aria-label="Next"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SectionCarousel;