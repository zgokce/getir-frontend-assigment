import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import ICompany from '../interfaces/company.interface'

type CompanyState = {
	companies: ICompany[]
	searchedCompanies: ICompany[]
}
const initialState: CompanyState = {
	companies: [],
	searchedCompanies: [],
}

export const companySlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		getCompanies(state, action: PayloadAction<ICompany[]>) {
			return {
				...state,
				companies: action.payload,
			}
		},
		searchCompany(state, action: PayloadAction<string>) {
			const searchValue = action.payload
			const copyState = [...state.companies]
			const search = copyState.filter((value) =>
				value.name.includes(searchValue),
			)
			return {
				...state,
				searchedCompanies: search,
			}
		},
	},
})

export const { getCompanies, searchCompany } = companySlice.actions
