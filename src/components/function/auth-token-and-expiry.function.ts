
interface IGetTokensAndExpiryReturnValue {
	refreshToken: string | null,
	refreshExpiry: string | null,
	accessToken: string | null,
	accessExpiry: string | null
}

export const getTokensAndExpiry = (): IGetTokensAndExpiryReturnValue => {
	return {
		refreshToken: localStorage.getItem('refreshToken'),
		refreshExpiry: localStorage.getItem('refreshExpiry'),
		accessToken: localStorage.getItem('accessToken'),
		accessExpiry: localStorage.getItem('accessExpiry'),
	}
}