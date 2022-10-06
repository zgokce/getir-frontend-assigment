import React, { useState } from 'react'
import styled from 'styled-components'
import IconCheck from '../assets/icons/check.svg'
import { useDispatch, useSelector } from 'react-redux'
import { brandFilter, tagFilter } from '../store/filter'
import { filterItems } from '../helpers/items'
import { RootState } from '../store'
import { setFilteredItems } from '../store/item'

const ItemContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;
	padding: 3px 3px 3px 3px;
`
const Checkbox = styled.button`
	cursor: pointer;
	background-color: white;
	padding: 0;

	width: 22px;
	height: 22px;
	border: none;
	box-shadow: 0 1px 7px rgba(93, 56, 192, 0.4);
	border-radius: 2px;
	display: flex;
	justify-content: center;
	align-items: center;

	//TODO: change icons stroke
	> img {
		filter: brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(0%)
			hue-rotate(349deg) brightness(101%) contrast(105%);
	}

	&.checked {
		background-color: #1ea4ce;
	}
`
const Label = styled.label`
	cursor: pointer;
	width: calc(100% - 26px);
	color: #525252;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;

	> span {
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
		color: #a8a8a8;
		margin-left: 4px;
	}
`

type FilterCardCheckboxItemProps = {
	checked: boolean
	label: string
	slug: string
	count?: number
	type: 'brands' | 'tags'
}

const FilterCardCheckboxItem = ({
	checked,
	label,
	slug,
	count,
	type,
}: FilterCardCheckboxItemProps) => {
	const dispatch = useDispatch()
	const { items } = useSelector((state: RootState) => state.items)
	const filters = useSelector((state: RootState) => state.filter)

	const [checkboxChecked, setCheckboxChecked] = useState(checked)

	const onCheckboxChange = () => {
		setCheckboxChecked(!checkboxChecked)
		if (type === 'brands') {
			dispatch(brandFilter(slug))
		} else {
			dispatch(tagFilter(label))
		}
		const filteredItems = filterItems(filters, items)
		dispatch(setFilteredItems(filteredItems))
	}

	return (
		<ItemContainer>
			<Checkbox
				onClick={onCheckboxChange}
				className={checkboxChecked ? 'checked' : ''}
			>
				{checkboxChecked && <img src={IconCheck} alt='check-icon' />}
			</Checkbox>
			<Label htmlFor='filter-radio-input' onClick={onCheckboxChange}>
				{label}
				{count && <span>({count})</span>}
			</Label>
		</ItemContainer>
	)
}

export default FilterCardCheckboxItem
