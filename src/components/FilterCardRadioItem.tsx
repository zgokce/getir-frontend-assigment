import React, { useState } from 'react'
import styled from 'styled-components'
import IconCheck from '../assets/icons/check.svg'

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
		display: none;
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
	selected: boolean
	label: string
}
const FilterCardRadioItem = ({
	id,
	selected,
	label,
}: FilterBoxRadioItemProps) => {
	const [radioSelected, setRadioSelected] = useState(selected)

	const onRadioSelectedChange = () => setRadioSelected(!radioSelected)

	return (
		<ItemContainer>
			<Radio onClick={onRadioSelectedChange}>
				{radioSelected && <img src={IconCheck} alt='check-icon' />}
				<input type='radio' id={id} onChange={onRadioSelectedChange} />
			</Radio>
			<Label htmlFor={id}>{label}</Label>
		</ItemContainer>
	)
}

export default FilterCardRadioItem
