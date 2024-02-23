export type TSignInResponse = {
    accessToken: string,
    accessTokenTTL: Date,
    refreshToken: string,
    refreshTokenTTL: Date
}

export type TRefreshResponse = TSignInResponse

export type TSignInPayload = {
    email: string,
    password: string
}

export type TSignUpPayload = TSignInPayload

