import { spotDetailThunk } from "../../../../store/spots";
import { getReviewsThunk } from "../../../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteReviewThunk } from "../../../../store/reviews";
import CreateReviewModal from "../CreateReview/CreateReviewModal";
import DeleteReviewModal from "../CreateReview/DeleteReviewModal";
import CreateReviewForm from "../CreateReview";
import './SpotReviews.css'


export default function SpotReviews ({ createNewReview }) {
    const reviews = useSelector(state => state.review.allReviews)
    // console.log("TESTREVIEWSTESTREVIEWSTESTREVIEWSTESTREVIEWS" ,reviews)
    const spot = useSelector(state => state.spot.spotDetails)
    const { spotId } = useParams(); 
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch();
    const history = useHistory();

    const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [reviewToDelete, setReviewToDelete] = useState(null)
    const [showOverlay, setShowOverlay] = useState(false)

    // const { avgStarRating } = spotDetails

    const createReviewClick = () => {
        setShowCreateReviewModal(true)
      }
    
      const handleDelete = reviewId => {
        setReviewToDelete(reviewId)
        setDeleteModalOpen(true)
      }
    
      const handleDeleteConfirm = async () => {
        if (reviewToDelete) {
          await dispatch(deleteReviewThunk(reviewToDelete));
          await dispatch(getReviewsThunk(spotId));
          await dispatch(spotDetailThunk(spotId));
          setReviewToDelete(null);
          spot.numReviews --
          
        }
        setDeleteModalOpen(false)
      }

      // console.log("TESTTESTTEST", typeof spot.numReviews)
    
      const handleDeleteCancel = () => {
        setReviewToDelete(null)
        setDeleteModalOpen(false)
      }
      
    
      if (!reviews) return null;


    return (
        <div>
          <div className='reviews-header'>
            <p className='stars-rating'>
              ★
              <span className='avg-rating'>
                {Number(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'New'}
              </span>
              {reviews.length > 0 && <span className='review-dot'></span>}
            </p>
            {reviews.length > 0 && (
              <p className='reviews-total'>
                {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'}
                </p>
            )}
          </div>
          {sessionUser &&
            sessionUser.id !== spot.Owner.id &&
            !reviews.some(review => review.userId === sessionUser.id) && (
              <div>
                <button className='post-review-btn' onClick={createReviewClick}>
                  Post Your Review
                </button>
              </div>
            )}
          {reviews.length > 0 ? (
            <ul className='reviews-container'>
              {reviews.map(review => {
              console.log("REVIEWS", reviews)
                const date = new Date(review.updatedAt).toLocaleDateString(
                  'en-US',
                  {
                    month: 'long',
                    year: 'numeric'
                  }
                )
    
                return (
                  <div className='review-container'>
                    <div className='user-review-container' key={review.id}>
                      <h3 className='review-user'>{review.User.firstName}</h3>
                      <p className='review-date'>{date}</p>
                      <div className='desc'>{review.review}</div>
                    </div>
                    {sessionUser && sessionUser.id === review.userId && (
                      <button
                        className='delete-review-btn'
                        onClick={() => handleDelete(review.id)}
                      >
                        Delete Review
                      </button>
                    )}
                  </div>
                )
              })}
            </ul>
          ) : (
            sessionUser &&
            sessionUser.id !== spot.Owner.id && (
              <p>Be the first to post a Review!</p>
            )
          )}
          <CreateReviewModal
            open={showCreateReviewModal}
            onClose={() => setShowCreateReviewModal(false)}
          >
            <CreateReviewForm
              spotId={spot.id}
              createNewReview={createNewReview}
              closeModal={() => setShowCreateReviewModal(false)}
            />
          </CreateReviewModal>
    
          {deleteModalOpen && (
            <DeleteReviewModal
              isOpen={deleteModalOpen}
              onDelete={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
              onClose={() => {
                setDeleteModalOpen(false)
                setShowOverlay(false)
              }}
            />
          )}
        </div>
      )
}
