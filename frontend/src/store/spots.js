import { csrfFetch } from './csrf';

// Action Types
const GET_SPOTS = 'spots/getSpots';
const CREATE_SPOT = 'spots/createSpot';
const EDIT_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const SPOT_DETAILS = 'spots/getSpotDetail';
const USERS_SPOTS = 'spots/getUserSpots';


// Action Creators

const getSpots = (spots) => ({
    type: GET_SPOTS,
    payload: spots
});

const createSpot = (newSpot) => ({
    type: CREATE_SPOT,
    newSpot
});

const deleteSpot = (deleteSpot) => ({
    type: DELETE_SPOT,
    deleteSpot
})

const updateSpot = (spotId, spotData) => ({
    type: EDIT_SPOT,
    spot: {
        id: spotId,
        ...spotData
    }
})

const getSpotDetail = (spot) => ({
    type: SPOT_DETAILS,
    spot
})

const getUserSpots = (spots) => ({
    type: USERS_SPOTS,
    spots
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

export const createSpotThunk = (newSpot, previewImage, additionalImages) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newSpot),
    });

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
            for (let img of additionalImages) {
                const additionalImageResponse = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        url: img.url,
                        preview: false,
                    })
                })
                if (additionalImageResponse.ok) {
                    console.error("Failed to save additional image", img.url)
                    // const additionalImage = await additionalImageResponse.json();
                    // createdSpot.additionalImages.push(additionalImage.url);
                }
            }
            dispatch(createSpot(createdSpot));
            return createdSpot;
        }
    }
};

export const updateSpotThunk = (spotId, updatedSpotData) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSpotData),
    });

    if (response.ok) {
        const spotData = await response.json();
        dispatch(updateSpot(spotId, spotData));
        return spotData;
    }
};

export const getUsersSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getUserSpots(data));
        return data
    }
}



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
            // const allSpots = {};
            // const getAllSpots = action.spots.Spots;
            // getAllSpots.forEach((spot) => (allSpots[spot.id] = spot))
            // newState['allSpots'] = { ...allSpots };
            // return newState;
            newState = Object.assign({}, state)
            newState.spots = action.payload
            return newState

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
