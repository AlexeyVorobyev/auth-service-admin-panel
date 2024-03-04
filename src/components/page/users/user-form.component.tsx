import React, { FC, useEffect, useLayoutEffect } from 'react'
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
    TUserUpdateInput,
    UserCardGetUserRecordDocument,
    UserCardGetUserRecordQuery,
    UserCardGetUserRecordQueryVariables,
    UserFormCreateUserDocument,
    UserFormCreateUserMutation, UserFormCreateUserMutationVariables,
    UserFormUpdateUserDocument,
    UserFormUpdateUserMutation,
} from '../../../types/graphql/graphql.ts'
import { EERoleToRusName } from '../../enum/erole-to-rus-name.enum.ts'
import { AlexContentProvider } from '../../../shared-react-components/alex-content/alex-content-provider.component.tsx'
import { validEmail, validPassword } from '../../../shared-react-components/form-utils/Regex/regex.ts'
import { AlexSelect } from '../../../shared-react-components/form-utils/AlexSelect/AlexSelect.tsx'

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

    const [updateUserMutation] = useMutation<UserFormUpdateUserMutation>(UserFormUpdateUserDocument)

    const [createUserMutation] = useMutation<UserFormCreateUserMutation>(UserFormCreateUserDocument)

    const [lazyGetUserRecord, {
        data: getUserRecordQueryData,
        loading: getUserRecordQueryLoading,
    }] = useLazyQuery<UserCardGetUserRecordQuery>(UserCardGetUserRecordDocument)

    useEffect(() => {
        const id = searchParams.get('id')
        if (id && edit) {
            lazyGetUserRecord({
                variables: {
                    input: {
                        id: id,
                    },
                } as UserCardGetUserRecordQueryVariables,
            }).then((response) => {
                reset(response.data?.user.record)
            })
        }
    }, [searchParams, edit])

    const update = (data: TUserUpdateInput) => {
        DEBUG && console.log('data UPDATE', data)
        // updateEvent({
        //     id: searchParams.get('id')!,
        //     body: {
        //         ...(data.eventDate && { eventDate: data.eventDate }),
        //         ...(data.eventDesc && { eventDesc: data.eventDesc }),
        //         ...(data.eventName && { eventName: data.eventName }),
        //         ...((data.eventCompletion == false || data.eventCompletion) && { eventCompletion: data.eventCompletion }),
        //         ...(data.tags && { tags: data.tags.map((item: any) => item.id) }),
        //     },
        // })
        //     .then(() => {
        //         if (searchParams.get('from')) {
        //             navigate(JSON.parse(searchParams.get('from')!))
        //         } else {
        //             navigate('./../table')
        //         }
        //     })
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
                                                                 regex: (valueToCheck: string) => (validEmail.test(valueToCheck)) || 'Некорректный формат почты',
                                                             }}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AlexInputControlled name={'password'} required={!edit}
                                                             label={edit ? 'Сменить пароль' : 'Пароль'}
                                                             inputType={EInputType.password}
                                                             error={Boolean(errors.password)}
                                                             errorText={errors.password?.message as string | undefined}
                                                             validateFunctions={{
                                                                 regex: (valueToCheck: string) => (validPassword.test(valueToCheck)) || '8 символов, заглавная и строчная буква',
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