import { useContext, useEffect, useRef } from 'react'
import { ApiContext } from '../../context/apiContext'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'


function Tv() {
    const { tv, loadMoreTv, isLoadingMore } = useContext(ApiContext)
    const loader = useRef(null)

    useEffect(() => {
        const currentLoader = loader.current;

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMoreTv();
            }
        }, { threshold: 1.0 });

        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        }
    }, [loadMoreTv]);

    return (
        <div className="bg-[#0b0f1a] min-h-screen">
            <Navbar />

            <div className="section pt-8 pb-4">
                <div className="container mx-auto px-4">
                    <div className="head text-4xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
                        <span className="text-cyan-400">tv</span> shows.
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="cards flex flex-wrap gap-6 justify-center">
                    {
                        tv.map((item, index) => (
                            <Card
                                key={`${item.id}-${index}`}
                                item={item}
                            />
                        ))
                    }
                </div>

                {/* Infinite Scroll Loader */}
                <div ref={loader} className="h-20 flex items-center justify-center my-8">
                    {isLoadingMore && (
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Tv
