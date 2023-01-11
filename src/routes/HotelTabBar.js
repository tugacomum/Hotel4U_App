import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { tabHome, tabFavourites, tabProfile } from '../assets'

import { Sizing } from '../helper/sizing'
import COLORS from '../consts/colors'

const TAB_BAR_ITEMS = [
    {
        icon: tabHome,
        index: 0,
        route: "HomeScreen"
    },
    {
        icon: tabFavourites,
        index: 1,
        route: "FavouriteScreen"
    },
    {
        icon: tabProfile,
        index: 2,
        route: "ProfileScreen"
    }
]

export default function MyTabBar({ navigation }) {
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)
    return (
        <View style={styles.tabBarHeight} >
            {
                TAB_BAR_ITEMS.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.tabBarItem}
                            onPress={() => {
                                navigation.navigate(item.route)
                                setSelectedTabIndex(index)}}>
                            <Image
                                source={item.icon}
                                style={[styles.tabIcon, index == selectedTabIndex && { tintColor: COLORS.primary }]}
                                resizeMode="contain" />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    tabBarHeight: {
        flexDirection: "row",
        height: Sizing(54),
        backgroundColor: "#fff",
        shadowColor: "#000000",

        shadowOpacity: 0.21,
        shadowRadius: 11,
        elevation: 9,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: .15

    },

    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    tabIcon: {
        height: Sizing(26),
        width: Sizing(26),
        marginBottom: Sizing(6),
    },
    tabLabel: {
        fontSize: 12
    }
})