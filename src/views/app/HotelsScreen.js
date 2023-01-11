import { SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import COLORS from "../../consts/colors";
import React, { useState, useEffect } from "react";
import HotelList from '../../components/HotelList';

export default function HotelsScreen() {
    const [hotels, setHotels] = useState();
    async function getHotelsData() {
        try {
            const getMethod = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }
            const res = await fetch('https://hotel4u.onrender.com/hotels', getMethod).then(r => r.json());
            setHotels(res);
            console.log(hotels)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getHotelsData()
    })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={style.header}>
                <View style={{ paddingBottom: 15 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                        Here's all the <Text
                            style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.primary }}>
                            hotels
                        </Text>
                    </Text>
                </View>
            </View>
            {
                hotels.map(item => <HotelList data={item} />)
            }
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
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