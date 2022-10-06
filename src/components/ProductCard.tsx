import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import ProductImage from '../assets/product-image.webp'
import IItem from '../interfaces/item.interface'

import { addItem } from '../store/basket'
import { screens } from '../utils/Screens'

const Container = styled.div`
	@media screen and ${screens.md} {
		width: 25%;
	}
	width: 33.33%;
	display: flex;
	flex-direction: column;
	margin-bottom: 22px;
`
const ImageContainer = styled.div`
	border: 1.17666px solid #f3f0fe;
	border-radius: 12px;

	display: flex;
	justify-content: center;
	align-items: center;

	margin: 0 20px 8px 20px;

	//TODO: img sizes
	> img {
		flex: 1;
		height: 100px;
		width: 100px;
		padding: 16px;
	}
`
const ProductPrice = styled.div`
	color: #1ea4ce;

	font-weight: 400;
	font-size: 14px;
	line-height: 20px;

	margin: 0 20px;
`
const ProductName = styled.div`
	color: #191919;

	flex-grow: 1;

	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	margin: 8px 20px;
`
const AddButton = styled.button`
	background: #1ea4ce;
	color: white;

	cursor: pointer;
	border: none;
	border-radius: 2px;

	font-weight: 600;
	font-size: 12px;
	line-height: 20px;

	margin: 0 20px;
`

type ProductCardProps = {
	product: IItem
}
const ProductCard = ({ product }: ProductCardProps) => {
	const dispatch = useDispatch()

	const addProductToBasket = () => {
		dispatch(addItem(product))
	}
	return (
		<Container>
			<ImageContainer>
				<img src={ProductImage} alt='product-img' />
			</ImageContainer>
			<ProductPrice>₺ {product.price}</ProductPrice>
			<ProductName>{product.name}</ProductName>
			<AddButton onClick={addProductToBasket}>Add</AddButton>
		</Container>
	)
}

export default ProductCard
