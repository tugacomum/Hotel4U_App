import React, { useState, useEffect } from 'react'
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
import moment from "moment";

import validator from "validator";
import FlashMessage, { showMessage } from 'react-native-flash-message';

import { Label, Item, Input, Picker } from 'native-base';

import DateTimePicker from "../../components/DateTimePicker"
import { Sizing } from '../../helper/sizing'
import { isIOS } from "../../helper"
import { Dimensions } from 'react-native';

import { calendarIcon } from "../../assets/"

import COLORS from '../../consts/colors';

import { useAuth } from '../../contexts/auth';

const COLOR_HOTEL_RED = COLORS.primary

const HotelTextInput = ({
    placeholder,
    value,
    onChangeText,
    required,
    autoCapitalize,
    autoComplete,
    keyboardType,
    secured = false,
    customStyles = {}
}) => {

    const [isFocused, setFocused] = useState(false);

    return (

        <Item
            floatingLabel
            style={{
                borderColor: isFocused ? COLOR_HOTEL_RED : '#A1A1A1',
                marginTop: 20,
                ...customStyles
            }}
        >
            <Label
                style={{
                    color: isFocused ? COLOR_HOTEL_RED : '#383838',
                    fontStyle: 'normal',
                    fontSize: 16
                }}
            >
                {`${placeholder}${required ? " *" : ""}`}
            </Label>
            <Input
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
                keyboardType={keyboardType}
                placeholder={`${placeholder}${required ? " *" : ""}`}
                value={value}
                onChangeText={onChangeText}

                style={{
                    color: COLOR_HOTEL_RED,
                }}
                secureTextEntry={secured}
                underlineColorAndroid={"transparent"}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </Item>

    )
}

const HotelPicker = ({
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


const SignUp = ({ navigation }) => {
    const { register } = useAuth();

    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("");
    const [adress, setAdress] = useState("");

    const [birthDate, setBirthDate] = useState(today);
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
        setBirthDate(date);
    };
    async function registerFunction() {
        if (validator.isEmpty(username)) {
            showMessage({
                type: "danger",
                message: "Username field missing!",
            });
            return
        }

        if (validator.isEmpty(phone_number)) {
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

        if (validator.isEmpty(adress)) {
            showMessage({
                type: "danger",
                message: "Adress field missing!",
            });
            return
        }

        register({
            navigation: navigation,
            username,
            phone_number: Number(phone_number),
            email,
            birthDate: birthDate,
            password,
            adress: adress
        });
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <FlashMessage />
            <ScrollView style={styles.mainView} >
                <Text style={styles.title} >Register</Text>

                <View
                    style={{ marginBottom: margin, marginTop: 20 }}
                >
                    <HotelTextInput
                        autoCapitalize='none' autoComplete='off'
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
                        <HotelPicker
                            placeholder={"Country"}
                            value={country}
                            onChangeText={(text) => setCountry(text)}
                            pickerItems={[
                                { label: "PT", value: "351" },
                            ]}
                            customStyles={{}}
                        />

                        <HotelTextInput
                            keyboardType='number-pad'
                            placeholder={"Phone number"}
                            required
                            value={phone_number}
                            onChangeText={(text) => setPhoneNumber(text)}
                            customStyles={{
                                flex: 1
                            }}
                        />
                    </View>

                    <HotelTextInput
                        autoCapitalize='none' autoComplete='off'
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
                            marginTop: 10,
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
                                {birthDate ?
                                    moment(birthDate).format("MM-DD-YYYY")
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


                    <HotelTextInput
                        autoCapitalize='none' autoComplete='off'
                        placeholder={"Password"}
                        required
                        customStyles={{ top: 20 }}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secured={true}
                    />
                    <HotelTextInput
                        autoCapitalize='none' autoComplete='off'
                        placeholder={"Re-enter Password"}
                        required
                        customStyles={{ top: 35 }}
                        value={cPassword}
                        onChangeText={(text) => setCPassword(text)}
                        secured={true}
                    />
                    <HotelTextInput
                        autoCapitalize='none' autoComplete='off'
                        placeholder={"Adress"}
                        required
                        customStyles={{ top: 50 }}
                        value={adress}
                        onChangeText={(text) => setAdress(text)}
                    />
                </View>

                <DateTimePicker
                    isDatePickerVisible={dateTimePickerVisible}
                    setDatePickerVisibility={setDateTimePickerVisibility}
                    handleConfirm={handleConfirm}
                    hideDatePicker={hideDatePicker}
                    dateTime={birthDate}
                />

                <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={() => registerFunction()}
                >
                    <Text
                        style={styles.registerBtnText}
                    >{"Register"}</Text>
                </TouchableOpacity>
                <View style={{ height: 80 }}></View>
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
        backgroundColor: COLOR_HOTEL_RED,
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
        top: 30,
        marginBottom: Sizing(20),
        marginTop: Sizing(70),
        backgroundColor: COLOR_HOTEL_RED,
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