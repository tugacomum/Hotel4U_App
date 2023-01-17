import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

import COLORS from "../consts/colors";
import { SIZES, FONTS, SHADOWS } from "../consts";

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
    return (
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          backgroundColor: COLORS.white,
          position: "absolute",
          borderRadius: SIZES.extraLarge,
          alignItems: "center",
          justifyContent: "center",
          ...SHADOWS.light,
          ...props,
        }}
        onPress={handlePress}
      >
        <Image
          source={imgUrl}
          resizeMode="contain"
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    );
  };
  
  export const RectButton = ({ minWidth, fontSize, handlePress, ...props }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          padding: SIZES.small,
          marginTop: 10,
          borderRadius: SIZES.extraLarge,
          minWidth: minWidth,
          ...props,
        }}
        onPress={handlePress}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: fontSize,
            color: COLORS.white,
            textAlign: "center",
          }}
        >
          See details
        </Text>
      </TouchableOpacity>
    );
  };