import React, { useEffect, useState } from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import { Easing } from "react-native-reanimated";
import { StatusBar, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignUp from '../views/auth/signup';
import SignIn from '../views/auth/signin';
import OTPScreen from "../views/auth/OTPScreen";
import ForgotPassword from "../views/auth/ForgotPassword";
import RecoverPassword from "../views/auth/RecoverPassword";

import OnBoarding from '../views/onBoarding/WelcomePage';
import FirstPage from '../views/onBoarding/FirstPage';
import SecondPage from '../views/onBoarding/SecondPage';
import ThirdPage from '../views/onBoarding/ThirdPage';

import { Loader } from '../components/Loader';
import FinishRecover from "../views/auth/FinishRecover";

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 50,
        mass: 3,
        overshootClamping: false,
        restDisplacementThresshold: 0.01,
        restSpeedThreshold: 0.01,
    }
}

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 200,
        easing: Easing.linear,
    }
}

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
    const [status, setStatus] = useState(0);
    const [isLoadingDone, setLoadingDone] = useState(false);

    useEffect(() => {
        getData()
    });

    async function getData() {
        try {
            const response = await AsyncStorage.getItem('OnBoard');
            if (response != null) {
                setStatus(1);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(()=> {
                setLoadingDone(true);
              }, 500);
        }
    };

    if (!isLoadingDone) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Loader size="large" />
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <AuthStack.Navigator screenOptions={{ headerShown: false, gestureDirection: 'horizontal', transitionSpec: { open: config, close: closeConfig, }, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}>
                {
                    status == 0
                        ?
                        <>
                            <AuthStack.Screen name="WelcomePage" component={OnBoarding} options={{
                                transitionSpec: {
                                    open: config, close: closeConfig,
                                }
                            }} />
                            <AuthStack.Screen name="FirstPage" component={FirstPage} />
                            <AuthStack.Screen name="SecondPage" component={SecondPage} />
                            <AuthStack.Screen name="ThirdPage" component={ThirdPage} />
                        </>
                        :
                        null
                }
                <AuthStack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="SignUp"
                    component={SignUp}
                />
                <AuthStack.Screen
                    name="OTPScreen"
                    component={OTPScreen}
                />
                <AuthStack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />
                <AuthStack.Screen
                    name="RecoverPassword"
                    component={RecoverPassword}
                />
                <AuthStack.Screen
                    name="FinishRecover"
                    component={FinishRecover}
                />
            </AuthStack.Navigator>
        </>
    )
}