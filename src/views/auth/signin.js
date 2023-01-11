import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Label, Item, Input } from 'native-base';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';

export default function signin() {
  const [isChecked, setChecked] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      showsVerticalScrollIndicator={false}>
      <View style={{ padding: 40, top: 40 }}>
      <Image source={require('../../../assets/icon2.png')} style={{ alignSelf: 'center' }} />
        <View style={{ marginTop: 30 }}>
          <Image source={require('../../assets/user.png')} style={{ top: 40, right: 4, tintColor: COLORS.dark }} />
          <Item floatingLabel style={{ borderColor: '#A1A1A1', width: Dimensions.get('window').width / 1.15, alignSelf: 'center' }}>
            <Label style={{ top: -8, left: 55, color: '#383838', fontStyle: 'normal', fontSize: 15 }}>Email</Label>
            <Input keyboardType='email-address' style={{ paddingLeft: 55 }} value={login} onChangeText={(text) => setLogin(text)} />
          </Item>
          <Image source={require('../../assets/unlock.png')} style={{ top: 50, right: 1, tintColor: COLORS.dark }} />
          <Item floatingLabel style={{ borderColor: '#A1A1A1', marginTop: 10, width: Dimensions.get('window').width / 1.15, alignSelf: 'center' }}>
            <Label style={{ top: -8, left: 55, color: '#383838', fontStyle: 'normal', fontSize: 15 }}>Password</Label>
            <Input secureTextEntry={true} style={{ paddingLeft: 55 }} value={password} onChangeText={(text) => setPassword(text)} />
          </Item>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Checkbox
            style={{
              margin: 8, borderColor: COLORS.primary, borderWidth: 1, right: 10, top: 14, width: 25, height: 25
            }}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? COLORS.primary : undefined} />
          <Text style={{ color: '#383838', top: 22, fontSize: 15, fontStyle: 'normal', right: 8 }}>Remember me</Text>
          <Text style={{ color: COLORS.primary, textAlign: 'right', fontSize: 15, top: 22, fontStyle: 'normal', flex: 1 }}>Forgot password?</Text>
        </View>
        <Button style={{ borderWidth: 1, borderRadius: 30, borderColor: COLORS.primary, backgroundColor: COLORS.primary, width: Dimensions.get('window').width / 1.2, top: 60, alignSelf: 'center', justifyContent: 'center', height: 50 }}>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 17, fontStyle: 'normal' }}>Log in</Text>
        </Button>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp')
          }}
          style={{ marginTop: 70 }}
        >
          <Text style={{ fontStyle: 'normal', alignSelf: 'center', fontSize: 15, lineHeight: 19.92 }}>Don't have an account?<Text style={{ fontWeight: '700', fontStyle: 'normal' }} > Register!</Text></Text>
        </TouchableOpacity>
        <View style={{ height: 200 }} />
      </View>
    </ScrollView>
  );
}