import './Index.scss'
import Navbar from '../../components/navabr/Navbar'
import Banner from '../../components/banner/Banner'
import Card from '../../components/card/Card'
import { useContext } from 'react'
import { ApiContext } from '../../context/apiContext'
import { Link } from 'react-router-dom'
// import Swiper from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


function Index() {
    const { upcomingMovies, movies, popularMovies, tv } = useContext(ApiContext)  
    // console.log(data)
  
    return (
        <div>
            <Navbar />
            <Banner />



            {/* trending */}
            <div className="section">
                <div className="container">
                    <div className="head">
                        trending.
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="cards flex-wrap">

                    <Swiper
                        slidesPerView={6}
                        spaceBetween={30}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper flex-item"
                    >

                        {
                            popularMovies.map((item) => (
                                <SwiperSlide key={item.id}>
                                    
                                    <Link to={{pathname:'/movie_details', state: {item} }}>
                                        <Card key={item.id} item={item} />
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>


            {/* movies */}


            <div className="section">
                <div className="container">
                    <div className="head">
                        movies.
                    </div>
                </div>
            </div>

            
            <div className="container">
                <div className="cards flex-wrap">

                    <Swiper
                        slidesPerView={6}
                        spaceBetween={30}
                        // autoplay={{
                        //     delay: 5000,
                        //     disableOnInteraction: false,
                        // }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper flex-item"
                    >

                        {
                            movies.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <Link to={{ pathname:'/movie_details', state:{item}}}>
                                        <Card key={item.id} item={item} />
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>



            {/* tv-shows */}

            <div className="section">
                <div className="container">
                    <div className="head">
                        tv-shows.
                    </div>
                </div>
            </div>

            
            <div className="container">
                <div className="cards flex-wrap">

                    <Swiper
                        slidesPerView={6}
                        spaceBetween={30}
                        // autoplay={{
                        //     delay: 5000,
                        //     disableOnInteraction: false,
                        // }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper flex-item"
                    >

                        {
                            tv.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <Link to={{ pathname:'/movie_details', state:{item}}}>
                                        <Card key={item.id} item={item} />
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>


            {/* up coming */}


            <div className="section">
                <div className="container">
                    <div className="head">
                        up coming.
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="cards flex-wrap">

                    <Swiper
                        slidesPerView={6}
                        spaceBetween={30}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper flex-item"
                    >

                        {
                            upcomingMovies.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <Link to={{ pathname:'/movie_details', state:{item}}}>
                                        <Card key={item.id} item={item} />
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>


        </div>
    )
}

export default Index
