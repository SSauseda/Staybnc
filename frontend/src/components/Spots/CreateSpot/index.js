import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import * as spotActions from '../../../store/spots';
import './CreateSpot.css'





export default function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [prevImage1, setPrevImage1] = useState('');
    const [prevImage2, setPrevImage2] = useState('');
    const [prevImage3, setPrevImage3] = useState('');
    const [prevImage4, setPrevImage4] = useState('');
    const [errors, setErrors] = useState([]);


    if (!sessionUser) return <Redirect to={'/'} />

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorsArray = [];
        const images = [prevImage1, prevImage2, prevImage3, prevImage4].filter(Boolean).map((url) => ({
            url,
            preview: false,
        }));

        if (!country) {
            errorsArray.push('Country is required')
        }
        if (!address) {
            errorsArray.push('Address is required')
        }
        if (!city) {
            errorsArray.push('City is required')
        }
        if (!state) {
            errorsArray.push('State is required')
        }
        if (!lat) {
            errorsArray.push('Latitude is required')
        }
        if (!lng) {
            errorsArray.push('Longitude is required')
        }
        if (!description || description.length < 30) {
            errorsArray.push('Description needs a minimum of 30 characters')
        }
        if (!name) {
            errorsArray.push('Name is required')
        }
        if (!price) {
            errorsArray.push('Price is required')
        }
        if (!imageURL) {
            errorsArray.push('Preview image is required')
        }
        if (!imageURL.endsWith('.jpg') && !imageURL.endsWith('.png') && !imageURL.endsWith('.jpeg')) {
            errorsArray.push('Image URL must end in .pgn, .jpg, or .jpeg')
        }
        if (prevImage1 && !prevImage1.endsWith('.jpg') && !prevImage1.endsWith('.png') && !prevImage1.endsWith('.jpeg')) {
            errorsArray.push('invalid image1')
        }
        if (prevImage2 && !prevImage2.endsWith('.jpg') && !prevImage2.endsWith('.png') && !prevImage2.endsWith('.jpeg')) {
            errorsArray.push('invalid image2')
        }
        if (prevImage3 && !prevImage3.endsWith('.jpg') && !prevImage3.endsWith('.png') && !prevImage3.endsWith('.jpeg')) {
            errorsArray.push('invalid image3')
        }
        if (prevImage4 && !prevImage4.endsWith('.jpg') && !prevImage4.endsWith('.png') && !prevImage4.endsWith('.jpeg')) {
            errorsArray.push('invalid image4')
        }

        setErrors(errorsArray);

        if (errorsArray.length === 0) {
         dispatch(
            spotActions.createSpotThunk(
                {
                    name,
                    description,
                    price,
                    address,
                    city,
                    state,
                    country,
                    lat,
                    lng
                },
                {
                    url: imageURL,
                    preview: true,
                },
            )
        )
        .then((spot) => {
            closeModal();
            history.push(`/spots/${spot.id}`);
        })
        .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        })
        }   
    }
 

    return (
        <>
        <div className="title">
            <h1 className="formHeader">Create a new Spot</h1>
            <h2>where is your place located?</h2>
            <h4>Guests will only get your exact address once they have booked a reservation.</h4>
        </div>
        <div className="form">
            <form className="newSpot">
            <div className="userInput">
                <label>Country</label>
                <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                required />

                {errors.includes('Country is required') && (
                    <span className="errors-message">Country is required</span>
                )}

                <label>Street Address</label>
                <input 
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Street Address"
                />

                {errors.includes('Address is required') && (
                    <span className="errors-message">Address is required</span>
                )}

                <label>City</label>
                <input 
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="City"
                />

                {errors.includes('City is required') && (
                    <span className="errors-message">City is required</span>
                )}

                <label>, State</label>
                <input 
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder="STATE"
                />

                {errors.includes('State is required') && (
                    <span className="errors-message">State is required</span>
                )}

                <label>Latitude</label>
                <input 
                type='text'
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
                />

                {errors.includes('Latitude is required') && (
                    <span className="errors-message">Latitude is required</span>
                )}

                <label>, Longitude</label>
                <input 
                type='text'
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
                />

                {errors.includes('Longitude is required') && (
                    <span className="errors-message">Longitude is required</span>
                )}
                </div>
{/* ****************************************************************************************** */}
                <h2>Describe your place to guests</h2>
                <h4>Mention the best features of your space, any special amentities like fast wifi or parking,
                    and what you love about the neightborhood.
                </h4>
                <textarea
                rows='10'
                cols='50'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Please write at least 30 characters"
                >
                </textarea>
                    {errors.includes('Description needs a minimum of 30 characters') && (
                    <span className="errors-message">Description needs a minimum of 30 characters</span>)}
{/* ****************************************************************************************** */}      
                <h2>Create a title for your spot</h2>
                <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
                <input 
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name for your spot"
                />
                {errors.includes('Name is required') && (
                    <span className="errors-message">Name is required</span>
                )}
{/* ****************************************************************************************** */}
                <h2>Set a base price for your spot</h2>
                <h4>Competitive pricing can help your listings stand out and rank higher in search results.</h4>             
                <span>${" "}</span>
                <input 
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Price per night (USD)"
                />
                {errors.includes('Price is required') && (
                    <span className="errors-message">Price is required</span>
                )}
{/* ****************************************************************************************** */}
                <h2>Liven up your spot with photos</h2>
                <h4>Submit a link to at least one photo to publish your spot</h4>
                <input 
                type='url'
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                required
                placeholder="Preview Image URL"
                />      
                   {errors.includes('Preview image is required') && (
                    <span className="errors-message">Preview image is required</span>
                )}
                <input 
                type='url'
                value={prevImage1}
                onChange={(e) => setPrevImage1(e.target.value)}
                placeholder="Image URL"
                />
                {errors.includes('invalid image1') && (
                    <span className="errors-message">Image URL must end in .pgn, .jpg, or .jpeg</span>
                )}
                <input 
                type='url'
                value={prevImage2}
                onChange={(e) => setPrevImage2(e.target.value)}
                placeholder="Image URL"
                /> 
                {errors.includes('invalid image2') && (
                    <span className="errors-message">Image URL must end in .pgn, .jpg, or .jpeg</span>
                )}
                <input 
                type='url'
                value={prevImage3}
                onChange={(e) => setPrevImage3(e.target.value)}
                placeholder="Image URL"
                /> 
                {errors.includes('invalid image3') && (
                    <span className="errors-message">Image URL must end in .pgn, .jpg, or .jpeg</span>
                )}
                <div>
                 <input 
                    type='url'
                    value={prevImage4}
                    onChange={(e) => setPrevImage4(e.target.value)}
                    placeholder="Image URL"
                    />  
                    {errors.includes('invalid image4') && (
                    <span className="errors-message">Image URL must end in .pgn, .jpg, or .jpeg</span>
                    )}  
                    </div>
                <button className="createSpotButton" type='submit' onClick={handleSubmit}>Create Spot</button>
            </form>
        </div>
        </>
    )
}
