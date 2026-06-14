import Navbar from '../../../components/Navbar';

function HomeSkeleton() {
    return (
        <div className="bg-[#0b0f1a] min-h-screen overflow-x-hidden">
            <Navbar />
            
            {/* Banner Skeleton */}
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-4 w-full">
                <div className="w-full h-[70vh] md:h-[80vh] bg-gray-800/50 animate-pulse rounded-2xl"></div>
            </div>

            <div className="pb-12 mt-12">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="flex flex-col gap-10 lg:gap-14">
                        {/* Section Skeletons */}
                        {[1, 2, 3].map((section) => (
                            <div key={section} className="mb-12 lg:mb-16">
                                {/* Section Header Skeleton */}
                                <div className="flex items-center gap-3 mb-6 md:mb-8">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800/50 animate-pulse"></div>
                                    <div className="h-8 w-48 bg-gray-800/50 rounded animate-pulse"></div>
                                </div>

                                {/* Carousel Skeleton */}
                                <div className="flex gap-4 md:gap-6 overflow-hidden">
                                    {[1, 2, 3, 4, 5, 6].map((card) => (
                                        <div key={card} className="w-[150px] sm:w-[180px] md:w-[200px] flex-shrink-0 animate-pulse">
                                            <div className="w-full aspect-[2/3] bg-gray-800/50 rounded-xl mb-3"></div>
                                            <div className="h-4 bg-gray-800/50 rounded mb-2 w-3/4"></div>
                                            <div className="h-3 bg-gray-800/50 rounded w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSkeleton;
