import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Loader } from '../../components/Loader';
import { useAuth } from '../../contexts/auth'
import { Button } from 'native-base';

export default function User() {
    const [isLoadingDone, setLoadingDone] = useState(false);
    const [data, setData] = useState([]);
    const { user, logout } = useAuth();
    async function getData() {
        try {
            const response = await api.get('hotels').then(r => r.data);
            setData(response)
        } catch (err) {
            console.log("Err: " + err)
        } finally {
            setTimeout(() => {
                console.log(data)
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
            <View>
                <Button onPress={() => logout()}><Text>LOGOUT HERE</Text></Button>
            </View>
        )
    }
}