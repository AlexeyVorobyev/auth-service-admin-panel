import React, { FC, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { theme } from '../../theme/theme'
import {
    AlexInputControlled,
    EInputType,
} from '../../../shared-react-components/form-utils/AlexInput/AlexInputControlled.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { extractIds } from '../../../shared-react-components/functions/extractIds'
import {
    AlexCheckBoxControlled,
} from '../../../shared-react-components/form-utils/AlexCheckBox/AlexCheckBoxControlled.tsx'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
    ERole,
    TUserCreateInput,
    TUserUpdatePayloadInput,
    UserCardGetUserRecordDocument,
    UserCardGetUserRecordQuery,
    UserCardGetUserRecordQueryVariables,
    UserFormCreateUserDocument,
    UserFormCreateUserMutation,
    UserFormCreateUserMutationVariables,
    UserFormUpdateUserDocument,
    UserFormUpdateUserMutation,
    UserFormUpdateUserMutationVariables,
    ExternalServicesTableGetExternalServiceListDocument,
    ExternalServiceCardGetExternalServiceRecordDocument,
    ExternalServiceFormUpdateExternalServiceDocument,
    ExternalServiceFormCreateExternalServiceDocument,
    ExternalServiceCardGetExternalServiceRecordQuery,
    ExternalServiceCardGetExternalServiceRecordQueryVariables,
    TExternalServiceUpdateInput,
    TExternalServiceCreateInput,
    ExternalServiceFormCreateExternalServiceMutationVariables,
    ExternalServiceFormUpdateExternalServiceMutationVariables,
} from '../../../types/graphql/graphql.ts'
import { EERoleToRusName } from '../../enum/erole-to-rus-name.enum.ts'
import { AlexContentProvider } from '../../../shared-react-components/alex-content/alex-content-provider.component.tsx'
import { validEmail, validPassword } from '../../../shared-react-components/form-utils/Regex/regex.ts'
import { AlexSelect } from '../../../shared-react-components/form-utils/AlexSelect/AlexSelect.tsx'
import { updatedDiff } from 'deep-object-diff'

interface IExternalServiceFormProps {
    setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
    edit: boolean
}

const DEBUG = true

export const ExternalServiceForm: FC<IExternalServiceFormProps> = ({
                                                 setOnSubmitFunc,
                                                 edit,
                                             }) => {
    const { formState: { errors }, reset } = useFormContext()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [updateExternalServiceMutation] = useMutation<UserFormUpdateUserMutation>(ExternalServiceFormUpdateExternalServiceDocument, {
        refetchQueries: [
            {query: ExternalServicesTableGetExternalServiceListDocument}
        ],
    })

    const [createExternalServiceMutation] = useMutation<UserFormCreateUserMutation>(ExternalServiceFormCreateExternalServiceDocument, {
        refetchQueries: [
            {query: ExternalServicesTableGetExternalServiceListDocument}
        ],
    })

    const [lazyGetExternalServiceRecord, {
        data: externalServiceRecordQueryData,
        loading: externalServiceRecordQueryLoading,
    }] = useLazyQuery<ExternalServiceCardGetExternalServiceRecordQuery>(ExternalServiceCardGetExternalServiceRecordDocument)

    const id = useMemo(() => searchParams.get('id'), [searchParams])

    useEffect(() => {
        if (id && edit) {
            lazyGetExternalServiceRecord({
                variables: {
                    input: {
                        id: id,
                    },
                } as ExternalServiceCardGetExternalServiceRecordQueryVariables,
            })
        }
    }, [id])

    useEffect(() => {
        if (externalServiceRecordQueryData) {
            savedData.current = externalServiceRecordQueryData.externalService.record
            reset({
                name: externalServiceRecordQueryData.externalService.record.name,
                recognitionKey: externalServiceRecordQueryData.externalService.record.recognitionKey,
                description: externalServiceRecordQueryData.externalService.record.description,
            })
        }
    }, [externalServiceRecordQueryData])

    const savedData = useRef<ExternalServiceCardGetExternalServiceRecordQuery['externalService']['record'] | null>(null)

    const update = (data: TExternalServiceUpdateInput) => {
        DEBUG && console.log('data UPDATE', data)
        DEBUG && console.log('data UPDATE initial', savedData.current)
        DEBUG && console.log('data UPDATE diff', updatedDiff(savedData.current!, data))
        updateExternalServiceMutation({
            variables: {
                input: {
                    id: id,
                    payload: updatedDiff(savedData.current!, data),
                },
            } as ExternalServiceFormUpdateExternalServiceMutationVariables,
        })
            .then((response) => {
                console.log('promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const add = (data: TExternalServiceCreateInput) => {
        DEBUG && console.log('data ADD', data)
        createExternalServiceMutation({
            variables: {
                input: data,
            } as ExternalServiceFormCreateExternalServiceMutationVariables,
        })
            .then((response) => {
                console.log('promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const onSubmit = (data: any) => {
        DEBUG && console.log('data BEFORE processing', data)
        data = extractIds(data)

        if (edit) {
            DEBUG && console.log('data AFTER processing', data)
            update(data)
        } else {
            DEBUG && console.log('data AFTER processing', data)
            add(data)
        }
    }

    useLayoutEffect(() => {
        setOnSubmitFunc({ callback: onSubmit })
    }, [])

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flex: 1,
            overflowY: 'scroll',
        }}>
            {externalServiceRecordQueryLoading && (
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CircularProgress/>
                </Box>
            )}
            {!externalServiceRecordQueryLoading && (
                <Box sx={{
                    width: '100%',
                    padding: theme.spacing(2),
                    boxSizing: 'border-box',
                    height: '100%',
                }}>
                    <AlexContentProvider pointConfig={[
                        {
                            name: 'mainFormExternalService',
                            title: 'Основная информация',
                            body: (
                                <Grid container spacing={theme.spacing(2)}>
                                    <Grid item xs={12}>
                                        <AlexInputControlled name={'name'} required
                                                             label={'Название'}
                                                             error={Boolean(errors.name)}
                                                             errorText={errors.name?.message as string | undefined}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AlexInputControlled name={'description'}
                                                             label={'Описание'}
                                                             multiline
                                        />
                                    </Grid>
                                </Grid>
                            ),
                        },
                        {
                            name: 'exchangeParamsFormExternalService',
                            title: 'Параметры обмена',
                            body: (
                                <Grid container spacing={theme.spacing(2)}>
                                <Grid item xs={12}>
                                    <AlexInputControlled name={'recognitionKey'} required
                                                         label={'Ключ распознавания'}
                                                         error={Boolean(errors.recognitionKey)}
                                                         errorText={errors.recognitionKey?.message as string | undefined}
                                    />
                                </Grid>
                            </Grid>
                            ),
                        },
                    ]}/>
                </Box>
            )}
        </Box>
    )
}