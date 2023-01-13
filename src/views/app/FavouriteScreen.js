import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Loader } from '../../components/Loader';
import { api } from '../../services/api';

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
    <View>
      <Text>FavouriteScreen</Text>
    </View>
  )}
}

export default FavouriteScreen