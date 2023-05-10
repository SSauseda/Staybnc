import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getReviewsThunk } from "../../../store/reviews";
import './SpotDetails.css'
import SpotReviews from "../Reviews/SpotReviews";
import { createReviewThunk } from "../../../store/reviews";

import { spotDetailThunk, getSpotsThunk} from "../../../store/spots";


export default function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')

    const sessionUser = useSelector((state) => state.session.user);

    const spot = useSelector((state) => state.spot.spotDetails);
    // console.log("SPOTPSOTPSOT", spot)

    useEffect(() => {
        dispatch(spotDetailThunk(spotId))
        .then(() => setIsLoaded(true));
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
        .then(() => setIsLoaded(true));
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getSpotsThunk());
    }, [dispatch])

    const createNewReview = async (e, review, stars) => {
        e.preventDefault();

        await dispatch(createReviewThunk({ review, stars }, spotId)).catch(
            async response => {
                const errors = []
                const data = await response.json();

                if (data && data.errors) {
                 errors = data.errors
                 console.log("errorserrors", errors)
                }
            }
        )
        await dispatch(spotDetailThunk(spotId)).then(() => 
        dispatch(getReviewsThunk(spotId))
        )
        setIsLoaded(true)
    }

    if (!spot) return null;
    if (!isLoaded) return null;

    const spotImg = spot.SpotImages;
    console.log("STPOSTPOIAMGEIAMGE",spotImg)




    return (
    <div className="spot-details-container">
        <div className="spot-details">
            <div className="spot-deatils-header">
                <h1 className="spot-name">{spot.name}</h1>
                <div className="spot-locaiton">
                    {spot.city}, {spot.state}, {spot.country}
                </div>
            </div>
            <div className="grid-container">
                <div className="spot-images">
                    <img
                    src={spotImg[0].url}
                    key={spotImg[0].id}
                    alt='primaryImage'
                    className="primary-image"
                    />
                </div>
                <div className="other-image-grid">
                    Coming soon!
                </div>
            </div>
            <h2 className="Hosted-text">
                Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
            </h2>
            <div className="description">
                <div className="spot-description">
                    {spot.description}
                </div>
                <div>
                    Reservation box
                    <div className="spot-price-box">
                        <div className="spot-price">
                            ${spot.price}/night
                            <div className="stars-reviews-box">
                                {Number(spot.avgStarRating) ? (
                                    <>
                                    <div className="spot-stars">
                                        <p>★</p>
                                        <div>{Number(spot.avgStarRating).toFixed(1)}</div>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                    <div className="spot-stars-new">
                                        <p>★</p>
                                        <div className="new-stars">New</div>
                                    </div>
                                    </>
                                )}
                                {spot.numReviews > 0 ? (
                                    <p className="dot">·</p>
                                ) : (
                                    <p className="white-space"></p>
                                )}
                                <div className="num-reviews">
                                    {spot.numReviews > 0 ? (
                                        <div className="num-reviews">
                                            {spot.numReviews === 1 ? '1 Review' : `${spot.numReviews} Reviews`}
                                        </div>
                                    ) : (
                                        <br></br>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="spot-reserve">
                            <button
                            className="reserve-button"
                            onClick={() => alert('Feature coming soon!')}
                            >
                                Reserve
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <SpotReviews createNewReview={createNewReview}/>
            </div>
        </div>

    </div>
    )
}


