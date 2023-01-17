import { View, Text, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Label, Item, Input } from 'native-base';
import COLORS from '../../consts/colors';
import { Sizing } from '../../helper/sizing';
import validator from 'validator';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useAuth } from '../../contexts/auth';
import { useState } from 'react';

const FinishRecover = ({ route, navigation }) => {
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const { recover } = useAuth();
    const email = route.params.email;
    const codee = route.params.code;
    async function recoverPassword() {
        if (validator.isEmpty(password)) {
            showMessage({
                type: "danger",
                message: "Password field missing!",
            });
            return
        } else if (!validator.equals(password, password1)) {
            showMessage({
                type: "danger",
                message: "Password does not match!",
            });
            return
        } else {
            recover({
                navigation: navigation,
                password,
                email,
                codee
            })
        }
    }
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <FlashMessage />
            <View style={{ alignSelf: 'center', marginTop: 66, marginHorizontal: 40 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>Recover your password!</Text>
                <Text style={{ textAlign: 'center', color: COLORS.grey, marginTop: 20 }}>Enter your new password below</Text>
            </View>
            <View style={{ padding: 40 }}>
                <Image source={require('../../assets/inbox.png')} style={{ alignSelf: 'center', width: Sizing(200), height: Sizing(200) }} />
                <View style={{ marginTop: 30 }}>
                    <Image source={require('../../assets/eye.png')} style={{ top: 44, tintColor: COLORS.dark, width: 27, height: 27 }} />
                    <Item floatingLabel style={{ borderColor: '#A1A1A1', width: Dimensions.get('window').width / 1.6, alignSelf: 'center', left: 5 }}>
                        <Label style={{ top: -8, left: 5, color: '#383838', fontStyle: 'normal', fontSize: 15 }}>Enter your new password</Label>
                        <Input enablesReturnKeyAutomatically autoCapitalize='none' autoComplete='off' keyboardType='default' placeholder='' value={password} onChangeText={(text) => setPassword(text)} style={{ paddingLeft: 5 }} />
                    </Item>
                    <Image source={require('../../assets/eye-off.png')} style={{ top: 44, tintColor: COLORS.dark, width: 27, height: 27 }} />
                    <Item floatingLabel style={{ borderColor: '#A1A1A1', width: Dimensions.get('window').width / 1.6, alignSelf: 'center', left: 5 }}>
                        <Label style={{ top: -8, left: 5, color: '#383838', fontStyle: 'normal', fontSize: 15 }}>Confirm your new password</Label>
                        <Input enablesReturnKeyAutomatically autoCapitalize='none' secureTextEntry={true} autoComplete='off' keyboardType='default' placeholder='' value={password1} onChangeText={(text) => setPassword1(text)} style={{ paddingLeft: 5 }} />
                    </Item>
                </View>
                <TouchableOpacity onPress={recoverPassword} style={{ borderWidth: 1, borderRadius: 30, borderColor: COLORS.primary, backgroundColor: COLORS.primary, width: Dimensions.get('window').width / 1.2, top: 70, alignSelf: 'center', justifyContent: 'center', height: 50 }}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 17, fontStyle: 'normal', alignSelf: 'center' }}>Recover</Text>
                </TouchableOpacity>
                <View style={{ height: 130 }} />
            </View>
        </ScrollView>
    )
}

export default FinishRecover