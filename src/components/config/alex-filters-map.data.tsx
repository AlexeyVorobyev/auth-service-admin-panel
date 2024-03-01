import { IAlexFilter } from '../../shared-react-components/AlexFilters/AlexFilter.tsx'

export const alexFiltersMap: Map<string, IAlexFilter> = new Map([
    // ['userRole', {
    //     label: 'Роль пользователя',
    //     component: <AlexToggle name={'userRole'}
    //                            options={
    //                                Object.values(EUserRole).map((item) => {
    //                                    return {
    //                                        id: item,
    //                                        name: parseEUserRoleToRusName(item)
    //                                    }
    //                                })
    //                            }/>
    // }],
    // ['educationLevel', {
    //     label: 'Уровень образования',
    //     component: <AlexToggle name={'educationLevel'}
    //                            orientation={'vertical'}
    //                            enforceSelect
    //                            options={
    //                                Object.values(EEducationLevel).map((item) => {
    //                                    return {
    //                                        id: item,
    //                                        name: parseEEducationLevelToRusName(item)
    //                                    }
    //                                })
    //                            }/>
    // }],
])