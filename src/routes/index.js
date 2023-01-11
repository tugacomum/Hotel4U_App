import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import AppRoutes from '../routes/app.routes';
import { useAuth } from '../contexts/auth';

export default function Routes() {
    const { user } = useAuth();
    // meter o approutes dps de deixar o getprofile a funcionar
    return (
        <>
        {!user ? <AuthRoutes /> : <AuthRoutes />}
        </>
    );
}