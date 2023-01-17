import { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { showMessage } from 'react-native-flash-message';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    useEffect(() => {
        checkToken()
    }, [])
    const [user, setUser] = useState(null);
    async function signIn({ username, password, isChecked }) {
        const { token, user } = await api.post('login', {
            username,
            password
        }).then(r => r.data)
        api.defaults.headers['authorization'] = `${token}`;
        if (isChecked == true) await AsyncStorage.setItem('@hotel4u:token', token);
        setUser(user);
        if(!user) {
            showMessage({
                type: "danger",
                message: "Wrong credentials",
                duration: 2000
            })
        }
    }

    async function checkToken() {
        const token = await AsyncStorage.getItem('@hotel4u:token');
        if (token) {
            api.defaults.headers['authorization'] = `${token}`;
            const user = await api.get('getprofile').then(r => r.data);
            setUser(user);
        }
    }

    function logout() {
        delete AsyncStorage.removeItem('@hotel4u:token');
        delete api.defaults.headers.delete['authorization'];
        setUser(null);
    }

    async function register({ username, phone_number, email, birthDate, password, adress, navigation }) {
        try {
            await api.post('user', {
                username, phone_number, email, birthDate, password, adress
            }).then(r => r.data);
            showMessage({
                type: "success",
                message: "Account created successfully",
                duration: 2000
            })
        } catch (err) {
            console.log(">>>>>> ", err.response.data)
        } finally {
            navigation.navigate('OTPScreen', { username })
        }
    }

    async function verify({ username, codee, navigation }) {
        const code = parseInt(codee);
        try {
            await api.post('verify', {
                username, code }).then(r => r.data);
            showMessage({
                type: "success",
                message: "Account verified successfully",
                duration: 2000
            })
        } catch (err) {
            console.log(">>>>>> ", err.response.data)
        } finally {
            navigation.navigate('SignIn')
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn, logout, setUser, register, verify }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}