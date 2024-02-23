export enum EUserRole {
    admin = 'admin',
    moderator = 'moderator',
    user = 'user',
}

export type TMeResponse = {
    id: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
    roles: EUserRole[]
    verified: true
}

export type TUsersPayload = {
    page?: number
    perPage?: number
    simpleFilter?: string
    sort?: string[]
    roleFilter?: EUserRole
    createDatePeriod?: string
    updateDatePeriod?: string
}

export type TUserEntity = {
    id: number,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    roles: EUserRole[]
    verified: boolean
}

export type TUsersResponse = {
    list: TUserEntity[]
    totalElements: number,
    totalPages: number,
    currentPage: number,
    elementsPerPage: number
}