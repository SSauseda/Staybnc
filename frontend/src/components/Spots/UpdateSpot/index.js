// import { useDispatch, useSelector } from "react-redux"
// import { useState, useEffect } from "react";
// import * as spotActions from '../../../store/spots';
// import { updateSpotThunk } from "../../../store/spots";
// import { useModal } from "../../../context/Modal";
// import { Redirect, useHistory } from "react-router-dom";


// export default function EditSpotForm() {
//     const sessionUser = useSelector(state => state.session.user);
//     const spot = useSelector(state => state.spot.spotDetails);
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { closeModal } = useModal();


//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [address, setAddress] = useState('');
//     const [city, setCity] = useState('');
//     const [state, setState] = useState('');
//     const [country, setCountry] = useState('');
//     const [lat, setLat] = useState('');
//     const [lng, setLng] = useState('');
//     const [imageURL, setImageURL] = useState('');
//     const [prevImage1, setPrevImage1] = useState('');
//     const [prevImage2, setPrevImage2] = useState('');
//     const [prevImage3, setPrevImage3] = useState('');
//     const [prevImage4, setPrevImage4] = useState('');
//     const [errors, setErrors] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const errorsArray = []
//         const images = [prevImage1, prevImage2, prevImage3, prevImage4].filter(Boolean).map((url) => ({
//             url,
//             preview: false
//         }))

//       if (errorsArray.length === 0) {
//         dispatch(
//             spotActions.updateSpotThunk(spot.id, {
//                 name,
//                 description,
//                 price,
//                 address,
//                 city,
//                 state,
//                 country,
//                 lat,
//                 lng,
//             }, {
//                 url: imageURL,
//                 preview: true
//             },
//                 images
//             )
//         )
//         .then(updatedSpot => {
//             closeModal();
//             history.push(`/spots/${updatedSpot.id}`)
//         })
//         .catch(async res => {
//             const data = await res.json();
//             if (data && data.errors) setErrors(data.errors);
//         })
//     }  
// }

// if (!spot) return null;
// if (!sessionUser) return <Redirect to={'/'}/>
    

//     return (
//         <div>
//             <h1>TEST TEST TEST</h1>
//             <form>
//             </form>
//         </div>

//     )
// }
