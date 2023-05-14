import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import * as spotActions from '../../../store/spots';
import { Redirect, useHistory, useParams } from "react-router-dom";
import './UpdateSpot.css'


export default function EditSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spot.spotDetails);
    const { spotId } = useParams();
    const preview = spot?.SpotImages?.find(image => image.preview)
    const previewUrl = preview?.url
    


    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [lat, setLat] = useState(spot?.lat);
    const [lng, setLng] = useState(spot?.lng);
    const [imageURL, setImageURL] = useState(previewUrl);
    const [errors, setErrors] = useState([]);
    const [prevImage1, setPrevImage1] = useState('');
    const [prevImage2, setPrevImage2] = useState('');
    const [prevImage3, setPrevImage3] = useState('');
    const [prevImage4, setPrevImage4] = useState('');
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorsArray = []
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
        if (!imageURL) {
            errorsArray.push('Preview image is required')
        }

        setErrors(errorsArray);
        console.log("ERRORS", typeof errors)

        if (errorsArray.length === 0) {
            dispatch(
                spotActions.updateSpotThunk(
                    spot.id,{
                    name,
                    description,
                    price,
                    address,
                    city,
                    state,
                    country,
                    lat,
                    lng,
                },
                {
                    url: imageURL,
                    preview: true
                },
                images
                )
            ).then((updatedSpotData) => {
                history.push(`/spots/${updatedSpotData.id}`);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        }
    }

    useEffect(() => {
        dispatch(spotActions.spotDetailThunk(spotId));
    }, [dispatch, spotId])


if (!spot) return null;
if (!sessionUser) return <Redirect to={'/'}/>
    

    return (
        <div className="create-spot-container">
        <div className="form-container">
            <div className="form">
                <form className="new-spot" onSubmit={handleSubmit}>
                    <div className="location-section">
                        <h1 className="title">Update your Spot</h1>
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
                                )},
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
                                )},
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
                        required
                        />
                        {/* {errors.includes('invalid image1') && (
                            <span className="errors-message">Image URL must end in .pgn, .jpg, or .jpeg</span>
                        )} */}
                        <input
                        className="img-input"
                        type='url'
                        value={prevImage2}
                        onChange={e => setPrevImage2(e.target.value)}
                        placeholder="Image URL"
                        required
                        />
                        {/* {errors.includes('invalid image2') && (
                            <span className="errors-message">Image URL must end in .pgn, .jpg, or .jpeg</span>
                        )} */}
                        <input
                        className="img-input"
                        type='url'
                        value={prevImage3}
                        onChange={e => setPrevImage3(e.target.value)}
                        placeholder="Image URL"
                        required
                        />
                        {/* {errors.includes('invalid image3') && (
                            <span className="errors-message">Image URL must end in .pgn, .jpg, or .jpeg</span>
                        )} */}
                        <input
                        className="img-input"
                        type='url'
                        value={prevImage4}
                        onChange={e => setPrevImage4(e.target.value)}
                        placeholder="Image URL"
                        required
                        />
                        {/* {errors.includes('invalid image4') && (
                            <span className="errors-message">Image URL must end in .pgn, .jpg, or .jpeg</span>
                        )} */}
                    </div>
                    <button className="submit-create-spot-button" type="submit" onClick={handleSubmit}>Update Spot</button>
                </form>
            </div>
        </div>
    </div>
    )
}
