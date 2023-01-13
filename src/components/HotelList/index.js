import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const HotelList = ({ item }) => {
  return (
    <View>
      <Text style={{ color: 'black'}}>
        {item.name} {item.image} {item.description} {item.rating_avg}
      </Text>
    </View>
  )
}

export default HotelList