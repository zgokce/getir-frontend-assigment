import React from 'react'
import { DOTS, usePagination } from '../hooks/usePagination'
import styled from 'styled-components'

import IconArrowLeft from '../assets/icons/arrow-left.svg'
import IconArrowRight from '../assets/icons/arrow-right.svg'

import { screens } from '../utils/Screens'

const PaginationContainer = styled.div`
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 40px;

	display: flex;
	justify-content: center;
	align-items: center;

	> button:nth-child(1) {
		color: #1ea4ce;
		@media screen and ${screens.xl} {
			margin-right: 56px;
		}
		> img {
			margin-right: 12px;
		}
	}
	> button:last-child {
		color: #697488;
		@media screen and ${screens.xl} {
			margin-left: 56px;
		}
		> img {
			margin-right: 12px;
		}
	}
`
const PageButton = styled.button`
	background-color: transparent;
	color: #697488;
	border: none;
	border-radius: 2px;

	cursor: pointer;
	padding: 12px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-weight: 600;
	font-size: 14px;
	line-height: 16px;

	&.active {
		color: #ffffff !important;
		background-color: #1ea4ce;
	}
`

type PaginationProps = {
	totalCount: number
	currentPage: number
	pageSize: number
	siblingCount: number
	onPageChange: (page: number) => void
}

const Pagination = ({
	totalCount,
	siblingCount,
	pageSize,
	onPageChange,
	currentPage,
}: PaginationProps) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	})

	if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
		return null
	}

	const onNext = () => {
		onPageChange(currentPage + 1)
	}

	const onPrevious = () => {
		onPageChange(currentPage - 1)
	}

	const lastPage =
		paginationRange && paginationRange[paginationRange.length - 1]

	return (
		<PaginationContainer>
			<PageButton onClick={onPrevious} disabled={currentPage === 1}>
				<img src={IconArrowLeft} alt='arrow-left-icon' />
				<div>Prev</div>
			</PageButton>
			{paginationRange &&
				paginationRange.map((pageNumber, i) => {
					if (pageNumber === DOTS) {
						return <div key={`dots-${i.toString()}`}>....</div>
					}
					return (
						<PageButton
							key={`page-${i}`}
							className={pageNumber === currentPage ? 'active' : ''}
							onClick={() => onPageChange(pageNumber as number)}
						>
							{pageNumber}
						</PageButton>
					)
				})}
			<PageButton disabled={currentPage === lastPage} onClick={onNext}>
				<div>Next</div>
				<img src={IconArrowRight} alt='arrow-right-icon' />
			</PageButton>
		</PaginationContainer>
	)
}

export default Pagination
