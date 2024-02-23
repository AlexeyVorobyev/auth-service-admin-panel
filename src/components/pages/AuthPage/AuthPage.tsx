import React, { FC } from 'react'
import {FormProvider, useForm} from "react-hook-form"
import {Button, Divider, Grid, Paper, Stack, Typography} from "@mui/material"
import {AlexInputControlled, EInputType} from "../../../shared-react-components/formUtils/AlexInput/AlexInputControlled.tsx"
import {theme} from "../../theme/theme.ts"
import { TSignInPayload } from "../../../core/redux/api/types/auth.ts"
import { useSignInMutation } from '../../../core/redux/api/auth.api.ts'
import { AlexLink } from '../../../shared-react-components/AlexLink/AlexLink.tsx'
import { setTokenAndExpiry } from '../../functions/authTokenAndExpiry.ts'

export const AuthPage: FC = () => {
	const methods = useForm<TSignInPayload>()
	const {handleSubmit, formState: {errors}} = methods
	const [signInMutation] = useSignInMutation()

	const onSubmit = (data: TSignInPayload) => {
		console.log(data)
		signInMutation(data)
			.then((response) => {
				setTokenAndExpiry((response as any).data)
				location.reload()
			})
	}

	return (
		<Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'}>
			<Grid item width={'400px'}>
				<Paper
					elevation={3}
					sx={{
						padding: 3,
					}}
				>
					<FormProvider {...methods} >
						<Stack spacing={theme.spacing(2)}>
							<Stack direction={'column'} justifyContent={'center'} spacing={theme.spacing(2)}>
								<AlexInputControlled name={'email'} required label={'Почта'}
													 inputType={EInputType.email}
													 error={Boolean(errors.email)}
													 errorText={errors.email?.message as string | undefined}/>

								<AlexInputControlled name={'password'} required label={'Пароль'} hidden
													 inputType={EInputType.password}
													 error={Boolean(errors.password)}
													 errorText={errors.password?.message as string | undefined}/>

								<Button size={'large'} variant="contained"
										onClick={handleSubmit(onSubmit)}>ВОЙТИ</Button>
							</Stack>
							<Divider orientation={"horizontal"} variant={'middle'}>
								<Typography variant={'subtitle1'} textAlign={'center'}>ИЛИ</Typography>
							</Divider>
							<Stack justifyContent={'center'}>
								<Typography variant={'subtitle1'} textAlign={'center'}>
									Нет аккаунта? <AlexLink to={'../registration'} sx={{
									textDecoration: 'none',
									color: theme.palette.primary.main
								}}>Зарегестрируйтесь</AlexLink></Typography>
							</Stack>
						</Stack>
					</FormProvider>
				</Paper>
			</Grid>
		</Grid>
	)
}
