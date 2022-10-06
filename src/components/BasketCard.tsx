import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import IconMinus from '../assets/icons/minus.svg'
import IconPlus from '../assets/icons/plus.svg'

import { RootState } from '../store'
import { decreaseQuantity, increaseQuantity } from '../store/basket'

const BasketCardItemContainer = styled.div`
	display: flex;
	align-items: stretch;

	> div:nth-child(1) {
		flex: 1;
		padding-left: 6px;
	}
	> div:nth-child(2) {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 11px;

		padding-right: 11px;
	}
`
const ProductName = styled.div`
	color: #191919;

	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.16px;
`
const Price = styled.div`
	color: #1ea4ce;

	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.16px;
`
const Button = styled.button`
	color: #1ea4ce;
	background-color: transparent;
	border: none;
	cursor: pointer;
	display: flex;
`
const ProductCount = styled.div`
	color: white;
	background-color: #1ea4ce;

	height: 32px;
	width: 32px;
	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 700;
	font-size: 15px;
	line-height: 20px;
`
const Box = styled.div`
	background-color: white;
	border: 8px solid #1ea4ce;
	border-radius: 2px;
	padding: 16px;

	display: flex;
	flex-direction: column;
`
const Divider = styled.div`
	width: 100%;
	height: 1.02px;
	background-color: #f4f4f4;
	margin-top: 18.39px;
	margin-bottom: 16.35px;
`
const TotalPriceContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`
const TotalPrice = styled.div`
	color: #1ea4ce;
	font-weight: 600;
	font-size: 14px;
	line-height: 16px;

	border: 2px solid #1ea4ce;
	border-radius: 2px;

	display: flex;
	justify-content: center;
	align-items: center;

	padding: 17.37px 24px;
`

type BasketCardItemProps = {
	name: string
	price: number
	quantity: number
}
const BasketCardItem = ({ name, price, quantity }: BasketCardItemProps) => {
	const dispatch = useDispatch()
	return (
		<BasketCardItemContainer>
			<div>
				<ProductName>{name}</ProductName>
				<Price>₺ {price}</Price>
			</div>
			<div>
				<Button onClick={() => dispatch(decreaseQuantity(name))}>
					<img src={IconMinus} alt='minus-icon' />
				</Button>
				<ProductCount>{quantity}</ProductCount>
				<Button onClick={() => dispatch(increaseQuantity(name))}>
					<img src={IconPlus} alt='plus-icon' />
				</Button>
			</div>
		</BasketCardItemContainer>
	)
}

const BasketCard = () => {
	const basketItems = useSelector((state: RootState) => state.basket)
	return (
		<Box>
			{basketItems.products.map((item, i) => {
				return (
					<React.Fragment key={`basket-item-${i.toString()}`}>
						<BasketCardItem
							name={item.name}
							price={item.price}
							quantity={item.quantity}
						/>
						<Divider />
					</React.Fragment>
				)
			})}
			<TotalPriceContainer>
				<TotalPrice>₺ {basketItems.totalPrice.toFixed(2)}</TotalPrice>
			</TotalPriceContainer>
		</Box>
	)
}

export default BasketCard
