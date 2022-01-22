import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { stationReducer } from './reducers/station.reducer'
import { musicPlayerReducer } from './reducers/music.player.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
    stationModule: stationReducer,
    musicPlayerModule: musicPlayerReducer,
    userModule: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
