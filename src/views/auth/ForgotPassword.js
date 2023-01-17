import { View, Text, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Label, Item, Input } from 'native-base';
import COLORS from '../../consts/colors';
import {Sizing} from '../../helper/sizing';
import validator from 'validator';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useAuth } from '../../contexts/auth';
import { useState } from 'react';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState("");
    const { pass } = useAuth();
    async function forgotPass() {
        if (validator.isEmpty(email)) {
            showMessage({
                type: "danger",
                message: "Email field missing!",
            });
            return
        }

        if (!validator.isEmail(email)) {
            showMessage({
                type: "danger",
                message: "Please enter correct email!",
            });
            return
        }
        pass({
            navigation: navigation,
            email: email
        })
    }
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: COLORS.white }}
            showsVerticalScrollIndicator={false}>
            <FlashMessage />
            <View style={{ alignSelf: 'center', marginTop: 66, marginHorizontal: 40 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>Forgot your password?</Text>
                <Text style={{ textAlign: 'center', color: COLORS.grey, marginTop: 20 }}>Enter your registered email below </Text><Text style={{textAlign: 'center', color: COLORS.grey, bottom: 2}}>to receive password reset instruction</Text>
            </View>
            <View style={{ padding: 40 }}>
                <Image source={require('../../assets/inbox.png')} style={{ alignSelf: 'center', width: Sizing(200), height: Sizing(200) }} />
                <View style={{ marginTop: 30 }}>
                    <Image source={require('../../assets/email.png')} style={{ top: 44, tintColor: COLORS.dark, width: 27, height: 27 }} />
                    <Item floatingLabel style={{ borderColor: '#A1A1A1', width: Dimensions.get('window').width / 1.6, alignSelf: 'center', left: 5 }}>
                        <Label style={{ top: -8, left: 5, color: '#383838', fontStyle: 'normal', fontSize: 15 }}>Enter your email</Label>
                        <Input enablesReturnKeyAutomatically autoCapitalize='none' autoComplete='off' keyboardType='email-address' placeholder='' value={email} onChangeText={(text) => setEmail(text)} style={{ paddingLeft: 5 }} />
                    </Item>
                </View>
                <TouchableOpacity onPress={forgotPass} style={{ borderWidth: 1, borderRadius: 30, borderColor: COLORS.primary, backgroundColor: COLORS.primary, width: Dimensions.get('window').width / 1.2, top: 50, alignSelf: 'center', justifyContent: 'center', height: 50 }}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 17, fontStyle: 'normal', alignSelf: 'center' }}>Next</Text>
                </TouchableOpacity>
                <View style={{ height: 130 }} />
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30,
    },
    categoryListText: {
        fontWeight: 'bold',
    },
    cardImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    priceTag: {
        height: 60,
        width: 80,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDetails: {
        height: 100,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
    },
    topHotelCard: {
        height: 120,
        width: 120,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    topHotelCardImage: {
        height: 80,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});