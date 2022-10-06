import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IFilter from '../interfaces/filter.interface'

const initialState: IFilter = {
	sorting: '',
	brands: [],
	tags: [],
	itemType: '',
	showFilterMenu: false,
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSorting(state, action: PayloadAction<string>) {
			return {
				...state,
				sorting: action.payload,
			}
		},
		setShowFilterMenu(state, action: PayloadAction<boolean>) {
			return {
				...state,
				showFilterMenu: action.payload,
			}
		},
		setItemType(state, action: PayloadAction<string>) {
			return {
				...state,
				itemType: action.payload,
			}
		},
		brandFilter(state, action: PayloadAction<string>) {
			const brandIndex = state.brands.indexOf(action.payload)
			if (brandIndex === -1) {
				return {
					...state,
					brands: [...state.brands, action.payload],
				}
			} else {
				const cloneBrands = [...state.brands]
				cloneBrands.splice(brandIndex, 1)
				return { ...state, brands: cloneBrands }
			}
		},
		tagFilter(state, action: PayloadAction<string>) {
			const tagIndex = state.tags.indexOf(action.payload)
			if (tagIndex === -1) {
				return {
					...state,
					tags: [...state.tags, action.payload],
				}
			} else {
				const cloneTags = [...state.tags]
				cloneTags.splice(tagIndex, 1)
				return { ...state, tags: cloneTags }
			}
		},
	},
})

export const {
	setSorting,
	setItemType,
	setShowFilterMenu,
	brandFilter,
	tagFilter,
} = filterSlice.actions
