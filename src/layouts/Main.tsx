import React from 'react'
import styled from 'styled-components'

import Logo from '../assets/logo.svg'
import IconBasket from '../assets/icons/basket.svg'

const Layout = styled.div`
	background-color: #fafafa;
`
const Header = styled.div`
	background-color: #1ea4ce;

	#header {
		display: flex;
		justify-content: center;
		align-items: stretch;
		width: 80%;
		margin-left: auto;
		margin-right: auto;

		> div:nth-child(1) {
			flex: 1;
			display: flex;
			justify-content: center;

			> img {
				margin-top: 17px;
				margin-bottom: 19px;
			}
		}
	}
`
const Basket = styled.div`
	background-color: #147594;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	padding: 0 24px;
	> div {
		color: white;
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
	}
`
const ChildContainer = styled.div`
	width: 80%;
	margin-left: auto;
	margin-right: auto;
	padding-top: 38.36px;
	padding-bottom: 40px;
`

type MainLayoutProps = {
	children: React.ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<Layout>
			<Header>
				<div id='header'>
					<div>
						<img src={Logo} alt='logo' />
					</div>
					<Basket>
						<img src={IconBasket} alt='basket-icon' />
						<div>₺ 39,97</div>
					</Basket>
				</div>
			</Header>
			<ChildContainer>{children}</ChildContainer>
		</Layout>
	)
}

export default MainLayout
