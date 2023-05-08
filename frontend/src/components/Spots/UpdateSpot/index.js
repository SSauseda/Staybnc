import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import * as spotActions from '../../../store/spots';
// import { updateSpotThunk } from "../../../store/spots";
// import { useModal } from "../../../context/Modal";
import { Redirect, useHistory } from "react-router-dom";


export default function EditSpotForm() {
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spot.spotDetails);
    const dispatch = useDispatch();
    const history = useHistory();
    const preview = spot.SpotImages.find(image => image.preview === true)
    const previewUrl = preview.url
    // const { closeModal } = useModal();
    // console.log("SPOT DETIALSSPOTDETAILS", preview)


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [imageURL, setImageURL] = useState(previewUrl);
    const [prevImage1, setPrevImage1] = useState('');
    const [prevImage2, setPrevImage2] = useState('');
    const [prevImage3, setPrevImage3] = useState('');
    const [prevImage4, setPrevImage4] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (hasSubmitted) {
            let validationErrors = {}

            if (!country) validationErrors.country = 'Country is required'
            if (!address) validationErrors.address = 'Address is required'
            if (!city) validationErrors.city = 'City is required'
            if (!state) validationErrors.state = 'State is required'
            if (description.length < 30) validationErrors.description = 'Description needs a minimum of 30 characters'
            if (!name) validationErrors.name = 'Name is required'
            if (!price) validationErrors.price = 'Price is required'
            if (!imageURL) validationErrors.imageURL = 'Preview image is required'
            if ( imageURL &&
                !/\.(png|jpg|jpeg)$/i.test(imageURL.slice(imageURL.lastIndexOf('.')))
              ) validationErrors.previewImage = 'Image URL must end in .png, .jpg, or .jpeg'
            if (prevImage1 && !/\.(png|jpg|jpeg)$/i.test(prevImage1.slice(prevImage1.lastIndexOf('.')))
              ) validationErrors.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
            if (prevImage2 && !/\.(png|jpg|jpeg)$/i.test(prevImage2.slice(prevImage2.lastIndexOf('.')))
              ) validationErrors.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
            if (prevImage3 && !/\.(png|jpg|jpeg)$/i.test(prevImage3.slice(prevImage3.lastIndexOf('.')))
              ) validationErrors.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
            if (prevImage4 && !/\.(png|jpg|jpeg)$/i.test(prevImage4.slice(prevImage4.lastIndexOf('.')))
              ) validationErrors.image1 = 'Image URL must end in .png, .jpg, or .jpeg'

              setErrors(validationErrors)
        }
    }, [
        hasSubmitted,
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        imageURL,
        prevImage1,
        prevImage2,
        prevImage3,
        prevImage4
    ])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (Object.keys(errors).length > 0) return

        const images = [prevImage1, prevImage2, prevImage3, prevImage4].filter(Boolean).map((url) => ({
            url,
            preview: false
        }))

        return await dispatch(
            spotActions.updateSpotThunk(spot.id, {
                name,
                description,
                price,
                address,
                city,
                state,
                country,
                lat,
                lng,
            }, {
                url: imageURL,
                preview: true
            },
                images
            )
        )
        .then(spot => {
            // closeModal();
            history.push(`/spots/${spot.id}`)
        })
        .catch(async res => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        }) 
}

if (!spot) return null; 
if (!sessionUser) return <Redirect to={'/'}/>
    

    return (
        <div className='form-container-div'>
      <div className='form-container'>
        <div className='update-spot-form'>
          <form noValidate className='uodate-spot' onSubmit={handleSubmit}>
            <div className='location-section'>
              <h1 className='title'>Update Your Spot</h1>
              <div className='location-info'>
                <h2 className='form-heading'>Where's your place located?</h2>
                <p className='form-subheading'>
                  Guests will only get your exact address once they booked a
                  reservation.
                </p>
                <div className='location-inputs'>
                  <div className='input-group'></div>
                </div>
                <label htmlFor='country'>Country</label>
                <input
                  className='input2'
                  type='text'
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder='Country'
                  required
                ></input>
                {errors.country && (
                  <div className='error'>{errors.country}</div>
                )}

                <label htmlFor='address'>Street Address</label>
                <input
                  className='address-input'
                  type='text'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder='Address'
                  required
                ></input>
                {errors.address && (
                  <div className='error'>{errors.address}</div>
                )}
                <div className='city-state'>
                  <div className='input-group'>
                    <label className='city' htmlFor='city'>
                      City
                    </label>
                    <input
                      className='input2'
                      type='text'
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder='City'
                      required
                    ></input>
                  </div>
                  {errors.city && <div className='error'>{errors.city}</div>}
                  <div className='input-group'>
                    <label className='state' htmlFor='state'>
                      State
                    </label>
                    <input
                      className='input2'
                      type='text'
                      value={state}
                      onChange={e => setState(e.target.value)}
                      placeholder='State'
                      required
                    ></input>
                  </div>
                  {errors.state && <div className='error'>{errors.state}</div>}
                </div>
                <div className='lat-lng'>
                  <div className='input-group'>
                    <label className='lat' htmlFor='lat'>
                      Latitude
                    </label>
                    <input
                      className='input2'
                      type='text'
                      value={lat}
                      onChange={e => setLat(e.target.value)}
                      placeholder='Latitude'
                      required
                    ></input>
                  </div>
                  {errors.lat && <div className='error'>{errors.lat}</div>}
                  <div className='input-group'>
                    <label className='lng' htmlFor='lng'>
                      Longitude
                    </label>
                    <input
                      className='input2'
                      type='text'
                      value={lng}
                      onChange={e => setLng(e.target.value)}
                      placeholder='Longitude'
                      required
                    ></input>
                  </div>
                  {errors.lng && <div className='error'>{errors.lng}</div>}
                </div>
              </div>
            </div>
            <div className='description-section'>
              <h2 className='form-heading'>Describe your place to guests</h2>
              <p className='form-subheading'>
                Mention the best features of your space, any special amenities
                like fast wifi or parking, and what you love about the
                neighborhood.
              </p>
              <textarea
                className='input-desc'
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='Please write at least 30 characters.'
                required
              ></textarea>
              {errors.description && (
                <div className='error'>{errors.description}</div>
              )}
            </div>
            <div className='title-section'>
              <h2 className='form-heading'>Create a title for your spot</h2>
              <p className='form-subheading'>
                Catch guests' attention with a spot title that highlights what
                makes your place special.
              </p>
              <input
                className='name-input'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Name of your spot'
                required
              ></input>
              {errors.name && <div className='error'>{errors.name}</div>}
            </div>
            <div className='price-section'>
              <h2 className='form-heading'>Set a base price for your spot</h2>
              <p className='form-subheading'>
                Competitive pricing can help your listing stand out and rank
                higher in search results.
              </p>
              <div className='price'>
                <p>$</p>
                <input
                  className='input2'
                  type='text'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder='Price per night (USD)'
                  required
                ></input>
                {errors.price && <div className='error'>{errors.price}</div>}
              </div>
            </div>
            <div className='photo-section'>
              <h2 className='form-heading'>Liven up your spot with photos</h2>
              <p className='form-subheading'>
                Submit a link to AT LEAST one photo to publish your spot.
              </p>
              <input
                className='input-img'
                type='url'
                value={imageURL}
                onChange={e => setImageURL(e.target.value)}
                placeholder='Preview Image URL'
                required
              ></input>
              {errors.imageURL && (
                <div className='error'>{errors.imageURL}</div>
              )}

              <input
                className='input-img'
                type='url'
                value={prevImage1}
                onChange={e => setPrevImage1(e.target.value)}
                placeholder='Image URL'
                required
              ></input>
              {errors.prevImage1 && (
                <div className='error'>{errors.prevImage1}</div>
              )}

              <input
                className='input-img'
                type='url'
                value={prevImage2}
                onChange={e => setPrevImage2(e.target.value)}
                placeholder='Image URL'
                required
              ></input>
              <input
                className='input-img'
                type='url'
                value={prevImage3}
                onChange={e => setPrevImage3(e.target.value)}
                placeholder='Image URL'
                required
              ></input>
              <input
                className='input-img'
                type='url'
                value={prevImage4}
                onChange={e => setPrevImage4(e.target.value)}
                placeholder='Image URL'
                required
              ></input>
            </div>
            <button
              className='submit-create-spot-btn'
              type='submit'
              onClick={handleSubmit}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
    )
}
