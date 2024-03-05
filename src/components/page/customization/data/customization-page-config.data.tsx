import { UsersTable } from "../../users/users-table.component";
import { EPageType, TCustomizationPageConfig } from '../customization-page.component.tsx'
import { UsersTableDeleteUserByIdDocument } from '../../../../types/graphql/graphql.ts'
import { UserCard } from '../../users/user-card.component.tsx'
import { UserForm } from '../../users/user-form.component.tsx'
import { ExternalServicesTable } from '../../external-services/external-services-table.component.tsx'


export const customizationPageConfig: Map<string, TCustomizationPageConfig> = new Map([
    ['users',
        {
            deleteQueryDocument: UsersTableDeleteUserByIdDocument,
            [EPageType.table]: {
                component: <UsersTable/>,
                title: 'пользователей',
                button: 'нового пользователя',
            },
            [EPageType.view]: {
                component: <UserCard/>,
                button: 'пользователя',
            },
            [EPageType.add]: {
                component: UserForm,
                title: 'пользователя',
            },
            [EPageType.edit]: {
                component: UserForm,
                title: 'пользователя',
            },
        },
    ],
    ['externalServices',
        {
            deleteQueryDocument: UsersTableDeleteUserByIdDocument,
            [EPageType.table]: {
                component: <ExternalServicesTable/>,
                title: 'внешних сервисов',
                button: 'нового внешнего сервиса',
            },
            // [EPageType.view]: {
            //     component: <UserCard/>,
            //     button: 'внешнего сервиса',
            // },
            // [EPageType.add]: {
            //     component: UserForm,
            //     title: 'внешнего сервиса',
            // },
            // [EPageType.edit]: {
            //     component: UserForm,
            //     title: 'внешнего сервиса',
            // },
        },
    ],
])