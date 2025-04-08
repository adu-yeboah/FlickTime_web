import React from 'react'
import './MovieDetails.scss'
import Navbar from '../../components/navabr/Navbar'
import { FiCalendar } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { useLocation } from 'react-router-dom';



function MovieDetails() {

  // const location  = useLocation()
  // const { item } = location.state?.item



  return (
    <div>
      <Navbar />

      <div className="movieDetails">
        <div className="container">
          <div className="movieDWrapper flex-wrap">

            <div className="image">
              <img src="./images/m-7.jpeg" alt="" />
            </div>

            <div className="description flex-col">
              <div className="title">
                {/* {item.title} */}
              </div>

              <div className="info flex-item">

                <div className="in">
                  <span>
                    <FiCalendar />
                  </span>
                  2005
                </div>

                <div className="in">
                  <span>
                    <FaFilm />
                  </span>
                  2h 3min
                </div>

                <div className="in">
                  <span>
                    <FaRegStar />
                  </span>
                  9.0
                </div>

              </div>

              <div className="genere flex-item">
                <li>action</li>
                <li>romance</li>
                <li>adventure</li>
                <li>sci-fiction</li>
              </div>

              <div className="summary">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium corrupti esse velit ea, asperiores magnam illo
                fugit veniam temporibus error omnis! Sint qui earum iusto?
                Vel nisi adipisci cupiditate temporibus.
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
