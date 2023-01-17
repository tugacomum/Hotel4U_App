import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Sizing } from '../../helper/sizing';
import { useState, useRef } from 'react';
import COLORS from '../../consts/colors';
import { useNavigation } from '@react-navigation/native';
import validator from 'validator';
import { isIOS } from '../../helper';
import FlashMessage, { showMessage } from 'react-native-flash-message';

export default function RecoverPassword({ route }) {
  const navigation = useNavigation();
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');

  const code = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
  const email = route.params.email;

  async function recoverPassword() {
    if (validator.isEmpty(code)) {
      showMessage({
        type: "danger",
        message: "Code field missing!",
      });
    } else {
      navigation.navigate('FinishRecover', { email: email, code: code })
    }
  }

  return (
    <ScrollView
            style={{ flex: 1, backgroundColor: COLORS.white }}
            showsVerticalScrollIndicator={false}>
      <FlashMessage />
      <View style={{ alignSelf: 'center', marginTop: 66, marginHorizontal: 40 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>Insert the code below!</Text>
        <Text style={{ textAlign: 'center', color: COLORS.grey, marginTop: 20 }}>Check your email inbox and insert </Text><Text style={{ textAlign: 'center', color: COLORS.grey, bottom: 2 }}>the code and the new password.</Text>
      </View>
      <View style={{ padding: 40 }}>
        <Image source={require('../../assets/inbox.png')} style={{ alignSelf: 'center', width: Sizing(200), height: Sizing(200) }} />
        <View style={{ marginTop: 70, flex: 0.6, justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <TextInput value={pin1} keyboardType='numeric' maxLength={1} onChangeText={(text) => {
            setPin1(text); if (pin1 !== null) {
              pin2Ref.current.focus();
            }
          }} ref={pin1Ref} style={{ backgroundColor: '#f5f4f2', textAlign: 'center', fontWeight: '600', alignSelf: 'center', padding: 10, fontSize: 20, height: 55, width: '15%', borderRadius: 10, borderWidth: 0.5, borderColor: "grey", justifyContent: 'center' }} caretHidden />
          <TextInput value={pin2} keyboardType='numeric' maxLength={1} onChangeText={(text) => {
            setPin2(text); if (pin2 !== null) {
              pin3Ref.current.focus();
            }
          }} ref={pin2Ref} style={{ backgroundColor: '#f5f4f2', textAlign: 'center', fontWeight: '600', alignSelf: 'center', padding: 10, fontSize: 20, height: 55, width: '15%', borderRadius: 10, borderWidth: 0.5, borderColor: "grey", justifyContent: 'center' }} caretHidden />
          <TextInput value={pin3} keyboardType='numeric' maxLength={1} onChangeText={(text) => {
            setPin3(text); if (pin3 !== null) {
              pin4Ref.current.focus();
            }
          }} ref={pin3Ref} style={{ backgroundColor: '#f5f4f2', textAlign: 'center', fontWeight: '600', alignSelf: 'center', padding: 10, fontSize: 20, height: 55, width: '15%', borderRadius: 10, borderWidth: 0.5, borderColor: "grey", justifyContent: 'center' }} caretHidden />
          <TextInput value={pin4} keyboardType='numeric' maxLength={1} onChangeText={(text) => {
            setPin4(text); if (pin4 !== null) {
              pin5Ref.current.focus();
            }
          }} ref={pin4Ref} style={{ backgroundColor: '#f5f4f2', textAlign: 'center', fontWeight: '600', alignSelf: 'center', padding: 10, fontSize: 20, height: 55, width: '15%', borderRadius: 10, borderWidth: 0.5, borderColor: "grey", justifyContent: 'center' }} caretHidden />
          <TextInput value={pin5} keyboardType='numeric' maxLength={1} onChangeText={(text) => {
            setPin5(text); if (pin5 !== null) {
              pin6Ref.current.focus();
            }
          }} ref={pin5Ref} style={{ backgroundColor: '#f5f4f2', textAlign: 'center', fontWeight: '600', alignSelf: 'center', padding: 10, fontSize: 20, height: 55, width: '15%', borderRadius: 10, borderWidth: 0.5, borderColor: "grey", justifyContent: 'center' }} caretHidden />
          <TextInput returnKeyLabel='done' value={pin6} keyboardType='numeric' maxLength={1} onChangeText={(text) => { setPin6(text) }} ref={pin6Ref} style={{ backgroundColor: '#f5f4f2', textAlign: 'center', fontWeight: '600', alignSelf: 'center', padding: 10, fontSize: 20, height: 55, width: '15%', borderRadius: 10, borderWidth: 0.5, borderColor: "grey", justifyContent: 'center' }} caretHidden />
        </View>
        <TouchableOpacity onPress={recoverPassword} style={{ borderWidth: 1, borderRadius: isIOS ? '60%' : 30, borderColor: COLORS.primary, backgroundColor: COLORS.primary, width: Dimensions.get('window').width / 1.2, top: 30, alignSelf: 'center', justifyContent: 'center', height: 50 }}>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 17, fontStyle: 'normal', alignSelf: 'center' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}