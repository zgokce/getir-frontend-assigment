import React from 'react'
import styled from 'styled-components'
import IconCheck from '../assets/icons/check.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setSorting } from '../store/filter'
import { filterItems } from '../helpers/items'
import { setFilteredItems } from '../store/item'

const ItemContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;
`
const Radio = styled.button`
	cursor: pointer;
	background-color: white;
	width: 22px;
	height: 22px;
	border: 2px solid #1ea4ce;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	> input {
		//display: none;
	}
`
const Label = styled.label`
	cursor: pointer;
	color: #525252;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
`

type FilterBoxRadioItemProps = {
	id: string
	label: string
}

const FilterCardRadioItem = ({ id, label }: FilterBoxRadioItemProps) => {
	const dispatch = useDispatch()
	const { items } = useSelector((state: RootState) => state.items)
	const filters = useSelector((state: RootState) => state.filter)

	const radioItemOnClick = () => {
		dispatch(setSorting(id))
		const filteredItems = filterItems(filters, items)
		dispatch(setFilteredItems(filteredItems))
	}

	return (
		<ItemContainer>
			<Radio onClick={radioItemOnClick}>
				{filters.sorting === id && <img src={IconCheck} alt='check-icon' />}
			</Radio>
			<Label onClick={radioItemOnClick} htmlFor={id}>
				{label}
			</Label>
		</ItemContainer>
	)
}

export default FilterCardRadioItem
