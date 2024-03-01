
import { AlexIcon } from '../../shared-react-components/AlexIcon/AlexIcon.tsx'
import { EIconToNameMap } from '../../shared-react-components/AlexIcon/AlexIconIconToNameMap.ts'
import { TSideNavigationConfig } from '../../shared-react-components/AlexSideNavigation/AlexSideNavigation.tsx'
import { EPageType } from '../page/customization/customization-page.component.tsx'

export const sideNavigationConfig: TSideNavigationConfig[] = [
    {
        path: '/',
        name: 'Главная',
        icon: <AlexIcon iconName={EIconToNameMap.schedule}/>,
    },

    {
        path: `customization/users/${EPageType.table}`,
        name: 'Настройка пользователей',
        icon: <AlexIcon iconName={EIconToNameMap.schedule}/>,
    },

    // {
    //     path: `customization/tags/${EPageType.table}`,
    //     name: 'Настройка тегов',
    //     icon: <AlexIcon iconName={EIconToNameMap.tag}/>,
    // },
]