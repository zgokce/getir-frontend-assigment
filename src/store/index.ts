import { combineReducers } from 'redux'
import { companySlice } from './company'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { itemSlice } from './item'
import { basketSlice } from './basket'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import { filterSlice } from './filter'

const rootReducer = combineReducers({
	companies: companySlice.reducer,
	items: itemSlice.reducer,
	basket: basketSlice.reducer,
	filter: filterSlice.reducer,
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['filter'],
}

const reducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})
export const persistor = persistStore(store)
