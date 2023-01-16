import AuthRoutes from './auth.routes';
import AppRoutes from '../routes/app.routes';
import { useAuth } from '../contexts/auth';
import { NavigationContainer } from '@react-navigation/native';

import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Loader } from '../components/Loader';

export default function Routes() {
    const { user } = useAuth();
    const [isLoadingDone, setLoadingDone] = useState(false);
    async function getData() {
        try {

        } catch (err) {
            console.log("Err: " + err)
        } finally {
            setTimeout(() => {
                setLoadingDone(true);
            }, 500);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    if (!isLoadingDone) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Loader size="large" />
            </View>
        )
    } else {
        return (
            <NavigationContainer>
                {!user ? <AuthRoutes /> : <AppRoutes />}
            </NavigationContainer>
        );
    }
}