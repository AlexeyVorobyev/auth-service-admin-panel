import { UsersTable } from "../../users/users-table.component";
import { EPageType, TCustomizationPageConfig } from '../customization-page.component.tsx'
import {
    ExternalRolesTableDeleteExternalRoleByIdDocument,
    ExternalServicesTableDeleteExternalServiceByIdDocument,
    UsersTableDeleteUserByIdDocument,
} from '../../../../types/graphql/graphql.ts'
import { UserCard } from '../../users/user-card.component.tsx'
import { ExternalServicesTable } from '../../external-services/external-services-table.component.tsx'
import { ExternalServiceCard } from '../../external-services/external-service-card.component.tsx'
import { ExternalServiceForm } from '../../external-services/external-service-form.component.tsx'
import { UserForm } from '../../users/user-form.component.tsx'
import { ExternalRolesTable } from '../../external-roles/external-roles-table.component.tsx'


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
            deleteQueryDocument: ExternalServicesTableDeleteExternalServiceByIdDocument,
            [EPageType.table]: {
                component: <ExternalServicesTable/>,
                title: 'внешних сервисов',
                button: 'новый внешний сервис',
            },
            [EPageType.view]: {
                component: <ExternalServiceCard/>,
                button: 'внешний сервис',
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
    ['externalRoles',
        {
            deleteQueryDocument: ExternalRolesTableDeleteExternalRoleByIdDocument,
            [EPageType.table]: {
                component: <ExternalRolesTable/>,
                title: 'внешних ролей',
                button: 'новую внешнюю роль',
            },
            // [EPageType.view]: {
            //     component: <ExternalServiceCard/>,
            //     button: 'внешней роли',
            // },
            // [EPageType.add]: {
            //     component: ExternalServiceForm,
            //     title: 'внешней роли',
            // },
            // [EPageType.edit]: {
            //     component: ExternalServiceForm,
            //     title: 'внешней роли',
            // },
        },
    ],
])