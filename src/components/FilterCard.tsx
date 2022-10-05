import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
	color: #697488;
	margin-bottom: 12px;
	font-weight: 600;
	font-size: 13px;
	line-height: 18px;
`
const FilterContainer = styled.div`
	padding: 24px;
	background-color: white;
	display: flex;
	flex-direction: column;
	gap: 16px;
`
type FilterBoxProps = {
	filterLabel: string
	children: React.ReactNode
}
const FilterCard = ({ filterLabel, children }: FilterBoxProps) => {
	return (
		<div>
			<Label>{filterLabel}</Label>
			<FilterContainer>{children}</FilterContainer>
		</div>
	)
}

export default FilterCard
