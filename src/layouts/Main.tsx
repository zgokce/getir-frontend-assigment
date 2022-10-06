import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Logo from '../assets/logo.svg'
import IconMenu from '../assets/icons/menu.svg'
import IconBasket from '../assets/icons/basket.svg'

import { screens } from '../utils/Screens'
import { RootState } from '../store'
import BasketCard from '../components/BasketCard'
import { setShowFilterMenu } from '../store/filter'

const Layout = styled.div`
	background-color: #fafafa;
	position: relative;
`
const Header = styled.div`
	background-color: #1ea4ce;

	#header {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: stretch;
		max-width: 1236px;
		@media screen and ${screens.xl} {
			width: 85%;
		}
		width: 96%;
		margin-left: auto;
		margin-right: auto;
	}
`
const MenuContainer = styled.div`
	@media screen and ${screens.lg} {
		display: none;
	}
	display: block;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	> button {
		border: none;
		background-color: transparent;
		cursor: pointer;
	}
`
const LogoContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;

	> img {
		margin-top: 17px;
		margin-bottom: 19px;
	}
`
const Basket = styled.button`
	position: absolute;
	cursor: pointer;
	border: none;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: #147594;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	@media screen and ${screens.lg} {
		padding: 0 24px;
	}
	padding: 0 6px;

	> div {
		color: white;
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
	}
`
const ChildContainer = styled.div`
	max-width: 1236px;
	min-height: 100vh;
	@media screen and ${screens.xl} {
		width: 85%;
	}
	width: 96%;
	margin-left: auto;
	margin-right: auto;
	padding-top: 38.36px;
	padding-bottom: 40px;
`
const MobileBasketCard = styled.div`
	@media screen and ${screens.xl} {
		display: none;
	}
	display: block;
	position: absolute;
	right: 0;
`
const Footer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;

	font-weight: 400;
	font-size: 13px;
	line-height: 174%;
	margin-top: 100px;
	color: #1ea4ce;
	padding-bottom: 40px;

	> a {
		color: #1ea4ce;
		cursor: pointer;
		text-decoration: none;
	}
`

type MainLayoutProps = {
	children: React.ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
	const dispatch = useDispatch()
	const [showBasketCard, setShowBasketCard] = useState(false)
	const { totalPrice } = useSelector((state: RootState) => state.basket)

	return (
		<Layout>
			<Header>
				<div id='header'>
					<MenuContainer>
						<button onClick={() => dispatch(setShowFilterMenu(true))}>
							<img src={IconMenu} alt='menu-icon' />
						</button>
					</MenuContainer>
					<LogoContainer>
						<img src={Logo} alt='logo' />
					</LogoContainer>
					<Basket onClick={() => setShowBasketCard(!showBasketCard)}>
						<img src={IconBasket} alt='basket-icon' />
						<div>₺ {totalPrice ? totalPrice.toFixed(2) : 0}</div>
					</Basket>
				</div>
			</Header>
			{showBasketCard && (
				<MobileBasketCard>
					<BasketCard />
				</MobileBasketCard>
			)}
			<ChildContainer>{children}</ChildContainer>
			<Footer>
				<div>©2019 Market</div>
				<div>•</div>
				<a href=''>Privacy Policy</a>
			</Footer>
		</Layout>
	)
}

export default MainLayout
