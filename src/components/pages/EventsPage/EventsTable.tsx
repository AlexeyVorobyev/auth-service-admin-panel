import { FC, useEffect } from 'react'
import { EventsTableColumns } from './columns'
import { varsBehaviourMapEvents } from './varsBehaviourMapEvents.ts'
import { EPageType } from '../СustomizationPage/СustomizationPage'
import { useLocation } from 'react-router-dom'
import { PER_PAGE_OPTIONS } from '../../../globalConstants.ts'
import { useEventDeleteMutation, useLazyEventsQuery } from '../../../core/redux/api/events.api.ts'
import { AlexDataTable } from '../../../shared-react-components/AlexDataTable/AlexDataTable.tsx'
import { useAlexPageState } from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import { alexFiltersMap } from '../../config/alexFiltersMap.tsx'

export const EventsTable: FC = () => {
    const [lazyEventsQuery, result] = useLazyEventsQuery()
    const [deleteEvent] = useEventDeleteMutation()

    const {
        variables,
        storedOptions: serverSideOptions,
        setStoredOptions: setServerSideOptions,
    } = useAlexPageState({
        varsBehaviorMap: varsBehaviourMapEvents,
        defaultValue: new Map([
            ['perPage', 10],
        ] as [string, any][]),
    })

    useEffect(() => {
        variables && lazyEventsQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={EventsTableColumns}
                       data={result?.currentData?.list}
                       filtersMap={alexFiltersMap}
                       availablePages={result?.currentData?.totalPages}
                       perPageOptions={PER_PAGE_OPTIONS}
                       availableElements={result?.currentData?.totalElements}
                       columnsSelect simpleFilter footer downloadCSV
                       filterListIds={[
                           'tagFilter',
                       ]}
                       serverSideOptions={serverSideOptions}
                       setServerSideOptions={setServerSideOptions}
                       actionsConfig={{
                           view: {
                               columnName: 'eventId',
                               path: `./../${EPageType.view}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)],
                               ]),
                           },
                           edit: {
                               columnName: 'eventId',
                               path: `./../${EPageType.edit}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)],
                               ]),
                           },
                           delete: {
                               columnName: 'eventId',
                               mutation: deleteEvent,
                               showModal: true,
                           },
                       }}/>
    )
}