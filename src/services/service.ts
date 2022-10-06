import axios from 'axios'

const baseUrl = 'http://localhost:3001/'

export const getAllCompanies = async () => {
	const response = await axios.get(baseUrl + 'companies')
	return response.data
}

export const getAllItems = async () => {
	const response = await axios.get(baseUrl + 'items')
	return response.data
}
