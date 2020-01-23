import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Call for Venues
export const venueList = () => dispatch => {
    axios
        .get('/api/venue/')
        .then(res => {
            // Set current user
            dispatch(setVenueList(res.data.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setVenueList = data => {
    return {
        type: SET_CURRENT_USER,
        payload: data
    };
};

