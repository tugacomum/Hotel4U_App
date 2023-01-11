import React from 'react';
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native';

import COLORS from '../../consts/colors';
import Icon from "react-native-vector-icons/FontAwesome";

export default function SecondPage({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('../../assets/group2.png')} style={{ width: '100%', height: '100%' }} />


        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingHorizontal: 20,
            paddingVertical: 40,
            alignSelf: 'stretch'
          }}
        >
          <View>

            <ImageBackground
              source={require('../../assets/ellipse.png')}
              style={{
                width: 62,
                height: 62,
                tintColor: COLORS.dark,
                bottom: 170
              }}
            >

              <TouchableOpacity
                onPress={() => navigation.navigate('ThirdPage')}
                style={{
                  backgroundColor: COLORS.primary,
                  width: 52,
                  height: 52,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 30,
                  position: "absolute",
                  right: 5,
                  bottom: 5
                }}
              >
                <Icon
                  name={"chevron-right"}
                  size={20}
                  color="#fff"
                />

              </TouchableOpacity>
            </ImageBackground>
          </View>

        </View>
      </View>
    </View>
  )
};