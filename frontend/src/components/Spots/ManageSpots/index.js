import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../../store/spots'
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ManageSpots() {
    const history = useHistory();
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spot.spots)
    const sessionUser = useSelector(state => state.session.user)

    const allSpots = spots?.Spots ? Object.values(spots.Spots) : []

    let currentUserSpots;
    if (sessionUser){
        currentUserSpots = allSpots.filter(spot => spot.ownerId === sessionUser.id)
    } else {
        history.push('/')
    }
let OpenModalButton
    console.log("TESTTESTTEST", currentUserSpots);
    return spots && (
        <div>
            <h1>Manage Your Spots</h1>


            {currentUserSpots.length === 0 ? (

                <Link to='/spots/new'>
                    <button>Create a New Spot</button>
                </Link>
            ) : null}

            <div className="spots-container">
            {currentUserSpots.map(spot => (
                
                <Link to={`/spots/${spot.id}`} className="spot-link" key={spot.id}> 


                <div className="spot-card" key={spot.id} data-spot-name={spot.name}>
                        <img className='spots-image' src={spot.previewImage} alt={spot.name} style={{ height:  '300px'}} />
                        

                    <div className="card-text">
                        <p>{spot.city}, {spot.state}</p>
                        {isNaN(spot.avgRating) ? <div className="stars-container"><p className="fa-solid fa-star">New</p></div> : <div className="stars-container"><p className="fa-solid fa-star">{spot.avgRating}</p></div>}
                        <p>${spot.price} night</p>
                    </div>

                    <div className="update-delete">
                    <Link to={`/spots/${spot.id}/edit`}>
                        <button>Update</button>

                    </Link>
                    
                    </div>
                        
                </div>
                </Link>
            ))}
            </div>
        </div>

    )
}
