import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { stationReducer } from './reducers/station.reducer';
import { playerReducer } from './reducers/player.reducer';

const rootReducer = combineReducers({
  stationModule: stationReducer,
  playerModule: playerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
