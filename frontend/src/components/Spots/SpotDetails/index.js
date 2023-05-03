import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { spotDetailThunk, getSpotsThunk} from "../../../store/spots";


export default function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    const spot = useSelector((state) => state.spot.spotDetails);
    // console.log("SPOTPSOTPSOT", spot)

    useEffect(() => {
        dispatch(spotDetailThunk(spotId))
        .then(() => setIsLoaded(true));
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getSpotsThunk());
    }, [dispatch])

    if (!spot) return null;
    if (!isLoaded) return null;

    const spotImg = spot?.SpotImages;
    // console.log("STPOSTPOIAMGEIAMGE",spotImg)


    return (
        <div>
         <div className="spotDetail-container">
             <div className="spotName">
                 <h1>{spot.name}</h1>
             </div>
             <div className="spotInfo">
                 {/* <i class="fa-solid fa-star"></i>
                    {Number(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'No Reviews'}
                         {" "}- {spot.numReviews} review(s) -  */}
                         {spot.city}, {spot.state}, {spot.country}
             </div>
             <div className="spotImages">
                <div className="primaryImg">
                    <img src={spotImg[0].url} alt='primaryImage' className="primaryImage"/>
                </div>
             </div>
                {spot.description}
         </div>
         </div>
    )
}

