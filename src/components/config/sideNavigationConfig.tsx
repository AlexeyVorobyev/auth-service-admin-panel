import { EPageType } from '../pages/СustomizationPage/СustomizationPage.tsx'
import { AlexIcon } from '../../shared-react-components/AlexIcon/AlexIcon.tsx'
import { EIconToNameMap } from '../../shared-react-components/AlexIcon/AlexIconIconToNameMap.ts'
import { TSideNavigationConfig } from '../../shared-react-components/AlexSideNavigation/AlexSideNavigation.tsx'

export const sideNavigationConfig: TSideNavigationConfig[] = [
    {
        path: '/',
        name: 'Главная',
        icon: <AlexIcon iconName={EIconToNameMap.schedule}/>,
    },

    {
        path: `customization/events/${EPageType.table}`,
        name: 'Настройка событий',
        icon: <AlexIcon iconName={EIconToNameMap.schedule}/>,
    },

    {
        path: `customization/tags/${EPageType.table}`,
        name: 'Настройка тегов',
        icon: <AlexIcon iconName={EIconToNameMap.tag}/>,
    },
]