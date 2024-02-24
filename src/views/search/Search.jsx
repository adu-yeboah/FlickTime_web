import React, { useState } from 'react'
import './Search.scss'
import Navbar from '../../components/navabr/Navbar'
import apiDetails from '../../api/movieAPi'
import Card from '../../components/card/Card'

function Search() {

  const [input, setInput] = useState("")
  const [data, setData] = useState([])

  const fetchData = (value) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${apiDetails.api_key}`)
        .then(res => res.json())
        .then(data => setData(data.results))
  }


  const handleChange = (value) => {
    setInput(value)
    fetchData(value)
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="filter flex-item">
          <div className="section t">
            <div className="head">
              {
                input? input : "search..."
              }
              
            </div>
          </div>

          <input 
          type="text" 
          placeholder='search...' 
          className='search' 
          value= {input}
          onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>

      
      <div className="container">
        <div className="cards flex-wrap">
          {
            data.map((item) => (
              <Card key={item.id} item={item}/>
            ))
          }
        </div>
      </div>




    </div>
  )
}

export default Search
