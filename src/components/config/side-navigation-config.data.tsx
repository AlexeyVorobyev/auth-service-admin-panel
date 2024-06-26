
import { AlexIcon } from '../../shared-react-components/alex-icon/alex-icon.component.tsx'
import { EIconToNameMap } from '../../shared-react-components/alex-icon/alex-icon-icon-to-name-map.data.ts'
import { TSideNavigationConfig } from '../../shared-react-components/AlexSideNavigation/AlexSideNavigation.tsx'
import { EPageType } from '../page/customization/customization-page.component.tsx'

export const sideNavigationConfig: TSideNavigationConfig[] = [
    {
        path: '/',
        name: 'Главная',
        icon: <AlexIcon icon={EIconToNameMap.barChart}/>,
    },

    {
        path: `customization/users/${EPageType.table}`,
        name: 'Настройка пользователей',
        icon: <AlexIcon icon={EIconToNameMap.manageAccounts}/>,
    },

    {
        path: `customization/externalServices/${EPageType.table}`,
        name: 'Настройка внешних сервисов',
        icon: <AlexIcon icon={EIconToNameMap.link}/>,
    },

    {
        path: `customization/externalRoles/${EPageType.table}`,
        name: 'Настройка внешних ролей',
        icon: <AlexIcon icon={EIconToNameMap.assignment}/>,
    },

    // {
    //     path: `customization/tags/${EPageType.table}`,
    //     name: 'Настройка тегов',
    //     icon: <AlexIcon iconName={EIconToNameMap.tag}/>,
    // },
]