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
`
const ChildContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	max-height: 260px;
	> div.items {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: -16px;
	}
`

type FilterBoxProps = {
	filterLabel: string
	children: React.ReactNode
}
const FilterCard = ({ filterLabel, children }: FilterBoxProps) => {
	return (
		<div>
			<Label>{filterLabel}</Label>
			<FilterContainer>
				<ChildContainer>{children}</ChildContainer>
			</FilterContainer>
		</div>
	)
}

export default FilterCard
