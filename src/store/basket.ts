import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IItem from '../interfaces/item.interface'
import IBasketItem from '../interfaces/basket-item.interface'

type BasketState = {
	products: IBasketItem[]
	totalPrice: number
}
const initialState: BasketState = { products: [], totalPrice: 0 }

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<IItem>) {
			const itemIndex = state.products
				? state.products.findIndex(
						(item: IItem) => item.name === action.payload.name,
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  )
				: 0
			if (itemIndex !== -1) {
				const copyProducts = [...state.products]
				copyProducts[itemIndex].quantity += 1
				return {
					...state,
					products: copyProducts,
					totalPrice: state.totalPrice + action.payload.price,
				}
			} else {
				const copyProducts = [...state.products]
				copyProducts.push({ ...action.payload, quantity: 1 })
				return {
					...state,
					products: copyProducts,
					totalPrice: state.totalPrice + action.payload.price,
				}
			}
		},
		increaseQuantity: (state, action: PayloadAction<string>) => {
			const itemInCart = state.products.find(
				(item) => item.name === action.payload,
			)
			if (itemInCart) {
				itemInCart.quantity++
				state.totalPrice += itemInCart.price
			}
		},
		decreaseQuantity: (state, action: PayloadAction<string>) => {
			const itemIndex = state.products.findIndex(
				(item) => item.name === action.payload,
			)
			const itemInCart = state.products[itemIndex]
			if (itemInCart) {
				const itemsCopy = [...state.products]
				if (itemInCart.quantity === 1) {
					const total = state.totalPrice - itemsCopy[itemIndex].price
					itemsCopy.splice(itemIndex, 1)
					return {
						...state,
						products: itemsCopy,
						totalPrice: total,
					}
				} else {
					itemInCart.quantity--
					state.totalPrice = state.totalPrice - itemInCart.price
				}
			}
		},
	},
})

export const { addItem, increaseQuantity, decreaseQuantity } =
	basketSlice.actions
