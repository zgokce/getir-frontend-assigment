import IItem from '../interfaces/item.interface'
import IFilter from '../interfaces/filter.interface'

export const getTags = (items: IItem[]) => {
	const tags: string[] = []
	items.map((item) => {
		item.tags.map((tag) => tags.push(tag))
	})
	return Array.from(new Set(tags))
}

export const searchTags = (items: IItem[], searchValue: string) => {
	const tags = getTags(items)
	const search = tags.filter((value) => value.includes(searchValue))
	return search
}

export const getTagCount = (items: IItem[], tagName: string) => {
	let count = 0
	items.map((item) => {
		item.tags.map((tag) => {
			if (tag === tagName) {
				count++
			}
		})
	})
	return count
}

export const sortItems = (items: IItem[], type: string) => {
	if (type === 'low-to-high') {
		return [...items].sort((a, b) => {
			return a.price - b.price
		})
	}
	if (type === 'high-to-low') {
		return [...items].sort((a, b) => {
			return b.price - a.price
		})
	}
	if (type === 'new-to-old') {
		return [...items].sort((a, b) => {
			return b.added - a.added
		})
	}
	if (type === 'old-to-new') {
		return [...items].sort((a, b) => {
			return a.added - b.added
		})
	}
}

export const filterByBrands = (items: IItem[], brandNames: string[]) => {
	const brandFilter: IItem[] = []
	items.map((product) => {
		if (brandNames.includes(product.manufacturer)) {
			brandFilter.push(product)
		}
	})
	return brandFilter
}

export const filterByTags = (items: IItem[], tags: string[]) => {
	const tagFilter: IItem[] = []
	items.map((product) => {
		product.tags.map((tag) => {
			if (tags.includes(tag)) {
				tagFilter.push(product)
			}
		})
	})
	return tagFilter
}

export const filterByItemType = (items: IItem[], itemType: string) => {
	const itemTypeFilter: IItem[] = []
	items.map((product) => {
		if (product.itemType === itemType) {
			itemTypeFilter.push(product)
		}
	})
	return itemTypeFilter
}

export const filterItems = (filters: IFilter, items: IItem[]) => {
	let filteredProducts: IItem[] = [...items]
	if (filters.brands && filters.brands.length > 0) {
		filteredProducts = filterByBrands(filteredProducts, filters.brands)
	}
	if (filters.tags && filters.tags.length > 0) {
		filteredProducts = filterByTags(filteredProducts, filters.tags)
	}
	if (filters.itemType && filters.itemType !== '') {
		filteredProducts = filterByItemType(filteredProducts, filters.itemType)
	}
	if (filters.sorting && filters.sorting !== '') {
		const sorted = sortItems(filteredProducts, filters.sorting)
		if (sorted) {
			return sorted
		}
	}
	return filteredProducts
}
