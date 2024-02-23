import React, { FC } from 'react'
import { useLoginStatus } from './components/functions/useLoginStatus.tsx'
import { SkeletonWrapper } from './components/skeleton/SkeletonWrapper.tsx'
import { routesList } from './components/router/routesList.tsx'
import { routesAuthList } from './components/router/routesAuthList.tsx'
import { AlexRouter } from './shared-react-components/AlexRouter/AlexRouter.tsx'

export const LoginShell: FC = () => {
    const loginStatus = true

    return (<>
        {loginStatus ? (
            <SkeletonWrapper>
                <AlexRouter routesList={routesList}/>
            </SkeletonWrapper>
        ) : (
            <AlexRouter routesList={routesAuthList}/>
        )}
    </>)
}