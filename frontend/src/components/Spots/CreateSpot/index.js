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
        if (lat && isNaN(lat) === true) {
            errorsArray.push('Latitude must be a number')
        }
        if (!lng) {
            errorsArray.push('Longitude is required')
        }
        if (lng && isNaN(lng) === true) {
            errorsArray.push('Longitude must be a number')
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
        if (price && isNaN(price) === true) {
            errorsArray.push('Price must be a number')
        }
        if (!imageURL) {
            errorsArray.push('Preview image is required')
        }
        // if (imageURL && (!imageURL.endsWith('.jpg') || !imageURL.endsWith('.png') || !imageURL.endsWith('.jpeg'))) {
        //     errorsArray.push('invalid previewImage')
        // }
        // if (prevImage1 && (!prevImage1.endsWith('.jpg') && !prevImage1.endsWith('.png') && !prevImage1.endsWith('.jpeg'))) {
        //     errorsArray.push('invalid image1')
        // }
        // if (prevImage2 && (!prevImage2.endsWith('.jpg') && !prevImage2.endsWith('.png') && !prevImage2.endsWith('.jpeg'))) {
        //     errorsArray.push('invalid image2')
        // }
        // if (prevImage3 && (!prevImage3.endsWith('.jpg') && !prevImage3.endsWith('.png') && !prevImage3.endsWith('.jpeg'))) {
        //     errorsArray.push('invalid image3')
        // }
        // if (prevImage4 && (!prevImage4.endsWith('.jpg') && !prevImage4.endsWith('.png') && !prevImage4.endsWith('.jpeg'))) {
        //     errorsArray.push('invalid image4')
        // }

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
                images
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
        <div className="create-spot-container">
            <div className="form-container">
                <div className="form">
                    <form noValidate className="new-spot" onSubmit={handleSubmit}>
                        <div className="location-section">
                            <h1 className="title"> Create a new Spot</h1>
                            <div className="location-info">
                                <h2 className="form-heading">Where's your place located?</h2>
                                <p className="form-subheading">Guests will only get your exact address once they booked a reservation.</p>
                                <div className="location-inputs"> 
                                <label htmlFor="country">Country</label>
                                <input
                                className="country-input"
                                type="text"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                placeholder="Country"
                                required
                                />
                                {errors.includes('Country is required') && (
                                    <span className="errors-message">Country is required</span>
                                )}

                                <label htmlFor="address">Street Address</label>
                                <input
                                className="address-input"
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder="Address"
                                required
                                />
                                {errors.includes('Address is required') && (
                                    <span className="errors-message">Address is required</span>
                                )}
                                </div>
                                <div className="city-state">
                                    <label htmlFor="city" className="city">City</label>
                                    <input
                                    className="city-input"
                                    type="text"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    placeholder="City"
                                    required
                                    />
                                    {errors.includes('City is required') && (
                                        <span className="errors-message">City is required</span>
                                    )}

                                    <label htmlFor="state" className="state">State</label>
                                    <input
                                    className="state-input"
                                    type="text"
                                    value={state}
                                    onChange={e => setState(e.target.value)}
                                    placeholder="State"
                                    required
                                    />
                                    {errors.includes('State is required') && (
                                        <span className="errors-message">State is required</span>
                                    )}
                                </div>
                                <div className="lat-lng">
                                    <label className="lat" htmlFor="lat">Latitude</label>
                                    <input
                                    className="lat-input"
                                    type='text'
                                    value={lat}
                                    onChange={e => setLat(e.target.value)}
                                    placeholder="Latitude"
                                    required
                                    />
                                    {errors.includes('Latitude is required') && (
                                        <span className="errors-message">Latitude is required</span>
                                    )}
                                    {errors.includes('Latitude must be a number') && (
                                        <span className="errors-message">Latitude must be a number</span>
                                    )}
                                    <label htmlFor="lng" className="lng">Longitude</label>
                                    <input
                                    className="lng-input"
                                    type="text"
                                    value={lng}
                                    onChange={e => setLng(e.target.value)}
                                    placeholder="Longitude"
                                    required
                                    />
                                    {errors.includes('Longitude is required') && (
                                        <span className="errors-message">Longitude is required</span>
                                    )}
                                    {errors.includes('Longitude must be a number') && (
                                        <span className="errors-message">Longitude must be a number</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="description-section">
                            <h2 className="form-heading">Describe your place to guests</h2>
                            <p className="form-subheading">
                                mention the best features of your space, any special amentities 
                                like fast wifi or parking, and what you love about the neighborhood.</p>
                                <textarea
                                className="description-input"
                                type='text'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Please write at least 30 characters."
                                required
                                ></textarea>
                                {errors.includes('Description needs a minimum of 30 characters') && (
                                    <span className="errors-message">Description needs a minimum of 30 characters</span>
                                )}
                        </div>
                        <hr />
                        <div className="create-title-section">
                            <h2 className="form-heading">Create a title for your spot</h2>
                            <p className="form-subheading">
                                Catch guests' attention with a spot title that highlights what makes your place special.
                            </p>
                            <input
                            className="name-input"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Name of your spot"
                            required
                            />
                            {errors.includes('Name is required') && (
                                <span className="errors-message">Name is required</span>
                            )}
                        </div>
                        <hr />
                        <div className="price-section">
                            <h2 className="form-heading">Set a base price for your spot</h2>
                            <p className="form-subheading">Competitive pricing can help your listing stand out and rank higher in search results.</p>
                            <div className="price">
                                <p>$</p>
                                <input
                                className="price-input"
                                type="text"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Price per night (USD)"
                                required
                                />
                                {errors.includes('Price is required') && (
                                    <span className="errors-message">Price is required</span>
                                )}
                                {errors.includes('Price must be a number') && (
                                    <span className="errors-message">Price must be a number</span>
                                )}
                            </div>
                        </div>
                        <hr />
                        <div className="photo-section">
                            <h2 className="form-heading">Liven up your spot with photos</h2>
                            <p className="form-subheading">Submit a link to at least one photo to publish your spot.</p>
                            <input 
                            className="image-input"
                            type="url"
                            value={imageURL}
                            onChange={e => setImageURL(e.target.value)}
                            placeholder="Preview Image URL"
                            required
                            />
                            {errors.includes('Preview image is required') && (
                                <span className="errors-message">Preview image is required</span>
                            )}
                            <input
                            className="img-input"
                            type='url'
                            value={prevImage1}
                            onChange={e => setPrevImage1(e.target.value)}
                            placeholder="Image URL"
                            // required
                            />

                            <input
                            className="img-input"
                            type='url'
                            value={prevImage2}
                            onChange={e => setPrevImage2(e.target.value)}
                            placeholder="Image URL"
                            // required
                            />

                            <input
                            className="img-input"
                            type='url'
                            value={prevImage3}
                            onChange={e => setPrevImage3(e.target.value)}
                            placeholder="Image URL"
                            // required
                            />

                            <input
                            className="img-input"
                            type='url'
                            value={prevImage4}
                            onChange={e => setPrevImage4(e.target.value)}
                            placeholder="Image URL"
                            // required
                            />

                        </div>
                        <button className="submit-create-spot-button" type="submit" onClick={handleSubmit}>Create Spot</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
