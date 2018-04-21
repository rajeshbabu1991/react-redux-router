import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            console.log(action.payload.data);
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            // Keep old states data. and return a new state on top of it.
            const post = action.payload.data;
            return { ...state, [action.payload.data.id]: action.payload.data};
        case DELETE_POST:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}