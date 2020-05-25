import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import game, { InitialState as GameInitialState } from './containers/game/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const sagaMiddleware = createSagaMiddleware();

export interface InitialState {
  game: GameInitialState;
}

const rootReducer = combineReducers({
  game,
});

const persistConfig = {
  key: 'kevin',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore: any = (initialState?: any, options?: any) => {
  return createStore(persistedReducer, initialState, applyMiddleware(sagaMiddleware, logger));
};
