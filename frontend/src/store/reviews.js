import { csrfFetch } from '.csrf';

// Action Types

const GET_REVIEWS = 'reviews/GET_REVIEWS';


// Action Creators

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

// THUNKS

export const getReviewsThunk = (reviews) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${reviews}/reviews`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getReviews(data));
        return data;
    }
};

// Reducer

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_REVIEWS:
            const allReviews = action.reviews.Reviews;
            newState['allReviews'] = [...allReviews];
            return newState;
            
        default:
            return state;
    }
}
