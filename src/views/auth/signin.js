import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, Alert, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Label, Item, Input } from 'native-base';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../consts/colors';
import { useAuth } from '../../contexts/auth';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import validator from 'validator';
import { StatusBar } from 'react-native';

let teste;

export default function signin() {
  const { passwordVisibility, icon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  if (icon === 'eye') {
    teste = require('../../assets/eye-off.png')
  } else {
    teste = require('../../assets/eye.png')
  }

  const [isChecked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  function handleLogin() {
    if (validator.isEmpty(username)) {
      showMessage({
        type: "danger",
        message: "Username field missing!",
      });
      return
    }

    if (validator.isEmpty(password)) {
      showMessage({
        type: "danger",
        message: "Password field missing!",
      });
      return
    }
    signIn({
      username,
      password,
      isChecked
    });
  }

  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <FlashMessage />
      <Image source={require('../../assets/travel.png')} style={{ alignSelf: 'center', width: 300, height: 224.1, marginTop: 50 }} />
      <View style={{ alignSelf: 'center', marginHorizontal: 40 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>Welcome back!</Text>
        <Text style={{ textAlign: 'center', color: COLORS.grey, marginTop: 10 }}>Log in to your existant account of <Text style={{ color: COLORS.primary }}>Hotel4U</Text></Text>
      </View><View style={{ paddingRight: 40, paddingLeft: 40 }}>
        <View style={{ marginTop: 10 }}>
          <Image source={require('../../assets/user3.png')} style={{ top: 44, tintColor: COLORS.dark, width: 27, height: 27 }} />
          <Item floatingLabel style={{ borderColor: '#A1A1A1', width: Dimensions.get('window').width / 1.6, alignSelf: 'center', left: 5 }}>
            <Label style={{ top: -8, left: 5, color: '#383838', fontStyle: 'normal', fontSize: 15 }}>Username</Label>
            <Input enablesReturnKeyAutomatically autoCapitalize='none' autoComplete='off' keyboardType='default' style={{ paddingLeft: 5 }} value={username} onChangeText={(text) => setUsername(text)} />
          </Item>
          <Pressable onPress={handlePasswordVisibility} style={{ top: 54, width: 27, height: 27, right: 2 }}>
            <Image source={teste} style={{ tintColor: COLORS.dark, width: 30, height: 30 }} />
          </Pressable>
          <Item floatingLabel style={{ borderColor: '#A1A1A1', marginTop: 10, width: Dimensions.get('window').width / 1.6, alignSelf: 'center', left: 5 }}>
            <Label style={{ top: -8, color: '#383838', fontStyle: 'normal', fontSize: 15, left: 4 }}>Password</Label>
            <Input enablesReturnKeyAutomatically autoCapitalize='none' autoComplete='off' secureTextEntry={passwordVisibility} value={password} onChangeText={(text) => setPassword(text)} />
          </Item>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Checkbox
            style={{
              margin: 8, borderColor: COLORS.primary, borderWidth: 1, right: 10, top: 14, width: 25, height: 25, borderRadius: 5
            }}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? COLORS.primary : undefined} />
          <Text style={{ color: '#383838', top: 22, fontSize: 15, fontStyle: 'normal', right: 8 }}>Remember me</Text>
          <Text onPress={() => navigation.navigate('ForgotPassword')} style={{ color: COLORS.primary, textAlign: 'right', fontSize: 15, top: 22, fontStyle: 'normal', flex: 1 }}>Forgot password?</Text>
        </View>
        <TouchableOpacity onPress={handleLogin} style={{ borderWidth: 1, borderRadius: 30, borderColor: COLORS.primary, backgroundColor: COLORS.primary, width: Dimensions.get('window').width / 1.2, top: 60, alignSelf: 'center', justifyContent: 'center', height: 50 }}>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 17, fontStyle: 'normal', alignSelf: 'center' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp')
          }}
          style={{ marginTop: 70 }}
        >
          <Text style={{ fontStyle: 'normal', alignSelf: 'center', fontSize: 15, lineHeight: 19.92, marginTop: 10 }}>Don't have an account?<Text style={{ fontWeight: '700', fontStyle: 'normal' }} > Register!</Text></Text>
        </TouchableOpacity>
        <View style={{ height: 75 }} />
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
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