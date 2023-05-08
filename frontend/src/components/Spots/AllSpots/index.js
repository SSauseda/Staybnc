import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";
import "./AllSpots.css";

export default function AllSpots() {
  const spots = useSelector(state => state.spot.spots)
  // const spots = useSelector((state) => state.spot.allSpots);
  // console.log("TESTTESTTEST SPOTS", typeof spots)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  
  if (!spots) return null;
  const allOfSpots = Object.values(spots);
  console.log("TESTTESTTEST", allOfSpots)

  const clickHandler = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  return (
    <div className="allSpots-container">
      {allOfSpots[0].map((spot) => {
        return (
          <div
            className="spot"
            key={spot.id}
            onClick={() => clickHandler(spot.id)}
          >
            <div className="previewImg">
              <img
                className="spot-img"
                src={spot.previewImage}
                alt={`${spot.name}`}
              />
            </div>
            <div className="spot-container">
              <p className="location">
                {spot.city}, {spot.state}{" "}
                <span className="stars">
                <i className="fa-solid fa-star"></i>
                  {Number(spot.avgRating)
                    ? Number(spot.avgRating).toFixed(1)
                    : "0"}
                </span>
              </p>

              <p className="spot-name">{spot.name}</p>
              <p className="price">
                <span className="spot-price">${spot.price}</span> night
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
