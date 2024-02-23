import React, { FC } from 'react'
import { store } from './core/redux/store/store.ts'
import { globalStyles, theme } from './components/theme/theme.ts'
import { GlobalStyles } from '@mui/material'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/system'
import { BrowserRouter } from 'react-router-dom'
import { AlexToastProvider } from './shared-react-components/AlexToastProvider/AlexToastProvider.tsx'
import { LoginShell } from './LoginShell.tsx'

const App: FC = () => (
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyles styles={globalStyles()}/>
                <BrowserRouter>
                    <AlexToastProvider>
                        <LoginShell/>
                    </AlexToastProvider>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)

export default App
