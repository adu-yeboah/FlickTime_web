import React from 'react'
import './Banner.scss'
import { FiCalendar } from "react-icons/fi";
import { MdOutlineMovieCreation } from "react-icons/md";


function Banner() {
    return (
        <div>

            <div className="banner">
                <div className="container">
                    <div className="bannerWrapper">

                        <div className="banner-image">
                            <img src="./poster-dates.jpg" alt="" className='bannerImage' />
                        </div>

                        <div className="overlay flex-col">

                            <div className="title">
                                movie name
                            </div>

                            <div className="inden flex-item">

                                <div className="ind flex-item">
                                    <span>
                                        <MdOutlineMovieCreation />
                                    </span>
                                    genere
                                </div>

                                <div className="ind flex-item">
                                    <span>
                                        <FiCalendar />
                                    </span>
                                    2007
                                </div>

                            </div>

                            <div className="summary">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ex recusandae\
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ex recusandae
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ex recusandae
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ex recusandae
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner
