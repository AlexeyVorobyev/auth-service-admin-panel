import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {Box, Stack, Typography, useTheme} from '@mui/material'
import useWindowSize from '../../../shared-react-components/functions/useWindowSize.tsx'
import {ReactChart} from '../../../shared-react-components/alex-react-chart/ReactChart.tsx'
import {AlexDataView} from '../../../shared-react-components/form-utils/AlexDataView/AlexDataView.tsx'
import {
    EUsePageStateMode,
    useAlexPageState,
} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {TTimeAgg} from '../../../shared-react-components/alex-react-chart/types/time-agg.type.ts'
import {ETimeAggregation} from '../../../shared-react-components/alex-react-chart/enums/ETimeAggregation.ts'
import {ERangeType} from '../../../shared-react-components/alex-react-chart/enums/range-type.enum.ts'
import {mainPageVarsBehaviourMap} from './main-page-vars-behaviour-map.ts'
import {dateBuilder} from '../../../shared-react-components/functions/date-builder.ts'
import ChoosePeriod from '../../../shared-react-components/alex-react-chart/choose-period/choose-period.tsx'
import Aggregation from '../../../shared-react-components/alex-react-chart/aggregation/Aggregation.tsx'

export enum EStoredOptionsMainPage {
    timeAgg = 'timeAgg',
}

export const MainPage: FC = () => {
    const {
        storedOptions,
        setStoredOptions,
        variables
    } = useAlexPageState<any>({
        modeRead: [
            EUsePageStateMode.queryString,
            EUsePageStateMode.localStorage,
        ],
        modeWrite: [
            EUsePageStateMode.queryString,
            EUsePageStateMode.localStorage,
        ],
        storageKey: 'mapsPageSettings',
        varsBehaviorMap: mainPageVarsBehaviourMap,
        defaultValue: new Map<EStoredOptionsMainPage, any>([
            [EStoredOptionsMainPage.timeAgg, {
                periodStorage: ERangeType.WEEK,
                startDash: dateBuilder({ date: new Date().getDate() - 7 })(),
                endDash: new Date(),
                aggregation: ETimeAggregation.DAY
            } as TTimeAgg],
        ])
    })

    const theme = useTheme()

    const refBox = useRef<HTMLDivElement | null>(null)
    const [windowHeight, setWindowHeight] = useState<number | null>(null)

    const windowSize = useWindowSize()
    useEffect(() => {
        refBox.current && setWindowHeight(refBox.current.offsetHeight)
    }, [windowSize])

    const timeAgg: TTimeAgg | undefined = useMemo(() => storedOptions.get(EStoredOptionsMainPage.timeAgg), [storedOptions])

    const handleSetTimeAgg = (value: TTimeAgg) => {
        setStoredOptions((prevState) => {
            prevState.set(EStoredOptionsMainPage.timeAgg, value)
            return new Map(prevState)
        })
    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flex: 1,
            overflowY: 'scroll',
            height: '100%',
        }}>
            <Stack direction={'column'} gap={theme.spacing(3)} padding={theme.spacing(3)} boxSizing={'border-box'} width={'100%'} flex={1}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

                    <Stack direction={'row'} spacing={'20px'} alignItems={'center'}>
                        <Typography variant={'h4'}>Общее количество пользователей: 0</Typography>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(3)}>
                        <Stack direction={'row'} spacing={'20px'} alignItems={'center'}>
                            <Typography variant={'h4'}>Выберите период</Typography>
                            <Box width={'300px'}>
                                {timeAgg && (
                                    <ChoosePeriod timeAgg={timeAgg}
                                                  setTimeAgg={handleSetTimeAgg}/>
                                )}
                            </Box>
                        </Stack>

                        <Stack direction={'row'} spacing={'20px'} alignItems={'center'}>
                            <Typography variant={'h4'}>Агрегация</Typography>
                            <Box width={'200px'}>
                                {timeAgg && (
                                    <Aggregation timeAgg={timeAgg}
                                                 setTimeAgg={handleSetTimeAgg}/>
                                )}
                            </Box>
                        </Stack>
                    </Stack>

                </Stack>
                <Stack alignItems={'center'} justifyContent={'center'} flex={1} ref={refBox}>
                    {windowHeight && (
                        <ReactChart
                            height={windowHeight}
                            useButtonForGraphType
                            useButtonForTitle
                            useButtonForLegend
                            useDialogReactChart
                            useButtonForThresholds
                            styles={{
                                paper: {
                                    width: '100%'
                                }
                            }}/>
                    )}
                </Stack>
            </Stack>
        </Box>
    )
}