import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { stationReducer } from './reducers/station.reducer'
import { musicPlayerReducer } from './reducers/music.player.reducer'
import { userReducer } from './reducers/user.reducer'
import { activitylogReducer } from './reducers/activity.log.reducer'

const rootReducer = combineReducers({
    stationModule: stationReducer,
    musicPlayerModule: musicPlayerReducer,
    userModule: userReducer,
    activitylogModule: activitylogReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
