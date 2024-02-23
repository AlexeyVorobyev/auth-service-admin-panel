import {FC, useMemo} from 'react'
import {Box, CircularProgress, Grid} from '@mui/material'
import {theme} from '../../theme/theme'
import {AlexDataView} from '../../../shared-react-components/formUtils/AlexDataView/AlexDataView'
import { useMeQuery } from '../../../core/redux/api/auth.api.ts'
import { TMeResponse } from '../../../core/redux/api/types/auth.ts'

interface IProps {
}

export const CabinetPage: FC<IProps> = () => {

    const {
        data,
        isFetching,
        isLoading,
        isSuccess
    } = useMeQuery(undefined)
    const meData = useMemo(() => data as TMeResponse, [data])

    console.debug('ME_DATA', meData, data)

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            height: '100%',
            flex: 1,
            overflowY: 'scroll',
        }}>
            {(isLoading || isFetching || !isSuccess) && (<Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress/>
            </Box>)}
            {(!isLoading && !isFetching && isSuccess) && (<Box sx={{
                width: '100%',
                padding: theme.spacing(2),
                boxSizing: 'border-box'
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
            </Box>)}
        </Box>
    )
}