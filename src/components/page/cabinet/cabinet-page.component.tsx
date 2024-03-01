import { FC, useEffect, useMemo } from 'react'
import { Box, CircularProgress, Grid } from '@mui/material'
import { theme } from '../../theme/theme'
import { AlexDataView } from '../../../shared-react-components/formUtils/AlexDataView/AlexDataView'
import { useLazyQuery, useQuery } from '@apollo/client'
import { CabinetPageGetMeDocument, CabinetPageGetMeQuery } from '../../../types/graphql/graphql.ts'


interface IProps {
}

export const CabinetPage: FC<IProps> = () => {
    const [lazyGetMeQuery, {
        data: getMeQueryData,
        loading: getMeQueryDataLoading,
    }] = useLazyQuery<CabinetPageGetMeQuery>(CabinetPageGetMeDocument)

    useEffect(() => {
        lazyGetMeQuery()
    },[])

    const meData = useMemo(() => getMeQueryData?.user.recordMe, [getMeQueryData])

    return meData && (
        <Box sx={{
            width: '100%',
            display: 'flex',
            height: '100%',
            flex: 1,
            overflowY: 'scroll',
        }}>
            {getMeQueryDataLoading && (
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
            {!getMeQueryDataLoading && (
                <Box sx={{
                    width: '100%',
                    padding: theme.spacing(2),
                    boxSizing: 'border-box',
                }}>
                    <Grid container spacing={theme.spacing(2)}>
                        <Grid item xs={6}>
                            <AlexDataView label={'ID'}>
                                {meData.id}
                            </AlexDataView>
                        </Grid>
                        <Grid item xs={6}>
                            <AlexDataView label={'Почта'}>
                                {meData.email}
                            </AlexDataView>
                        </Grid>
                        <Grid item xs={6}>
                            <AlexDataView label={'Дата регистрации'}>
                                {meData.createdAt.toString()}
                            </AlexDataView>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    )
}