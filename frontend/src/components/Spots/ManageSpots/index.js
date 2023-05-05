import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";
import { updateSpotThunk } from "../../../store/spots";
import { spotDetailThunk } from "../../../store/spots"; 
import { NavLink, Link } from "react-router-dom";
import OpenModalButton from '../../OpenModalButton'
import EditSpotForm from "../UpdateSpot";


// export default function ManageSpots() {
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const [isLoaded, setIsLoaded] = useState(false);
//     const [currentUserSpots, setCurrentUserSpots] = useState(false);
//     // const [createSpot, setCreateSpot] = useState(false)
//     // const [isCreateSpotOpen, setIsCreateSpotOpen] = useState(false)
//     // const [spotToDelete, setSpotToDelete] = useState(null)
//     // const [deleteModalOpen, setDeleteModalOpen] = useState(false)
//     // const [showOverlay, setShowOverlay] = useState(false)


//     const spots = useSelector((state) => state.spot.spots);
//     const sessionUser = useSelector(state => state.session.user);

//     const allSpots = spots.Spots ? Object.values(spots.Spots) : []
    
//     // console.log("USER SPOTS", userSpots)

//     // Redirect to specific spots details
//     const spotDetails = (e, spotId) => {
//         e.preventDefault();
//         history.push(`/spots/${spotId}`)
//     }

//     const editSpot = async (e, spotId) => {
//         e.preventDefault();
//         await dispatch(spotDetails(spotId))
//         .then(() => history.push(`/spots/${spotId}/edit`))
//     }

//     let userSpots;
//     if (sessionUser) {
//         userSpots = allSpots.filter(spot => spot.ownerId === sessionUser.id)
//     } else {
//         history.push('/')
//     }

//     useEffect(() => {
//         dispatch(getSpotsThunk())
//         setIsLoaded(true)
//     }, [dispatch])

//     const handleSpotDeleted = (deletedSpotId) => {
//         setCurrentUserSpots(allSpots.filter((spot) => spot.id !== deletedSpotId))
//     }

//     return isLoaded && (
//         <>
//         <div id='manage-header' className='manage-header'>
//             <h1>Manage Spots</h1>
//         </div>
//         <div className='no-current-spots'>
//             {/* <button className="manage-create">
//                     <Link to='/host'>
//                     Create a New Spot
//                     </Link>
//             </button> */}
//             {allSpots.length === 0 ? (
//                 <>
//                     <p>Looks like you don't have any spots yet! Would you like to create one?</p>
//                     <button className='manage-create-spot'>
//                         <NavLink to='/spots/new'>
//                             Create a New Spot
//                         </NavLink>
//                     </button>
//                 </>
//             ) : null}
//         </div>
//         <div className='landing-container'>
//             {allSpots.map((spot) => {
//                 return (
//                     <div key={spot.id} className="spot-card">
//                         <div onClick={(e) => {spotDetails(e, spot.id)}}>
//                         <div className='spot-card-img'>
//                             <img className="spot-image" src={spot.previewImage} alt={spot.name} />
//                         </div>
//                         <div className="spot-info">
//                             <div className='location-stars'>
//                                 <p className='location'>
//                                     {spot.city}, {spot.state}
//                                 </p>
//                                 <div className='stars'>
//                                     *
//                                     {/* {Number(spot.avgRating).toFixed(1) ? Number(spot.avgRating).toFixed(1) : "New"} */}
//                                     {spot.avgRating > 0 ? Number(spot.avgRating).toFixed(1) : "New"}
//                                 </div>
//                             </div>
//                                 <div className="price">
//                                     <span className="location-price">${spot.price}</span>night
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="manage-buttons">
//                             <Link to={`/spots/${spot.id}/edit`}>
//                                 <button type='button'>Update</button>
//                             </Link>
//                             <OpenModalButton
//                                 className='modal-button'
//                                 buttonText='Delete'
//                                 modalComponent={<EditSpotForm
//                                     spot={spot}
//                                     onSpotDeleted={handleSpotDeleted}
//                                 />}
//                             />
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//         </>
//     )
// }


export default function ManageSpots() {

    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots)
    const currentUser = useSelector((state) => state.session.user)

    // const userSpots = spots.filter((spot) => currentUser.id === spot.ownerId)

    console.log("SPOTS", spots)
    console.log('currentUser', currentUser)
    // console.log('userSpots', userSpots)
    return (
        <h1>TEST</h1>
    )
}

