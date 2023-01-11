import * as React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, StatusBar } from 'react-native';
import COLORS from '../../consts/colors';

export default function Welcomeone({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <ImageBackground source={require('../../assets/splash.png')} style={{ width: Dimensions.get('window').width / 1, height: Dimensions.get('window').height / 1 }} />
                <TouchableOpacity onPress={() => navigation.navigate('FirstPage')} activeOpacity={0.5} style={{ backgroundColor: COLORS.primary, borderRadius: 30, alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width / 1.5, height: 60, bottom: 50 }}>
                    <Text style={{ fontSize: 18, color: "white", fontWeight: '500' }}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}