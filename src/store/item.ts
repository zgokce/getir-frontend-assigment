import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IItem from '../interfaces/item.interface'

type ItemsState = {
	items: IItem[]
	filteredItems: IItem[]
}
const initialState: ItemsState = {
	items: [],
	filteredItems: [],
}

export const itemSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		getItems(state, action: PayloadAction<IItem[]>) {
			return { ...state, items: action.payload }
		},
		setFilteredItems(state, action: PayloadAction<IItem[]>) {
			return { ...state, filteredItems: action.payload }
		},
	},
})

export const { getItems, setFilteredItems } = itemSlice.actions
