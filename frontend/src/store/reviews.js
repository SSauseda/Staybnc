import { csrfFetch } from './csrf';

// Action Types

const GET_REVIEWS = 'reviews/GET_REVIEWS';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';


// Action Creators

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const deleteReviews = (deleteReview) => ({
    type: DELETE_REVIEW,
    deleteReview
})

const createReviews = (review) => ({
    type: CREATE_REVIEW,
    review
})

// THUNKS

export const getReviewsThunk = (reviews) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${reviews}/reviews`)

    if (response.ok) {
        const spotReviews = await response.json();
        dispatch(getReviews(spotReviews));
        return spotReviews;
    }
};

export const deleteReviewThunk = deleteReview => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${deleteReview}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const deleted = await response.json()
        dispatch(deleteReviews(deleteReview))
        return deleted
    }
}

export const createReviewThunk = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const createdReview = await response.json();
        dispatch(createReviews(createdReview, spotId))
        return createdReview;
    }
}

// Reducer

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_REVIEWS:
            const allReviews = action.reviews.Reviews;
            newState['allReviews'] = [...allReviews];
            return newState;
        
        case CREATE_REVIEW:
            const createdReview = action.review;
            return createdReview;

        case DELETE_REVIEW:
            const deletedReview = action.deleteReview
            newState.allReviews = state.allReviews.filter(
                review => review.id === deletedReview
            )
            return newState
        default:
            return state;
    }
}

export default reviewsReducer;
