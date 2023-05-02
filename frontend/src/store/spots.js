import { csrfFetch } from './csrf';

// Action Types
const GET_SPOTS = 'spots/GET_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const EDIT_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const SPOT_DETAILS = 'spots/SPOT_DETAILS';


// Action Creators

const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

const createSpot = (addSpot) => ({
    type: CREATE_SPOT,
    addSpot
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



// Reducer

const initialState = {}

const spotReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_SPOTS:
            const allSpots = {};
            const getAllSpots = action.spots.Spots;
            getAllSpots.forEach((spot) => (allSpots[spot.id] = spot))
            newState['allSpots'] = { ...allSpots };
            return newState;
        case SPOT_DETAILS:
            newState['spotDetails'] = action.spot;
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
