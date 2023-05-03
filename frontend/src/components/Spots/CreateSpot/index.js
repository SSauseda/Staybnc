import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";





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
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);


    if (!sessionUser) return <Redirect to={'/'} />
 

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

                <label>Street Address</label>
                <input 
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Street Address"
                />

                <label>City</label>
                <input 
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="City"
                />

                <label>, State</label>
                <input 
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder="STATE"
                />

                <label>Latitude</label>
                <input 
                type='text'
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
                />

                <label>, Longitude</label>
                <input 
                type='text'
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
                />
                </div>
{/* ****************************************************************************************** */}
                <h2>Descripe your place to guests</h2>
                <h4>Mention the best features of your space, any special amentities like fast wifi or parking,
                    and what you love about the neightborhood
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
                <button>Create Spot</button>
            </form>
        </div>
        </>
    )
}
