import React, { FC, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { theme } from '../../theme/theme'
import { AlexDataView } from '../../../shared-react-components/form-utils/AlexDataView/AlexDataView'
import { useLazyQuery } from '@apollo/client'
import {
    UserCardGetUserRecordDocument,
    UserCardGetUserRecordQuery,
    UserCardGetUserRecordQueryVariables,
} from '../../../types/graphql/graphql.ts'
import { AlexContentProvider } from '../../../shared-react-components/alex-content/alex-content-provider.component.tsx'
import { AlexChip } from '../../../shared-react-components/AlexChip/AlexChip.tsx'
import { EERoleToRusName } from '../../enum/erole-to-rus-name.enum.ts'

export const UserCard: FC = () => {
    const [searchParams] = useSearchParams()

    const [lazyGetUserRecord, {
        data: getUserRecordQueryData,
        loading: getUserRecordQueryLoading,
    }] = useLazyQuery<UserCardGetUserRecordQuery>(UserCardGetUserRecordDocument)

    useEffect(() => {
        const id = searchParams.get('id')
        if (id) {
            lazyGetUserRecord({
                variables: {
                    input: {
                        id: id,
                    },
                } as UserCardGetUserRecordQueryVariables,
            })
        }
    }, [searchParams])

    const userData = useMemo(() => getUserRecordQueryData?.user.record, [getUserRecordQueryData])

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
            {(!getUserRecordQueryLoading && userData) && (
                <Box sx={{
                    width: '100%',
                    padding: theme.spacing(2),
                    boxSizing: 'border-box',
                }}>
                    <AlexContentProvider pointConfig={[
                        {
                            name: 'main',
                            title: 'Основная информация',
                            body: (
                                <Grid container spacing={theme.spacing(2)}>
                                    <Grid item xs={6}>
                                        <AlexDataView label={'ID'}>
                                            {userData.id}
                                        </AlexDataView>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AlexDataView label={'Почта'}>
                                            {userData.email}
                                        </AlexDataView>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AlexDataView label={'Роль сервиса авторизации'}>
                                            <Box>
                                                <AlexChip label={EERoleToRusName[userData.role]} sx={{ width: '100px' }}/>
                                            </Box>
                                        </AlexDataView>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AlexDataView label={'Дата создания'}>
                                            {userData.createdAt}
                                        </AlexDataView>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AlexDataView label={'Дата последнего изменения'}>
                                            {userData.updatedAt}
                                        </AlexDataView>
                                    </Grid>
                                </Grid>
                            ),
                        },
                        {
                            name: 'externalServices',
                            title: 'Внешние сервисы',
                            body: (<>
                                {userData.externalServices.length ? (
                                    <Stack direction={'row'} spacing={theme.spacing(1)}>
                                        {userData.externalServices.map((item) => (
                                            <AlexChip label={`${item.name}`} key={item.id}/>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography variant={'subtitle1'} height={'1000px'}>Пользователь не подключён ни к одному внешнему сервису</Typography>
                                )}
                            </>),
                        },
                        {
                            name: 'externalRoles',
                            title: 'Роли во внешних сервисах',
                            body: (<>
                                {userData.externalServices.length ? (
                                    <Stack direction={'row'} spacing={theme.spacing(1)}>
                                        {userData.externalRoles.map((item) => (
                                            <AlexChip label={`${item.externalService.name}:${item.name}`} key={item.id}/>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography variant={'subtitle1'}>Пользователь не имеет ролей во внешних сервисах</Typography>
                                )}
                            </>),
                        },
                    ]}/>
                </Box>)}
        </Box>
    )
}