import {React,useState,useEffect} from 'react'
import { View,ScrollView,Text,Pressable,TouchableOpacity,Dimensions,Alert, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Icon,
    IconElement,
    Input,
    Button,
    Layout,
  } from "@ui-kitten/components";

  import { useRoute } from "@react-navigation/native";
import { parse } from 'react-native-svg';
  const screenWidth = Dimensions.get('window').width
  export default function FirstForm ({navigation}){
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const obj = {
        userName : `${fullName}`,
        userPhone : `${phoneNumber}`
    }
    const registerUser = async () => {
      Keyboard.dismiss()
      if(fullName.split(' ')[0] !='' && fullName.split(' ')[1] !=null && fullName.split(' ')[1] != '' && phoneNumber !=''){
      try {
        await AsyncStorage.setItem('Data', JSON.stringify(obj));
        console.log('Data stored successfully!');
        navigation.navigate('home')
      } catch (error) {
        console.error('Error storing data:', error);
      }}
      else{
        Alert.alert(
          "Yene Guzo",
          "sorry, fill the required information ",
          [{ text: "OK", onPress: () => {} }]
        );
      }
    };
    const getData = async()=>{
        try {
            let user = await AsyncStorage.getItem('Data');  
            let parsed = JSON.parse(user);  
            console.log('Data retrieved successfully!',parsed.userName);
          } catch (error) {
            console.error('Error storing data:', error);
          } 
    }
    // const getData=()=>{ 
        
    //     console.log('name--------',fullName)
    
    // }
  
    const userForm = ()=>{
        return(
<View>
<Input
                value={fullName}
                placeholder="Full Name"
                label = 'Enter your full name'
                onChangeText={(nextValue) => setFullName(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor:"#EBEBEB",
                  borderRadius: 10,
                  backgroundColor: "#EBEBEB",
                  elevation: 10,
                }}
              />
       <Input
                value={phoneNumber}
                placeholder="Phone Number"
                label = 'Enter your phone number'
                keyboardType="numeric"
                onChangeText={(nextValue) => setPhoneNumber(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor:"#EBEBEB",
                  borderRadius: 10,
                  backgroundColor: "#EBEBEB",
                  elevation: 10,
                }}
              />
    <Button onPress={registerUser} style={{backgroundColor:"#FF6B1B",borderColor:"#FF6B1B"}}>Register</Button>
    {/* <Button onPress={getData} style={{backgroundColor:"#FF6B1B",borderColor:"#FF6B1B"}}>Register</Button> */}
</View>
        )
    }
    return(
        <ScrollView 
        keyboardShouldPersistTaps='handled'
        >
            <View style={{alignSelf:'center',marginTop:200}}>
            {userForm()}
            </View>
        </ScrollView>
    )

  }