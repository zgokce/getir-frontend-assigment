import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'

import useMediaQuery from './hooks/useMediaQuery'
import IconCross from './assets/icons/cross.svg'

import { RootState } from './store'
import { getAllCompanies, getAllItems } from './services/service'
import { getCompanies, searchCompany } from './store/company'
import { getItems, setFilteredItems } from './store/item'
import { setItemType, setShowFilterMenu } from './store/filter'
import { screens } from './utils/Screens'

import MainLayout from './layouts/Main'
import FilterCard from './components/FilterCard'
import FilterCardRadioItem from './components/FilterCardRadioItem'
import BasketCard from './components/BasketCard'
import FilterCardCheckboxItem from './components/FilterCardCheckboxItem'
import { filterItems, getTagCount, getTags, searchTags } from './helpers/items'
import ProductCard from './components/ProductCard'
import Pagination from './components/Pagination'
import EmptyState from './components/EmptyState'

const Container = styled.div`
	display: flex;
	gap: 16px;
	justify-content: center;
	> div:nth-child(2) {
		@media screen and ${screens.xl} {
			width: 60% !important;
		}
		@media screen and ${screens.lg} {
			width: 75%;
		}
		width: 96%;
	}
	> div:nth-child(3) {
		@media screen and ${screens.xl} {
			display: block;
			width: 20%;
		}
		display: none;
	}
`
const FiltersContainer = styled.div`
	@media screen and ${screens.xl} {
		width: 20%;
	}
	@media screen and ${screens.lg} {
		display: block;
	}
	display: none;
	&.show {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		@media screen and ${screens.md} {
			width: 50%;
		}
		width: 80%;
		background-color: white;
		padding: 12px;
		overflow-y: auto;
	}
	width: 25%;
	> div:nth-child(3) {
		margin-top: 24px;
		margin-bottom: 24px;
	}
`
const ItemTypeFilterContainer = styled.div`
	font-weight: 400;
	font-size: 20px;
	line-height: 26px;

	color: #6f6f6f;
`
const Label = styled.div`
	font-weight: 400;
	font-size: 20px;
	line-height: 26px;

	color: #6f6f6f;
`
const MenuCloseButton = styled.button`
	@media screen and ${screens.lg} {
		display: none;
	}
	display: block;
	border: none;
	cursor: pointer;
	background-color: transparent;
	position: absolute;
	right: 0;
`
const ItemsContainer = styled.div`
	background-color: white;

	display: flex;
	flex-wrap: wrap;

	margin-top: 16px;
	padding-top: 22px;
`
const ItemTypes = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 16px;
`
const ItemType = styled.button`
	cursor: pointer;
	border: none;
	border-radius: 2px;
	font-weight: 600;
	font-size: 13px;
	line-height: 18px;

	padding: 6px 16px;

	background: #f2f0fd;
	color: #1ea4ce;

	display: flex;
	flex-direction: column;
	align-items: center;

	&.active {
		background: #1ea4ce;
		color: white;
	}
`
const SearchContainer = styled.div`
	margin-bottom: 17px;
	display: flex;

	> input {
		flex: 1;
		padding: 12px 16px;
		border: 2px solid #e0e0e0;
		border-radius: 2px;
		::placeholder {
			color: #a8a8a8;

			font-weight: 400;
			font-size: 14px;
			line-height: 24px;
		}
	}
`

function App() {
	const dispatch = useDispatch()
	const matches = useMediaQuery(screens.lg)

	const { companies, searchedCompanies } = useSelector(
		(state: RootState) => state.companies,
	)
	const { items, filteredItems } = useSelector(
		(state: RootState) => state.items,
	)
	const basketItems = useSelector((state: RootState) => state.basket)
	const filters = useSelector((state: RootState) => state.filter)

	const [loading, setLoading] = useState(false)
	const [tags, setTags] = useState<string[]>([])
	const [itemTypes, setItemTypes] = useState<string[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [searchBrandValue, setSearchBrandValue] = useState('')
	const [searchTagValue, setSearchTagValue] = useState('')

	const companyList =
		searchedCompanies.length > 0 ? searchedCompanies : companies

	useEffect(() => {
		setLoading(true)
		getAllCompanies().then((response) => {
			dispatch(getCompanies(response))
		})
		getAllItems().then((response) => {
			dispatch(getItems(response))
		})
		setTags(getTags(items))
		setItemTypes(Array.from(new Set(_.map(items, 'itemType'))))
		setLoading(false)
	}, [])

	useEffect(() => {
		if (filters.showFilterMenu && matches) {
			dispatch(setShowFilterMenu(false))
		}
	})

	useEffect(() => {
		const filteredItems = filterItems(filters, items)
		dispatch(setFilteredItems(filteredItems))
	}, [filters])

	const currentPageItems = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * 16
		const lastPageIndex = firstPageIndex + 16
		if (filteredItems && filteredItems.length > 0) {
			return filteredItems.slice(firstPageIndex, lastPageIndex)
		}
		return items.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, items, filteredItems])

	const onSearchBrandInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value
		setSearchBrandValue(value)
		dispatch(searchCompany(value))
	}

	const onSearchTagInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value
		setSearchTagValue(value)
		setTags(searchTags(items, value))
	}

	const checkState =
		(filters.itemType !== '' ||
			filters.sorting !== '' ||
			filters.brands?.length !== 0 ||
			filters.tags?.length !== 0) &&
		filteredItems.length === 0

	return (
		<React.Fragment>
			{loading ? (
				<div />
			) : (
				<MainLayout>
					<Container>
						<FiltersContainer className={filters.showFilterMenu ? 'show' : ''}>
							<MenuCloseButton
								onClick={() => dispatch(setShowFilterMenu(false))}
							>
								<img src={IconCross} alt='icon-cross' />
							</MenuCloseButton>
							<FilterCard filterLabel='Sorting'>
								<FilterCardRadioItem
									label='Price low to high'
									id='low-to-high'
								/>
								<FilterCardRadioItem
									label='Price high to low'
									id='high-to-low'
								/>
								<FilterCardRadioItem label='New to old' id='new-to-old' />
								<FilterCardRadioItem label='Old to new' id='old-to-new' />
							</FilterCard>
							<FilterCard filterLabel='Brands'>
								<React.Fragment>
									<SearchContainer>
										<input
											type='text'
											placeholder='Search brand'
											value={searchBrandValue}
											onChange={onSearchBrandInputChange}
										/>
									</SearchContainer>
									<div className='items'>
										{companyList.map((company, c) => {
											return (
												<FilterCardCheckboxItem
													label={company.name}
													slug={company.slug}
													checked={false}
													count={
														_.filter(items, { manufacturer: company.slug })
															.length
													}
													type='brands'
													key={`companies-${c.toString()}`}
												/>
											)
										})}
									</div>
								</React.Fragment>
							</FilterCard>
							<FilterCard filterLabel='Tags'>
								<React.Fragment>
									<SearchContainer>
										<input
											type='text'
											placeholder='Search tags'
											value={searchTagValue}
											onChange={onSearchTagInputChange}
										/>
									</SearchContainer>
									<div className='items'>
										{tags.map((tag, t) => {
											return (
												<FilterCardCheckboxItem
													label={tag}
													slug={tag}
													checked={false}
													count={getTagCount(items, tag)}
													type='tags'
													key={`tags-${t.toString()}`}
												/>
											)
										})}
									</div>
								</React.Fragment>
							</FilterCard>
						</FiltersContainer>
						<div>
							<ItemTypeFilterContainer>
								<Label>Products</Label>
								<ItemTypes>
									{itemTypes.map((type) => {
										return (
											<ItemType
												className={filters.itemType === type ? 'active' : ''}
												key={`item-type-${type}`}
												onClick={() => dispatch(setItemType(type))}
											>
												{type}
											</ItemType>
										)
									})}
								</ItemTypes>
							</ItemTypeFilterContainer>
							{checkState ? (
								<EmptyState />
							) : (
								<React.Fragment>
									<ItemsContainer>
										{currentPageItems.map((product, p) => {
											return (
												<ProductCard
													product={product}
													key={`product-${p.toString()}`}
												/>
											)
										})}
									</ItemsContainer>

									<Pagination
										currentPage={currentPage}
										totalCount={items.length}
										pageSize={16}
										onPageChange={(page) => setCurrentPage(page)}
										siblingCount={1}
									/>
								</React.Fragment>
							)}
						</div>
						<div>{basketItems.products?.length > 0 && <BasketCard />}</div>
					</Container>
				</MainLayout>
			)}
		</React.Fragment>
	)
}

export default App
