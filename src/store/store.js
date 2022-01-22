import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { stationReducer } from './reducers/station.reducer';
import { musicPlayerReducer } from './reducers/musicPlayer.reducer';

const rootReducer = combineReducers({
  stationModule: stationReducer,
  musicPlayerModule: musicPlayerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
