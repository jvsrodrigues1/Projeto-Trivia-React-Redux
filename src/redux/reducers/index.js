import { combineReducers } from 'redux';
import playerReducer from './reducers';

const rootReducer = combineReducers({
  player: playerReducer,
});

export default rootReducer;
