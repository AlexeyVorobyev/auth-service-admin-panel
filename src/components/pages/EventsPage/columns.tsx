import {ICustomDataTableColumn} from "../../../shared-react-components/AlexDataTable/AlexDataTable"
import {theme} from "../../theme/theme.ts"
import { TEventEntity } from '../../../core/redux/api/types/events.ts'
import { AlexCheckBox } from '../../../shared-react-components/formUtils/AlexCheckBox/AlexCheckBox.tsx'

export const EventsTableColumns: ICustomDataTableColumn[] = [
	{
		id: 'eventId',
		label: 'ID',
		format: (value: TEventEntity) => value.eventId.toString(),
		display: false,
		sort: false
	},
	{
		id: 'eventName',
		label: 'Название',
		sort: false
	},
	{
		id: 'eventDesc',
		label: 'Описание',
		sort: false
	},
	{
		id: 'eventDate',
		label: 'Дата',
		sort: false
	},
	{
		id: 'eventCompletion',
		label: 'Выполнено',
		sort: false,
		format: (value:TEventEntity) => {
			return (
				<AlexCheckBox value={value.eventCompletion} size={30} disabled color={{
					outline:theme.palette.primary.dark,
					checked:theme.palette.primary.main
				}}/>
			)
		}
	},
]

