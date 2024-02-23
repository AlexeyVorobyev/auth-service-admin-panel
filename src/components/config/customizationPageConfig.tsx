import { EPageType, TCustomizationPageConfig } from '../pages/СustomizationPage/СustomizationPage'
import { UsersTable } from '../pages/UsersPage/UsersTable.tsx'
import { userEndpoints } from '../../core/redux/api/user.api.ts'

export const customizationPageConfig: Map<string, TCustomizationPageConfig> = new Map([
    ['users',
        {
            deleteQuery: (id: any) => userEndpoints.userDelete.initiate(id),
            [EPageType.table]: {
                component: <UsersTable/>,
                title: 'пользователей',
                button: 'новый пользователь',
            },
            // [EPageType.view]: {
            //     component: <EventsCard/>,
            //     button: 'пользователь',
            // },
            // [EPageType.add]: {
            //     component: EventsForm,
            //     title: 'пользователи',
            // },
            // [EPageType.edit]: {
            //     component: EventsForm,
            //     title: 'пользователя',
            // },
        },
    ],
])