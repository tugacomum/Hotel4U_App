import { 
  SafeAreaView,
  Text,
  View,
  Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Loader } from '../../components/Loader';
import { api } from '../../services/api';
import COLORS from '../../consts/colors'

const FavouriteScreen = () => {
  const [isLoadingDone, setLoadingDone] = useState(false);
  const [data, setData] = useState([]);
  
  async function getData() { 
    try {
      const response = await api.get('hotels').then(r => r.data);
      setData(response)
    } catch (err) {
      console.log("Err: " + err)
    } finally {
      setTimeout(()=> {
        console.log(data)
        setLoadingDone(true);
      }, 500);
    }
  }
  const [color, setColor] = useState('light');
    useEffect(() => {
        Appearance.addChangeListener(({ colorScheme }) => { setColor(colorScheme) });
    })
  useEffect(()=>{
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
    <SafeAreaView style={{flex:1, backgroundColor: color === 'dark' ? COLORS.darkgrey : COLORS.light}}>
      <View style={{alignSelf: 'center', top: '10'}}>
        <Text style={{fontSize: 24, fontWeight:'bold', color: COLORS.primary}}>
          Favourites
        </Text>
      </View>
    </SafeAreaView>
  )}
}

export default FavouriteScreen