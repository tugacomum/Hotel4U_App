import React from "react";
import { View, Image, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from "../consts/colors";
import { SIZES, FONTS, SHADOWS } from "../consts";

export const NFTTitle = ({ title, subTitle, titleSize, subTitleSize, rating_avg }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: titleSize,
            color: COLORS.dark,
          }}
        >
          Hotel {title}
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: titleSize,
            color: COLORS.dark,
            marginTop: 5
          }}
        > 
            <Icon name="star" size={15} color={COLORS.orange} />
            <Icon name="star" size={15} color={COLORS.orange} />
            <Icon name="star" size={15} color={COLORS.orange} />
            <Icon name="star" size={15} color={COLORS.orange} />
            <Icon name="star" size={15} color={COLORS.grey} />
        </Text>
      </View>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: subTitleSize,
          color: COLORS.grey,
          marginTop: 20
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
};

export const EndDate = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%",
      }}
    >
      <Text
        style={{
          fontWeight: '500',
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        100€ / night
      </Text>
    </View>
  );
};

export const SubInfo = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <EndDate />
    </View>
  );
};