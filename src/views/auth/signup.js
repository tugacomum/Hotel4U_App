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
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome";

import validator from "validator";
import { showMessage } from "react-native-flash-message";

import { Label, Item, Input, Picker } from 'native-base';


import { useAuth } from '../../contexts/auth';

import DateTimePicker from "../../components/DateTimePicker"
import { Sizing } from "../../helpers/Sizing"
import { isIOS } from "../../helpers"

import { backArrow, bellIcon, calendarIcon } from "../../../assets"

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
                    fontFamily: 'Roboto_300Light',
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


const signup = () => {

    const navigation = useNavigation();

    const { register } = useAuth();

    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("m");
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

    const Header = () => {
        return (

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack?.()} >
                    <Image
                        source={backArrow}
                        style={styles.backArrow}
                    />
                </TouchableOpacity>

                <View style={styles.rightIcon}>

                    <Image
                        source={bellIcon}
                        style={styles.bellIcon}
                    />
                    <View style={styles.notificationCount}
                    >
                        <Text style={styles.notificationCountText} >1</Text>


                    </View>

                </View>
            </View>

        )
    }


    const hideDatePicker = () => {
        setDateTimePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        setDateTimePickerVisibility(false);
        setDob(date);
    };

    const startRegisteration = () => {

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


        register({
            username,
            phonecountry: country,
            phone: Number(phoneNumber),
            email,
            gender,
            birthDate: dob,
            password,
            adress: address,
            location
        });

    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <Header />
            <View style={styles.divider} />
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
                                !isIOS && { label: "Country", value: null },
                                { label: "USA", value: "1" },
                                { label: "UK", value: "44" },
                                { label: "Australia", value: "61" },
                                { label: "Germany", value: "49" },
                            ]}
                            customStyles={{ marginTop: 20 }}
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

                        <Text style={[styles.dob, { flex: 0.3 }]} >{"Gender"}</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flex: 0.7
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setGender("m")}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flex: 0.5
                                }}
                            >
                                <Icon
                                    name={gender == "m" ? "dot-circle-o" : "circle-o"}
                                    size={28}
                                    color={COLOR_GYM_RED}
                                />
                                <Text style={[styles.dob, { marginLeft: 8 }]} >{"Male"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setGender("f")}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Icon
                                    name={gender == "f" ? "dot-circle-o" : "circle-o"}
                                    size={28}
                                    color={COLOR_GYM_RED}
                                />
                                <Text style={[styles.dob, { marginLeft: 8 }]} >{"Female"}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 40,
                            alignItems: "center"
                        }}
                    >

                        <Text style={styles.dob} >{"Date of birth"}</Text>

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
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secured={true}
                    />
                    <GymTextInput
                        placeholder={"Re-enter Password"}
                        required
                        value={cPassword}
                        onChangeText={(text) => setCPassword(text)}
                        secured={true}
                    />
                    <GymTextInput
                        placeholder={"Address"}
                        required
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />

                    <GymPicker
                        placeholder={"Location"}
                        value={location}
                        onChangeText={(text) => setLocation(text)}
                        pickerItems={[
                            !isIOS && { label: "Select Location", value: null },
                            { label: "Location 1", value: "1" },
                            { label: "Location 2", value: "44" },
                            { label: "Location 3", value: "61" },
                            { label: "Location 4", value: "49" },
                        ]}
                        customStyles={{
                            marginTop: 20,
                            marginLeft: Sizing(isIOS ? -16 : -6),
                            alignSelf: "stretch"
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
                    onPress={() => {
                        startRegisteration();
                    }}
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
        marginTop: Sizing(20), fontSize: 20, alignSelf: "center", fontFamily: "Roboto_700Bold"
    },

    dob: {
        fontSize: 14,
        fontFamily: 'Roboto_300Light',
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
        fontFamily: 'Roboto_300Light',
    },

    registerBtn: {
        marginBottom: Sizing(20),
        marginTop: Sizing(40),
        backgroundColor: COLOR_GYM_RED,
        borderRadius: 30,
        height: 50,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center"
    },
    registerBtnText: {
        color: "#FFFFFF",
        fontFamily: 'Roboto_700Bold',
        fontSize: 20
    }
})

export default SignUp