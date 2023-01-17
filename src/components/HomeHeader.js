import { FONTS, SIZES, assets } from "../consts";
import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import COLORS from "../consts/colors";

const HomeHeader = ({ onSearch }) => {
  return (
    <View
      style={{
        paddingTop: SIZES.font,
        paddingBottom: SIZES.font
      }}
    >
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Here's all the <Text
              style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.primary }}>
              hotels
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ marginTop: SIZES.font, paddingHorizontal: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.light,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base, tintColor: COLORS.dark }}
          />
          <TextInput
            placeholder="Search Hotels"
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;