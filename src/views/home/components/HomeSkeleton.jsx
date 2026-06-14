import Navbar from '../../../components/Navbar';

/* Shimmer keyframe injected once */
const shimmerStyle = `
@keyframes shimmer {
    0%   { background-position: -700px 0; }
    100% { background-position:  700px 0; }
}
.skeleton-shimmer {
    background: linear-gradient(
        90deg,
        rgba(255,255,255,0.03) 0%,
        rgba(255,255,255,0.08) 40%,
        rgba(255,255,255,0.03) 80%
    );
    background-size: 700px 100%;
    animation: shimmer 1.6s infinite linear;
}
`;

function SkeletonBlock({ className = '' }) {
    return <div className={`skeleton-shimmer rounded-xl ${className}`} />;
}

function HomeSkeleton() {
    return (
        <div className="bg-[#0b0f1a] min-h-screen overflow-x-hidden">
            <style>{shimmerStyle}</style>
            <Navbar />

            {/* Banner skeleton */}
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-4">
                <div className="relative w-full h-[60vh] md:h-[75vh] rounded-2xl overflow-hidden">
                    <SkeletonBlock className="absolute inset-0 rounded-2xl" />
                    {/* Fake bottom content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col gap-3">
                        <SkeletonBlock className="h-8 w-2/3 md:w-1/3" />
                        <SkeletonBlock className="h-4 w-1/2 md:w-1/4" />
                        <SkeletonBlock className="h-4 w-3/4 md:w-2/5" />
                        <div className="flex gap-3 mt-2">
                            <SkeletonBlock className="h-10 w-32 rounded-full" />
                            <SkeletonBlock className="h-10 w-28 rounded-full" />
                        </div>
                    </div>
                    {/* Gradient fade for realism */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a]/90 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Sections */}
            <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-14 pb-16">
                <div className="flex flex-col gap-14">
                    {[1, 2, 3, 4].map((section) => (
                        <div key={section}>
                            {/* Section header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <SkeletonBlock className="w-10 h-10 rounded-lg flex-shrink-0" />
                                    <SkeletonBlock className="h-6 w-36 md:w-52" />
                                </div>
                                <SkeletonBlock className="h-4 w-16 hidden sm:block" />
                            </div>

                            {/* Cards row */}
                            <div className="flex gap-4 md:gap-5 overflow-hidden">
                                {[1, 2, 3, 4, 5, 6, 7].map((card) => (
                                    <div
                                        key={card}
                                        className="flex-shrink-0 w-[130px] sm:w-[155px] md:w-[175px]"
                                        style={{ opacity: 1 - card * 0.1 }}
                                    >
                                        <SkeletonBlock className="w-full aspect-[2/3] mb-2.5" />
                                        <SkeletonBlock className="h-3 w-4/5 mb-1.5" />
                                        <SkeletonBlock className="h-2.5 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeSkeleton;