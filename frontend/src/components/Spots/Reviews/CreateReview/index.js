import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createReviewThunk, getReviewsThunk } from '../../../../store/reviews'

export default function CreateReviewForm ({
  spotId,
  createNewReview,
  closeModal
}) {
  const dispatch = useDispatch()
  const [review, setReview] = useState('')
  const [errors, setErrors] = useState([])
  const [stars, setStars] = useState('')

  useEffect(() => {
    dispatch(getReviewsThunk(spotId))
  }, [dispatch, spotId])

  const handleStarClick = rating => {
    setStars(rating)
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const errors = {}
    if (review.length < 10 || stars === '') {
        errors.errorMsg = 'Please write a minimum of 10 characters and select a star rating of at least 1.'
        setErrors(errors)
        return
    }
    const res = await createNewReview(e, review, stars)
    closeModal()
    }

  return (
    <div className='post-review-container'>
      <div className='heading'>
        <p>How was your stay?</p>
        {errors && <div className='error'>{errors.errorMsg}</div>}
      </div>
      <div className='form'>
        <form className='post-review-form'>
          <textarea
            className='review-desc'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder='Leave your review here...'
            required
          />
          <div className='star-rating-container'>
            <h3 className='star-label'>Stars (1-5):</h3>
            <div className='star-rating'>
              {[1, 2, 3, 4, 5].map(rating => (
                <span
                  key={rating}
                  className={rating <= stars ? 'filled' : ''}
                  onClick={() => handleStarClick(rating)}
                >
                  {rating <= stars ? '✭' : '☆'}
                </span>
              ))}
            </div>
          </div>

          <button
            className='review-btn'
            type='submit'
            onClick={handleSubmitReview}
            disabled={review.length < 10 || stars === ''}
          >
            Submit Your Review
          </button>
        </form>
      </div>
    </div>
  )
}
