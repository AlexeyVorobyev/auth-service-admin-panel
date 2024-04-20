import {EStoredOptionsMainPage} from './main-page.component.tsx'
import {TTimeAgg} from '../../../shared-react-components/alex-react-chart/types/time-agg.type.ts'


export const mainPageVarsBehaviourMap = (params: any): any => {
    const timeAgg = params[EStoredOptionsMainPage.timeAgg] as TTimeAgg

    // return {
    //     aggregation: {
    //         aggregateBy: AggregateType[timeAgg.aggregation],
    //         range: {
    //             startDateTime: (new Date(timeAgg.startDash)).toISOString(),
    //             endDateTime: (new Date(timeAgg.endDash)).toISOString()
    //         }
    //     },
    // } as TGraphsPageVariables
    return {

    }
}