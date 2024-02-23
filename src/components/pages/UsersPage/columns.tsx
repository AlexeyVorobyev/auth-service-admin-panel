import { ICustomDataTableColumn } from '../../../shared-react-components/AlexDataTable/AlexDataTable'
import { theme } from '../../theme/theme.ts'
import { TEventEntity } from '../../../core/redux/api/types/events.ts'
import { AlexCheckBox } from '../../../shared-react-components/formUtils/AlexCheckBox/AlexCheckBox.tsx'
import { TUserEntity } from '../../../core/redux/api/types/user.ts'
import { AlexChip } from '../../../shared-react-components/AlexChip/AlexChip.tsx'
import { Stack } from '@mui/material'

export const UsersTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'ID',
        display: false,
    },
    {
        id: 'email',
        label: 'Почта',
    },
    {
        id: 'createdAt',
        label: 'Дата создания',
    },
    {
        id: 'updatedAt',
        label: 'Дата последнего изменения',
        display: false,
    },
    {
        id: 'roles',
        label: 'Сервисные роли',
        format: (value: TUserEntity) => (
            <Stack direction={'row'} spacing={theme.spacing(1)}>
                {value.roles.map((item) => (
                    <AlexChip label={item} key={item}/>
                ))}
            </Stack>
        ),
        formatText: (value:TUserEntity) => ((value.roles as string[]).reduce((acc:string, item) => `${acc}  ${item}`)),
        sort: false,
    },
    {
        id: 'verified',
        label: 'Подтверждён',
        format: (value: TUserEntity) => (
            <AlexCheckBox value={value.verified} checked={value.verified} size={30} disabled color={{
                outline: theme.palette.primary.dark,
                checked: theme.palette.primary.main,
            }}/>
        ),
        formatText: (value: TUserEntity) => value.verified ? 'Да' : 'Нет'
    },
]

