import React, { FC, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { theme } from '../../theme/theme'
import {
    AlexInputControlled,
    EInputType,
} from '../../../shared-react-components/form-utils/AlexInput/AlexInputControlled.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { extractIds } from '../../../shared-react-components/functions/extractIds'
import {
    AlexCheckBoxControlled,
} from '../../../shared-react-components/form-utils/AlexCheckBox/AlexCheckBoxControlled.tsx'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
    ERole,
    TUserCreateInput,
    TUserUpdatePayloadInput,
    UserCardGetUserRecordDocument,
    UserCardGetUserRecordQuery,
    UserCardGetUserRecordQueryVariables,
    UserFormCreateUserDocument,
    UserFormCreateUserMutation,
    UserFormCreateUserMutationVariables,
    UserFormUpdateUserDocument,
    UserFormUpdateUserMutation,
    UserFormUpdateUserMutationVariables, UsersTableGetUserListDocument,
} from '../../../types/graphql/graphql.ts'
import { EERoleToRusName } from '../../enum/erole-to-rus-name.enum.ts'
import { AlexContentProvider } from '../../../shared-react-components/alex-content/alex-content-provider.component.tsx'
import { validEmail, validPassword } from '../../../shared-react-components/form-utils/Regex/regex.ts'
import { AlexSelect } from '../../../shared-react-components/form-utils/AlexSelect/AlexSelect.tsx'
import { updatedDiff } from 'deep-object-diff'

interface IUserFormProps {
    setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
    edit: boolean
}

const DEBUG = true

export const UserForm: FC<IUserFormProps> = ({
                                                 setOnSubmitFunc,
                                                 edit,
                                             }) => {
    const { formState: { errors }, reset } = useFormContext()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [updateUserMutation] = useMutation<UserFormUpdateUserMutation>(UserFormUpdateUserDocument, {
        refetchQueries: [
            UsersTableGetUserListDocument,
            UserCardGetUserRecordDocument,
        ],
    })

    const [createUserMutation] = useMutation<UserFormCreateUserMutation>(UserFormCreateUserDocument, {
        refetchQueries: [
            UsersTableGetUserListDocument,
            UserCardGetUserRecordDocument,
        ],
    })

    const [lazyGetUserRecord, {
        data: getUserRecordQueryData,
        loading: getUserRecordQueryLoading,
    }] = useLazyQuery<UserCardGetUserRecordQuery>(UserCardGetUserRecordDocument)

    const id = useMemo(() => searchParams.get('id'), [searchParams])

    useEffect(() => {
        if (id && edit) {
            lazyGetUserRecord({
                variables: {
                    input: {
                        id: id,
                    },
                } as UserCardGetUserRecordQueryVariables,
            })
        }
    }, [id])

    useEffect(() => {
        if (getUserRecordQueryData) {
            savedData.current = getUserRecordQueryData.user.record
            reset({
                email: getUserRecordQueryData.user.record.email,
                role: getUserRecordQueryData.user.record.role,
                externalRoles: getUserRecordQueryData.user.record.externalRoles,
                externalServices: getUserRecordQueryData.user.record.externalServices,
                verified: getUserRecordQueryData.user.record.verified,
            })
        }
    }, [getUserRecordQueryData])

    const savedData = useRef<UserCardGetUserRecordQuery['user']['record'] | null>(null)

    const update = (data: TUserUpdatePayloadInput) => {
        DEBUG && console.log('data UPDATE', data)
        DEBUG && console.log('data UPDATE initial', savedData.current)
        DEBUG && console.log('data UPDATE diff', updatedDiff(savedData.current!, data))
        updateUserMutation({
            variables: {
                input: {
                    id: id,
                    payload: updatedDiff(savedData.current!, data),
                },
            } as UserFormUpdateUserMutationVariables,
        })
            .then((response) => {
                console.log('promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const add = (data: TUserCreateInput) => {
        DEBUG && console.log('data ADD', data)
        createUserMutation({
            variables: {
                input: data,
            } as UserFormCreateUserMutationVariables,
        })
            .then((response) => {
                console.log('promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const onSubmit = (data: any) => {
        DEBUG && console.log('data BEFORE processing', data)
        data = extractIds(data)

        if (edit) {
            DEBUG && console.log('data AFTER processing', data)
            update(data)
        } else {
            DEBUG && console.log('data AFTER processing', data)
            add(data)
        }
    }

    useLayoutEffect(() => {
        setOnSubmitFunc({ callback: onSubmit })
    }, [])

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flex: 1,
            overflowY: 'scroll',
        }}>
            {getUserRecordQueryLoading && (
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CircularProgress/>
                </Box>
            )}
            {!getUserRecordQueryLoading && (
                <Box sx={{
                    width: '100%',
                    padding: theme.spacing(2),
                    boxSizing: 'border-box',
                    height: '100%',
                }}>
                    <AlexContentProvider pointConfig={[
                        {
                            name: 'main',
                            title: 'Основная информация',
                            body: (
                                <Grid container spacing={theme.spacing(2)}>
                                    <Grid item xs={6}>
                                        <AlexInputControlled name={'email'} required label={'Почта'}
                                                             inputType={EInputType.email}
                                                             error={Boolean(errors.email)}
                                                             autoFocus
                                                             errorText={errors.email?.message as string | undefined}
                                                             validateFunctions={{
                                                                 regex: (valueToCheck: string) => (validEmail.test(valueToCheck) || !valueToCheck.length) || 'Некорректный формат почты',
                                                             }}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AlexInputControlled name={'password'} required={!edit}
                                                             label={edit ? 'Сменить пароль' : 'Пароль'}
                                                             inputType={EInputType.password}
                                                             error={Boolean(errors.password)}
                                                             errorText={errors.password?.message as string | undefined}
                                                             validateFunctions={{
                                                                 regex: (valueToCheck: string) => (validPassword.test(valueToCheck) || !valueToCheck.length) || '8 символов, заглавная и строчная буква',
                                                             }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AlexSelect name={'role'} required
                                                    error={Boolean(errors.role)}
                                                    label={'Роль сервиса авторизации'}
                                                    errorText={errors.role?.message as string | undefined}
                                                    options={
                                                        Object.values(ERole).map((item) => {
                                                            return {
                                                                id: item,
                                                                name: EERoleToRusName[item],
                                                            }
                                                        })
                                                    }/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AlexCheckBoxControlled name={'verified'} size={30}
                                                                label={'Пользователь подтверждён'}
                                                                color={{
                                                                    outline: theme.palette.grey['800'],
                                                                    checked: theme.palette.primary.main,
                                                                }}/>
                                    </Grid>
                                </Grid>
                            ),
                        },
                        {
                            name: 'externalServices',
                            title: 'Внешние сервисы',
                            body: (<>
                            </>),
                        },
                        {
                            name: 'externalRoles',
                            title: 'Роли во внешних сервисах',
                            body: (<>
                            </>),
                        },
                    ]}/>
                </Box>
            )}
        </Box>
    )
}