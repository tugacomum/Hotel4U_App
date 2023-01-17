import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

const HotelList = ({ item }) => {
  return (
    <View style={{ padding: 30 }}>
      <View style={{borderWidth: 1, borderColor: 'black', borderRadius: 30 }}>
      <Image source={{ uri: item.image }} style={{ width: 300, height: 200, borderRadius: 30 }}/>
      <Text style={{ color: 'black'}}>
        {item.name} {item.image} {item.description} {item.rating_avg}
      </Text></View>
    </View>
  )
}

export default HotelList