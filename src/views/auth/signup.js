import React, { useState, useEffect } from 'react'
import { Button } from 'react-native';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Keyboard,
} from 'react-native';
import { Alert } from 'react-native';
import { api } from '../../services/api';
import moment from "moment";

import validator from "validator";
import { showMessage } from 'react-native-flash-message';

import { Label, Item, Input, Picker } from 'native-base';

import DateTimePicker from "../../components/DateTimePicker"
import { Sizing } from '../../helper/sizing'
import { isIOS } from "../../helper"
import { Dimensions } from 'react-native';

import { calendarIcon } from "../../assets/"

import COLORS from '../../consts/colors';

const COLOR_GYM_RED = COLORS.primary

const GymTextInput = ({
    keyboardType = "default",
    placeholder,
    value,
    onChangeText,
    required,
    secured = false,
    customStyles = {}
}) => {

    const [isFocused, setFocused] = useState(false);

    return (

        <Item
            floatingLabel
            style={{
                borderColor: isFocused ? COLOR_GYM_RED : '#A1A1A1',
                marginTop: 20,
                ...customStyles
            }}
        >
            <Label
                style={{
                    color: isFocused ? COLOR_GYM_RED : '#383838',
                    fontStyle: 'normal',
                    fontSize: 16
                }}
            >
                {`${placeholder}${required ? " *" : ""}`}
            </Label>
            <Input
                keyboardType={keyboardType}
                placeholder={`${placeholder}${required ? " *" : ""}`}
                value={value}
                onChangeText={onChangeText}

                style={{
                    color: COLOR_GYM_RED,
                }}
                secureTextEntry={secured}
                underlineColorAndroid={"transparent"}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </Item>

    )
}

const GymPicker = ({
    placeholder,
    value,
    onChangeText,
    pickerItems = [],
    customStyles = {}
}) => {
    return (
        <Picker
            selectedValue={value}
            accessibilityLabel="Choose Country"
            placeholder={placeholder}
            onValueChange={onChangeText}
            style={{
                ...customStyles,
                marginTop: 32,
            }}
            placeholderStyle={{ color: '#A1A1A1' }}
        >
            {
                pickerItems.map((item) => {
                    return (
                        <Picker.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                        />
                    )
                })
            }

        </Picker>
    )
}



const today = new Date();


const SignUp = ({ route, navigation }) => {

    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");

    const [dob, setDob] = useState(today);
    const [dateTimePickerVisible, setDateTimePickerVisibility] = useState(false);

    const [margin, setMargin] = useState(0);

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", keyboardWillShow);
        Keyboard.addListener("keyboardWillHide", keyboardWillHide);
        const shown = Keyboard.addListener("keyboardWillShow", keyboardWillShow);
        const hide = Keyboard.addListener("keyboardWillHide", keyboardWillHide);

        return () => {
            shown.remove();
            hide.remove();
        };
    }, [])

    const keyboardWillShow = event => {
        const newSize = event.endCoordinates.height - 30;
        setMargin(newSize);
    };

    const keyboardWillHide = () => {
        setMargin(0);
    };

    const hideDatePicker = () => {
        setDateTimePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        setDateTimePickerVisibility(false);
        setDob(date);
    };
    async function registerFunction(){
        if (validator.isEmpty(username)) {
            showMessage({
                type: "danger",
                message: "Username field missing!",
            });
            return
        }
        if (validator.isEmpty(country) || validator.equals(country, null)) {
            showMessage({
                type: "danger",
                message: "Country field missing!",
            });
            return
        }
        if (validator.isEmpty(phoneNumber)) {
            showMessage({
                type: "danger",
                message: "Phone-number field missing!",
            });
            return
        }

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

        if (validator.isEmpty(password)) {
            showMessage({
                type: "danger",
                message: "Password field missing!",
            });
            return
        }

        if (!validator.equals(password, cPassword)) {
            showMessage({
                type: "danger",
                message: "Password does not match!",
            });
            return
        }

        if (validator.isEmpty(address)) {
            showMessage({
                type: "danger",
                message: "Adress field missing!",
            });
            return
        }

        if (validator.isEmpty(location) || validator.equals(location, null)) {
            showMessage({
                type: "danger",
                message: "Location field missing!",
            });
            return
        }
        try {
            await api.post('user', ({ username, email, password }))
        } catch (err) {
            Alert.alert('Erro', err.response.data.message)
        } finally {
            navigation.navigate('OTPScreen', { username })
        }
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.mainView} >
                <Text style={styles.title} >Register</Text>

                <View
                    style={{ marginBottom: margin }}
                >
                    <GymTextInput
                        placeholder={"Username"}
                        required
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginLeft: Sizing(isIOS ? -16 : -6)
                    }}
                    >
                        <GymPicker
                            placeholder={"Country"}
                            value={country}
                            onChangeText={(text) => setCountry(text)}
                            pickerItems={[
                                { label: "PT", value: "351" },
                            ]}
                            customStyles={{  }}
                        />

                        <GymTextInput
                            keyboardType='number-pad'
                            placeholder={"Phone number"}
                            required
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            customStyles={{
                                flex: 1
                            }}
                        />
                    </View>

                    <GymTextInput
                        placeholder={"Email"}
                        required
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 40,
                            alignItems: "center"
                        }}
                    >

                        

                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 20,
                            alignItems: "center"
                        }}
                    >

                        <Text style={styles.dob} >{"Date of birth:"}</Text>

                        <TouchableOpacity
                            style={styles.dobSelector}
                            onPress={() => {
                                setDateTimePickerVisibility(true)
                            }}
                        >

                            <Text style={styles.dob} >
                                {dob ?
                                    moment(dob).format("MM-DD-YYYY")
                                    :
                                    "Choose Date of birth"
                                }
                            </Text>

                            <Image
                                source={calendarIcon}
                                style={styles.calendarIcon}
                            />

                        </TouchableOpacity>

                    </View>


                    <GymTextInput
                        placeholder={"Password"}
                        required
                        customStyles={{ top: 10 }}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secured={true}
                    />
                    <GymTextInput
                        placeholder={"Re-enter Password"}
                        required
                        customStyles={{ top: 20 }}
                        value={cPassword}
                        onChangeText={(text) => setCPassword(text)}
                        secured={true}
                    />
                    <GymTextInput
                        placeholder={"Address"}
                        required
                        customStyles={{ top: 30 }}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />

                    <GymPicker
                        placeholder={"Location"}
                        value={location}
                        onChangeText={(text) => setLocation(text)}
                        pickerItems={[
                            { label: "Viseu", value: "1" },
                            { label: "Aveiro", value: "2" },
                            { label: "Braga", value: "3" },
                            { label: "Bragança", value: "4" },
                            { label: "Castelo Branco", value: "5" },
                            { label: "Coimbra", value: "6" },
                            { label: "Évora", value: "7" },
                            { label: "Faro", value: "8" },
                            { label: "Guarda", value: "9" },
                            { label: "Leiria", value: "10" },
                            { label: "Lisboa", value: "11" },
                            { label: "Portalegre", value: "12" },
                            { label: "Porto", value: "13" },
                            { label: "Santarém", value: "14" },
                            { label: "Setúbal", value: "15" },
                            { label: "Viana do Castelo", value: "16" },
                            { label: "Vila Real", value: "17" },
                            { label: "Beja", value: "18" },
                        ]}
                        customStyles={{
                            top: 40,
                            marginLeft: Sizing(isIOS ? -16 : -6),
                            alignSelf: "stretch",
                        }}
                    />

                </View>

                <DateTimePicker
                    isDatePickerVisible={dateTimePickerVisible}
                    setDatePickerVisibility={setDateTimePickerVisibility}
                    handleConfirm={handleConfirm}
                    hideDatePicker={hideDatePicker}
                    dateTime={dob}

                />

                <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={() => registerFunction()}
                >
                    <Text
                        style={styles.registerBtnText}
                    >{"Register"}</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },

    mainView: {
        flex: 1,
        paddingHorizontal: 18,
    },

    header: {
        paddingHorizontal: Sizing(20),
        paddingBottom: Sizing(20),
        paddingTop: Sizing(isIOS ? 10 : 40),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backArrow: { width: Sizing(13), height: Sizing(23) },

    rightIcon: {
        width: Sizing(40),
        height: Sizing(40),
        borderRadius: Sizing(20),
        backgroundColor: "#EDEDED",
        justifyContent: "center",
        alignItems: "center"
    },
    bellIcon: { width: Sizing(20), height: Sizing(20) },
    notificationCount: {
        width: Sizing(22),
        height: Sizing(22),
        borderRadius: Sizing(11),
        backgroundColor: COLOR_GYM_RED,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: Sizing(-5),
        right: Sizing(-5)
    },
    notificationCountText: {
        color: "#FFFFFF",
    },

    divider: {
        height: 4,
        backgroundColor: "#EDEDED"
    },

    title: {
        marginTop: Sizing(20), fontSize: 17, alignSelf: "center", fontStyle: 'normal', fontWeight: '500'
    },

    dob: {
        fontSize: 14,
    },

    dobSelector: {
        marginLeft: 12,
        height: 35,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#979797",
        flex: 1,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    calendarIcon: {
        width: 20,
        height: 22,
    },

    chooseDob: {
        fontSize: 14,
    },

    registerBtn: {
        marginBottom: Sizing(20),
        marginTop: Sizing(70),
        backgroundColor: COLOR_GYM_RED,
        borderRadius: 30,
        height: 50,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get('window').width / 1.2
    },
    registerBtnText: {
        color: "#FFFFFF",
        fontSize: 20
    }
})

export default SignUp