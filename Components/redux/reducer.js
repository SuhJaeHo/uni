import { Region } from './action';
import { combineReducers, createStore } from "redux";

const initialState = {
    region: {
        latitude: 37.49783315274643, 
        longitude: 127.02783092726877,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,  
    },
}

// reducers
function updateRegion (state = initialState, action) {
    switch(action.type) {
        case Region: 
            return {
                ...state,
            }
        default:
            return state    
    }
}

const rootReducer = combineReducers({ 
    updateRegion 
});

export default rootReducer;


