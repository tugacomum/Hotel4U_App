import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Loader } from '../../components/Loader';
import { useAuth } from '../../contexts/auth'
import COLORS from '../../consts/colors';
import { Appearance } from 'react-native';
import Imagem from '../../assets/icon.png';
import { api } from '../../services/api';
import { isIOS } from '../../helper';

export default function User() {
    const [isLoadingDone, setLoadingDone] = useState(false);
    const [data, setData] = useState([]);
    const { user, logout } = useAuth();
    const [color, setColor] = useState('light');

    useEffect(() => {
        Appearance.addChangeListener(({ colorScheme }) => { setColor(colorScheme) });
    })
    async function getData() {
        try {
            const response = await api.get('hotels').then(r => r.data);
            setData(response)
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
            <SafeAreaView style={{ flex: 1, backgroundColor: color === 'dark' ? COLORS.darkgrey : COLORS.light }}>
                <View style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    justifyContent: 'space-between'
                }}>
                </View>

                <View style={{ borderRadius: isIOS ? '100%' : 60, width: 120, height: 120, backgroundColor: COLORS.primary, justifyContent: 'center', alignSelf: 'center' }}>
                    <View style={{ borderRadius: isIOS ? '100%' : 60, width: 110, height: 110, backgroundColor: color === 'dark' ? COLORS.darkgrey : COLORS.light, justifyContent: 'center', alignSelf: 'center' }}>
                        <Image source={Imagem} style={{ width: 103, height: 103, borderRadius: 40, alignSelf: 'center' }} />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: COLORS.primary, borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: '10%' }}>
                    <View style={{flex: 1, alignSelf:'center', top: 10}}>
                        <Text style={{fontSize: 20, fontWeight:'bold', color: COLORS.white}}>
                            Bem Vindo, <Text style={{color: COLORS.dark, fontSize: 26}}>{user.username}</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => logout()}>
                        <View style={{ display: 'flex', alignContent: 'center', alignSelf: 'center', height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 40, backgroundColor: COLORS.light, marginHorizontal: 20, borderRadius: 10, padding: 10, borderWidth: 1, borderColor: COLORS.secondary, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'dark' }}>LOGOUT HERE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}