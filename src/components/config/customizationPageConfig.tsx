import { EventsCard } from '../pages/EventsPage/EventsCard'
import { EventsForm } from '../pages/EventsPage/EventsForm'
import { EventsTable } from '../pages/EventsPage/EventsTable'
import { EPageType, TCustomizationPageConfig } from '../pages/СustomizationPage/СustomizationPage'
import { endpoints } from '../../core/redux/api/events.api.ts'

export const customizationPageConfig: Map<string, TCustomizationPageConfig> = new Map([
    ['events',
        {
            deleteQuery: (id: any) => endpoints.eventDelete.initiate(id),
            [EPageType.table]: {
                component: <EventsTable/>,
                title: 'событий',
                button: 'новое событие',
            },
            [EPageType.view]: {
                component: <EventsCard/>,
                button: 'событие',
            },
            [EPageType.add]: {
                component: EventsForm,
                title: 'события',
            },
            [EPageType.edit]: {
                component: EventsForm,
                title: 'события',
            },
        },
    ],
])