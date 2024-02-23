import { FC, useEffect } from 'react'
import { UsersTableColumns } from './columns'
import { varsBehaviourMapUsers } from './varsBehaviourMapUsers.ts'
import { useLocation } from 'react-router-dom'
import { PER_PAGE_OPTIONS } from '../../../globalConstants.ts'
import { AlexDataTable } from '../../../shared-react-components/AlexDataTable/AlexDataTable.tsx'
import {
    EUsePageStateMode,
    useAlexPageState,
} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import { alexFiltersMap } from '../../config/alexFiltersMap.tsx'
import { useLazyUsersQuery } from '../../../core/redux/api/user.api.ts'

export const UsersTable: FC = () => {
    const [lazyUsersQuery, result] = useLazyUsersQuery()
    // const [deleteUser] = useUserDeleteMutation()

    const {
        variables,
        storedOptions: serverSideOptions,
        setStoredOptions: setServerSideOptions,
    } = useAlexPageState({
        varsBehaviorMap: varsBehaviourMapUsers,
        modeWrite: [
            EUsePageStateMode.localStorage,
            EUsePageStateMode.queryString
        ],
        modeRead: [
            EUsePageStateMode.queryString,
            EUsePageStateMode.localStorage
        ],
        storageKey: 'usersTableStorage',
        defaultValue: new Map([
            ['perPage', 10],
            ['page', 0]
        ] as [string, any][]),
    })

    useEffect(() => {
        variables && lazyUsersQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={UsersTableColumns}
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
                           // view: {
                           //     columnName: 'id',
                           //     path: `./../${EPageType.view}`,
                           //     params: new URLSearchParams([
                           //         ['from', JSON.stringify(location.pathname + location.search)],
                           //     ]),
                           // },
                           // edit: {
                           //     columnName: 'id',
                           //     path: `./../${EPageType.edit}`,
                           //     params: new URLSearchParams([
                           //         ['from', JSON.stringify(location.pathname + location.search)],
                           //     ]),
                           // },
                           // delete: {
                           //     columnName: 'eventId',
                           //     mutation: deleteUser,
                           //     showModal: true,
                           // },
                       }}/>
    )
}