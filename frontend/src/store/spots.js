import { csrfFetch } from './csrf';

// Action Types
const GET_SPOTS = 'spots/GET_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const EDIT_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const SPOT_DETAILS = 'spots/SPOT_DETAILS';
const USERS_SPOTS = 'spots/USERS_SPOTS';


// Action Creators

const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

const createSpot = (newSpot) => ({
    type: CREATE_SPOT,
    newSpot
});

const deleteSpot = (deleteSpot) => ({
    type: DELETE_SPOT,
    deleteSpot
})

const updateSpot = (editSpot) => ({
    type: EDIT_SPOT,
    editSpot
})

const getSpotDetail = (spot) => ({
    type: SPOT_DETAILS,
    spot
})

// Thunk Actions

export const getSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const allSpots = await response.json();
        dispatch(getSpots(allSpots));
        return allSpots;
    }
}

export const spotDetailThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spotData = await response.json();
        dispatch(getSpotDetail(spotData));
        return spotData;
    }
};

export const deleteSpotThunk = (deleteSpotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${deleteSpotId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(deleteSpot(deleteSpotId))
    }
};

export const createSpotThunk = (newSpot, previewImage) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newSpot),
    });
console.log("TEST", response)
    if (response.ok) {
        const createdSpot = await response.json();
        const imageResponse = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: previewImage.url,
                preview: true,
            })
        })
        if (imageResponse.ok) {
            const image = await imageResponse.json();
            createdSpot.previewImage = image.url;
            dispatch(createSpot(createdSpot));
            return createdSpot;
        }
    }
};

export const updateSpotThunk = (editSpot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSpot),
    });

    if (response.ok) {
        const updatedSpot = response.json();
        dispatch(updateSpot(updatedSpot, spotId));
        return updatedSpot;
    }
};



// Reducer

const initialState = {}

const spotReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case DELETE_SPOT:
            const deletedSpot = action.deleteSpot;
            delete newState.userSpots[deletedSpot]
            return newState;

        case CREATE_SPOT:
            const createSpot = action.newSpot;
            return createSpot;

        case GET_SPOTS:
            const allSpots = {};
            const getAllSpots = action.spots.Spots;
            getAllSpots.forEach((spot) => (allSpots[spot.id] = spot))
            newState['allSpots'] = { ...allSpots };
            return newState;

        case EDIT_SPOT:
            return newState;

        case SPOT_DETAILS:
            newState['spotDetails'] = action.spot;
            return newState;

        case USERS_SPOTS:
            newState['userSpots'] = action.userSpots;
            return newState;

        default:
            return state;
    }
};

export default spotReducer;
