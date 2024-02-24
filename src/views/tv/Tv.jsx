import React, { useContext } from 'react'
import { ApiContext } from '../../context/apiContext'
import Navbar from '../../components/navabr/Navbar'
import Card from '../../components/card/Card'

function Tv() {

    const { tv } = useContext(ApiContext)

    return (
        <div>
            <Navbar />

            <div className="section">
                <div className="container">
                    <div className="head">
                        tv shows.
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="cards flex-wrap">
                    {
                        tv.map((item) => (
                            <Card key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>


            <div className="pagination flex-item">

            </div>
        </div>
    )
}

export default Tv
