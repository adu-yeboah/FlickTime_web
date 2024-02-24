import React, { useContext } from 'react'
import './Movies.scss'
import Navbar from '../../components/navabr/Navbar'
import Card from '../../components/card/Card'
import { ApiContext } from '../../context/apiContext'


function Movies() {

  const { movies } = useContext(ApiContext)
  return (
    <div>
      <Navbar />

      <div className="section">
        <div className="container">
          <div className="head">
            movies.
          </div>
        </div>
      </div>


      <div className="container">
        <div className="cards flex-wrap">
          {
            movies.map((item) => (
              <Card key={item.id} item={item}/>
            ))
          }
        </div>
      </div>


      <div className="pagination flex-item">

      </div>
    </div>
  )
}

export default Movies
