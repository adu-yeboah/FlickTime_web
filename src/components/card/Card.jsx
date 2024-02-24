import React from 'react'
import './Card.scss'

function Card({ item }) {
    return (
        <div>

            <div className="cardContainer flex-col">
                <div className="card">
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                    <div className="rating">
                        {item.vote_average}
                    </div>
                </div>
                <div className="title">
                    {item.title}
                </div>
            </div>

        </div>
    )
}

export default Card
