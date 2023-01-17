import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import COLORS from "../../consts/colors";
import React, { useState, useEffect } from "react";
import HotelList from '../../components/HotelList';
import { Loader } from "../../components/Loader";
import { api } from "../../services/api";

export default function HotelsScreen() {
    const [isLoadingDone, setLoadingDone] = useState(false);
    const [data, setData] = useState([]);
    async function getData() {
        try {
            const response = await api.get('hotels').then(r => r.data);
            setData(response)
        } catch (err) {
            console.log("Err: " + err)
        } finally {
            setTimeout(() => {
                setLoadingDone(true);
            }, 500);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    if (!isLoadingDone) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Loader size="large" />
            </View>
        )
    } else {
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
                    data.length > 0 ? data.map(item => { return (<HotelList item={item} />) }) : null
                }
            </SafeAreaView>
        )
    }
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