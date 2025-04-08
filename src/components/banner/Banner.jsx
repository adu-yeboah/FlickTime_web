import React, { useContext } from 'react';
import './Banner.scss';
import { FiCalendar } from 'react-icons/fi';
import { ApiContext } from '../../context/apiContext';

function Banner() {

      const { popularMovies } = useContext(ApiContext)  
    console.log(popularMovies[0]);
    
  return (
    <div className="banner">
      <div className="container">
        <div className="bannerWrapper">
          <div className="banner-image">
            {/* <img src="./poster-dates.jpg" alt="Movie Poster" className="bannerImage" /> */}
            <img src={`https://image.tmdb.org/t/p/w500${popularMovies[0]?.poster_path}`} alt="Movie Poster" className="bannerImage" />

          </div>

          <div className="overlay flex-col">
            <div className="title">{popularMovies[0]?.original_title}</div>

            <div className="inden flex-item">

              <div className="ind flex-item">
                <span>
                  <FiCalendar />
                </span>
                {popularMovies[0]?.release_date}
              </div>
            </div>

            <div className="summary">
              {popularMovies[0]?.overview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;