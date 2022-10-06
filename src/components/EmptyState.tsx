import React from 'react'
import styled from 'styled-components'

const EmptyStateContainer = styled.div`
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	margin-top: 24px;
`
const EmptyState = () => {
	return (
		<EmptyStateContainer>
			No product found with this filters
		</EmptyStateContainer>
	)
}

export default EmptyState
