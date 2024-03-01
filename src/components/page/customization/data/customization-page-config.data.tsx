import { UsersTable } from "../../users/users-table.component";
import { EPageType, TCustomizationPageConfig } from '../customization-page.component.tsx'
import { UsersTableDeleteUserByIdDocument } from '../../../../types/graphql/graphql.ts'


export const customizationPageConfig: Map<string, TCustomizationPageConfig> = new Map([
    ['users',
        {
            deleteQueryDocument: UsersTableDeleteUserByIdDocument,
            [EPageType.table]: {
                component: <UsersTable/>,
                title: 'пользователей',
                button: 'новый пользователь',
            },
            // [EPageType.view]: {
            //     component: <EventsCardComponent/>,
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