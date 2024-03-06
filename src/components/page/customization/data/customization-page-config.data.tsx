import { UsersTable } from "../../users/users-table.component";
import { EPageType, TCustomizationPageConfig } from '../customization-page.component.tsx'
import { UsersTableDeleteUserByIdDocument } from '../../../../types/graphql/graphql.ts'
import { UserCard } from '../../users/user-card.component.tsx'
import { ExternalServicesTable } from '../../external-services/external-services-table.component.tsx'
import { ExternalServiceCard } from '../../external-services/external-service-card.component.tsx'
import { ExternalServiceForm } from '../../external-services/external-service-form.component.tsx'
import { UserForm } from '../../users/user-form.component.tsx'


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
                button: 'новый внешний сервис',
            },
            [EPageType.view]: {
                component: <ExternalServiceCard/>,
                button: 'внешнего сервиса',
            },
            [EPageType.add]: {
                component: ExternalServiceForm,
                title: 'внешнего сервиса',
            },
            [EPageType.edit]: {
                component: ExternalServiceForm,
                title: 'внешнего сервиса',
            },
        },
    ],
])