import * as React from "react";
import { useState, useEffect,useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { faAnglesRight } from "@fortawesome/free-solid-svg-icons/faAnglesRight";
import DropShadow from "react-native-drop-shadow";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import Clipboard from '@react-native-clipboard/clipboard';

import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";

import IntentLauncher, { IntentConstant } from 'react-native-android-intent-launcher'

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Switch,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  Modal,
  Linking,
  NativeModules
} from "react-native";
// import {CheckBox} from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import { useRoute } from "@react-navigation/native";
import { all } from "axios";
import { DataContext } from '../DataContext';
import Share from 'react-native-share'


import {

  IconElement,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import { parse } from "react-native-svg";
import { FalsyFC } from "@ui-kitten/components/devsupport";
import { isLoading } from "expo-font";
// import { RadioButton } from 'react-native-paper';

const screenWidth = Dimensions.get("window").width;
const AppLauncher = NativeModules.AppLauncher;
export default function PaymentOption({ navigation }) {
  const [bankSelectedTeleBirr, setBankSelectedTeleBirr] = useState(false);
  const [bankSelectedCbe, setBankSelectedCbe] = useState(false);
  const { condata, addData } = useContext(DataContext);
  const route = useRoute();
  const allData = route.params.allData;
  const [isClickable,setIsClickable] = useState(true)
  const returnSeat = route.params.returnSeat;
  const [loading, setLoading] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const allDataTwo = route.params.allDataTwo;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const returnTicket = route.params.returnTicket;
  const phoneNumberList = route.params.phoneNumberList;
  const ageList = route.params.ageList;
  const passengerOffBoardingPlace = route.params.passengerOffBoardingPlace;
  const passengerOnboardingList = route.params.passengerOnboardingList;
  const passengerOffBoardingPlaceReturn =
    route.params.passengerOffBoardingPlaceReturn;
  const passengerOnboardingListReturn =
    route.params.passengerOnboardingListReturn;
  const loginD = route.params.loginD;
  const numberOfPassengers = route.params.numberOfPassengers
  const index = route.params.index;
  const indexR = route.params.indexR;
  const passengersgenderList = route.params.passengersgenderList;
  const seat = route.params.seat;
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const fullNameList = route.params.fullNameList;
  const [showPopUp, setShowPopUp] = useState(false);
  const [showCbePopUp, setShowCbePopUp] = useState(false);
  const [showPopUpRound, setShowPopUpRound] = useState(false);
  const [book, setBook] = useState("");
  const [roundBook, setRoundBook] = useState("");
  const [arrayT,setArrayT] = useState([])

  const arr = Array(numberOfPassengers).fill(numberOfPassengers)
  const activityName = route.name;

// useEffect(()=>{registerTransaction()},[arrayT])

  const getTicket = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/get-tickets/${
          isEnabledTwoWay ? roundBook.ticketUUIds : book.ticketUUIds
        }`
      );
      if (!response.ok) {
        throw new Error('Network request failed');
    
      }
      const data = await response.json();
      if (data === '' || data === undefined) {
        Alert.alert(
          "Yene Guzo",
          "Sorry, The booking session has expired. Please start a new booking.",
          [{ text: "OK", onPress: () => {} }]
        );
      } else {
        const TickettData = data;
        navigation.navigate("ticketScreen", {
          allData,
          phoneNumberList,
          ageList,
          passengerOffBoardingPlace,
          roundBook,
          book,
          TickettData,
          numberOfPassengers,
          arr,     
          passengerOnboardingList,
          passengersgenderList,
          seat,
          returnTicket,
          isEnabledTwoWay,
          fullNameList,
          loginD,
        });
        console.log("tickets Data--------------", TickettData);
      }
    } catch (error) {
      console.error(error);
      // if(error == 'Network request failed'){
      //   Alert.alert(
      //     "Yene Guzo",
      //     "Please, Check your internet connecion and try again ",
      //     [{ text: "OK", onPress: () => {} }]
      //   );
      // }
      Alert.alert(
        "Yene Guzo",
        "Sorry, an error occurred. Please try again later.",
        [{ text: "OK", onPress: () => {} }]
      );
    } finally {
      setLoading(false);
    }
  };

  const startPaymentETH = (paymentType) => {
    console.log("activity Name :-",activityName )
console.log('Transaction number :-',book.transactionNumber)
console.log('Type :-',paymentType)

// Linking.openURL('spotify://')
    setIsClickable(false)  
setLoadingPay(true)
       fetch(
        "http://159.65.88.161:8085/CrossRegional/api/v1/ticket/initiatePayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: condata.token
          },
          body: JSON.stringify({
            transactionNumber: book.transactionNumber, 
            paymentProvider: paymentType, 
            paymentChannel: "ANDROID", 
            returnUrl: "http://159.65.88.161:8085/CrossRegionalWeb" 

          })          
        }
      )
        .then((response) => response.json())

        .then((res) => {
         
          if (res.status == 0) {
            
            console.log('responseURL-----------',res.data.returnUrl)
            const EtcUrl =res.data.returnUrl
            try{
              Linking.openURL(EtcUrl).then(()=>{ setShowPopUp(false);
                navigation.navigate("refundTicket")}
              )

            }
          catch{
            Alert.alert(
              "Yene Guzo",
              "Sorry, unexpected error occured,try again later.",
              [{ text: "OK", onPress: () => { } }]
            );
          }
          } 
          else{
            console.log('response-----------',res.data)
            Alert.alert(
              "Yene Guzo",
              "Sorry, unexpected error occured,try again later.",
              [{ text: "OK", onPress: () => { } }]
            );
          }
         
        })

        .catch((error) => {
          console.error(error);

          Alert.alert(
            "Yene Guzo",
            "Sorry, unexpected error occured,try again later.",
            [{ text: "OK", onPress: () => { } }]
          );
          return;
        })
        .finally(() => {setLoadingPay(false); setIsClickable(true)});

  };


  const startPayment = (paymentType) => {
    console.log("activity Name :-",activityName )
console.log('Transaction number :-',book.transactionNumber)
console.log('Type :-',paymentType)

// Linking.openURL('spotify://')
     setIsClickable(false) 
setLoadingPay(true)
       fetch(
        "http://159.65.88.161:8085/CrossRegional/api/v1/ticket/initiatePayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: condata.token
          },
          body: JSON.stringify({

            transactionNumber: book.transactionNumber,
            paymentProvider: paymentType,
            paymentChannel: "ANDROID",
            returnApp:{Activity:"com.google.android.apps.chrome.Main",PackageName:"com.android.chrome"}

          })          
        }
      )
        .then((response) => response.json())

        .then((res) => {

          if (res.status == 0) {
            const x = JSON.parse(res.data.toPayMsg)
            console.log('response-----------',x.launchIntentForPackage)
            console.log('response-----------',x.extras)
            const a = x.launchIntentForPackage
            const b = x.extras
          
            const packageName = 'cn.tydic.ethiopay';
         
            IntentLauncher.isAppInstalled(a)
            .then((result) => {
              console.log('isAppInstalled yes');
              IntentLauncher.openApp(a,b)
              setShowPopUp(false);
              navigation.navigate("refundTicket")
             
            })
            .catch((error) => 
            Alert.alert(
              "Yene Guzo",
              "Sorry, you don't have the app installed in your phone.",
              [{ text: "OK", onPress: () => { } }]
            )
            
            );
           

          } 
          else{
            console.log('response-----------',res.data)
            // Linking.openURL('://')
          }
         
        })

        .catch((error) => {
          console.error(error);

          Alert.alert(
            "Yene Guzo",
            "Sorry, unexpected error occured,try again later.",
            [{ text: "OK", onPress: () => { } }]
          );
          return;
        })
        .finally(() =>{ setLoadingPay(false) ; setIsClickable(true)});

  };

  
  const shareViewAsImage= async () => {
    try {
   
      const shareOptions = {
        title: 'Transaction Number',
        message: book.transactionNumber,
        type: 'txt',
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };
  const copyTicket = (ticketN)=>{
    Clipboard.setString(`${ticketN}`)
    console.log('Ticket Number-------',ticketN)
  }
  const cbePopUp = () => {
    console.log("book result----------------", book);
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowCbePopUp(false);
          }}
        >
          <Pressable
          onPress={(event) => event.target == event.currentTarget && setShowCbePopUp(false)}
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "grey",
              opacity: 0.9,
            }}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 15 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  width: 349,
                  alignSelf: "center",
                  position: "relative",
                  shadowColor: "black",
                  backgroundColor: "#FFF7F3",
                  borderWidth: 1,
                  borderColor: "#FFF7F3",
                  borderRadius: 30,
                  marginBottom:20
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#46BF7A",
                    marginTop: 33,
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  CBE BIRR STEPS
         </Text>
           <View style={{alignSelf:"center",marginTop:10,flexDirection:'row',marginBottom:10}}>
            <Text style={{fontSize:16}}>Bill Reference:
            
   
    <Text onPress={()=>{copyTicket(book.transactionNumber)}} style={{fontSize:18,fontWeight:'500',}}>{' '}{`${book.transactionNumber}`}</Text> </Text>
      
            <TouchableOpacity style={{marginLeft:5}} onPress={()=>{copyTicket(book.transactionNumber)}}>
  <FontAwesomeIcon
  icon={faCopy}
  size={20}
  style={{
    color:  "#FF6A22",
    alignSelf: "center",
    justifyContent: "center",
}

}
/>
</TouchableOpacity>
           </View>

           <View style={{alignSelf:"center",flexDirection:'row'}}>
            <Text style={{fontSize:16}}>Yeneguzo Shortcode:
            

    <Text onPress={()=>{copyTicket(212121)}} style={{fontSize:18,fontWeight:'500',}}>{' '}212121</Text> </Text>
      
            <TouchableOpacity style={{marginLeft:5}} onPress={()=>{copyTicket(212121)}}>
  <FontAwesomeIcon
  icon={faCopy}
  size={20}
  style={{
    color:  "#FF6A22",
    alignSelf: "center",
    justifyContent: "center",
}}
/>
</TouchableOpacity>
           </View>

           <View style={{marginLeft:20,marginRight:10,marginVertical:20}}>
           <Text style={{fontSize:16,marginBottom:10}}>Step 1 - Dial <Text style={{fontWeight:'bold'}}>*847#</Text></Text>
         <Text style={{fontSize:16,marginBottom:10}}>Step 2 - Enter <Text style={{fontWeight:'bold'}}>5</Text> Pay Bill</Text>
         <Text style={{fontSize:16,marginBottom:10}}>Step 3 - Enter <Text style={{fontWeight:'bold'}}>2</Text> Input ShortCode</Text>
         <Text style={{fontSize:16,marginBottom:10}}>Step 4 - Enter <Text style={{fontWeight:'bold'}}>212121 </Text>Yeneguzo ShortCode</Text>
         <Text style={{fontSize:16,marginBottom:10}}>Step 5 - Enter Bill Reference No. <Text style={{fontWeight:'bold'}}>{`(${(book.transactionNumber)})`}</Text>  </Text>
         </View>
            <Button onPress ={()=>{setShowCbePopUp(false)}} style={{ width:200,alignSelf:"center",marginTop:10,
            backgroundColor:"#FF6A22",borderColor:"#FF6A22"}}>Got it</Button>
                 <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginBottom: 32,
                    // borderWidth: 1,
                    // borderColor: "#FF6A22",
                    alignSelf: "center",
                  }}
                  onPress={() =>{setShowPopUp(false); navigation.navigate("home")}}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#FF6A22",
                      flex: 1,
                      textAlignVertical: "center",
                      alignSelf: "center",
                    }}
                  >
                    BACK TO HOME
                  </Text>
                </Pressable>
              </View>
            </DropShadow>
          </Pressable>
        </Modal>
      </View>
    );
  };

  const oneWayPopUp = () => {
    // console.log("book result----------------", book);
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            // setShowPopUp(false);
            navigation.navigate('refundTicket')
          }}
        >
          <Pressable
            // onPress={(event) => event.target == event.currentTarget && setShowPopUp(false)}
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "grey",
              opacity: 0.9,
            }}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 15 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  width: 349,
                  alignSelf: "center",
                  position: "relative",
               
                  shadowColor: "black",
                  backgroundColor: "#FFF7F3",
                  borderWidth: 1,
                  borderColor: "#FFF7F3",
                  borderRadius: 30,
                  marginBottom:20
               
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: "#46BF7A",
                    marginTop: 33,
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  COMPLETED
                </Text>
                <Text
                  style={{ fontSize: 16, marginTop: 20, alignSelf: "center",fontWeight:'600' }}
                >
                 Reservation is done successfully
                </Text>
                <Text style={{ fontSize: 16, alignSelf: "center",fontWeight:'600' }}>
                Please make payment within <Text style={{color:'red'}}>{`One(1) hour`}</Text>
                </Text>
                <Text
                  style={{ fontSize: 14, marginTop: 30, alignSelf: "center" }}
                >
                  The user will receive SMS message Shortly
                </Text>
           <View style={{alignSelf:"center",marginTop:10,flexDirection:'row',marginBottom:10}}>
            <Text style={{fontSize:18}}>Bill Reference:
            
   
    <Text onPress={()=>{copyTicket(book.transactionNumber)}} style={{fontSize:18,fontWeight:'500',}}>{' '}{`${book.transactionNumber}`}</Text> </Text>
      
            <TouchableOpacity style={{marginLeft:5}} onPress={()=>{copyTicket(book.transactionNumber)}}>
  <FontAwesomeIcon
  icon={faCopy}
  size={20}
  style={{
    color:  "#FF6A22",
    alignSelf: "center",
    justifyContent: "center",
}}
/>
</TouchableOpacity>

<TouchableOpacity style={{marginLeft:5}} onPress={shareViewAsImage}>
  <FontAwesomeIcon
  icon={faShare}
  size={20}
  style={{
    color:  "#FF6A22",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft:10
}}
/>
</TouchableOpacity>
           </View>
           <View style={{flexDirection:'row',alignSelf:'center'}}>
           <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
           <TouchableOpacity onPress={()=>{isClickable && setShowCbePopUp(true)}}>
            <View style={{backgroundColor:"#FFF7F3",width:80,height:80,
            borderRadius:20,borderColor:"#FFF7F3",marginTop:10}}>
           
            <Image
                  style={
                    { width: 97, height: 100, borderWidth: 2,alignSelf:'center',flex:1,justifyContent:"center",transform: [{ scale: 0.9 }]}
                  }
                  source={require("../bankLogo/cb.png")}
                />
              
            
            </View>
            </TouchableOpacity>
            </DropShadow>

            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
            <TouchableOpacity onPress={()=>{isClickable && startPayment('TELE_BIRR')}} >
            <View style={{backgroundColor:"#FFF7F3",width:80,height:80,
            borderRadius:20,borderColor:"#FFF7F3",marginTop:10,marginHorizontal:20,marginBottom:10}}>
                     <Image
                  style={
                    { width: 97, height: 100, borderWidth: 2,alignSelf:'center',flex:1,justifyContent:"center", }
                  }
                  source={require("../bankLogo/tb.png")}
                />
                </View>
                  </TouchableOpacity>
</DropShadow>

<DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
                  <TouchableOpacity onPress={()=>{isClickable && startPaymentETH("ETH_SWITCH")}}>
            <View style={{backgroundColor:"#FFF7F3",width:80,height:80,
            borderRadius:20,borderColor:"#FFF7F3",marginTop:10}}>
           
            <Image
                  style={
                   { width: 97, height: 100, borderWidth: 2,alignSelf:'center',flex:1,justifyContent:"center",transform: [{ scale: 0.8 }]}
                  }
                  source={require("../bankLogo/ets1.png")}
                />
              
            
            </View>
            </TouchableOpacity>
            </DropShadow>
           </View>
           
           <View style={{flexDirection:'row',alignSelf:'center',marginTop:10}}>
           <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
           <TouchableOpacity>
            <View style={{backgroundColor:"#FFF7F3",width:80,height:80,
            borderRadius:20,borderColor:"#FFF7F3",marginLeft:20}}>
           
            <Image
                  style={
                   { width: 97, height: 100, borderWidth: 2,alignSelf:'center',flex:1,justifyContent:"center",transform: [{ scale: 0.6 }]}
                  }
                  source={require("../bankLogo/BOA.png")}
                /> 
            
            </View>
            </TouchableOpacity>
            </DropShadow>
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
            <TouchableOpacity >
            <View style={{backgroundColor:"#FFF7F3",width:80,height:80,borderWidth:1,
            borderRadius:20,borderColor:"#FFF7F3",marginBottom:15,marginLeft:30}}>
           
            <Image
                  style={
                   { maxWidth: 90, minHeight: 90, borderWidth: 1,alignSelf:'center',flex:1,justifyContent:"center",transform: [{ scale: 0.6 }],bottom:5}
                  }
                  source={require("../bankLogo/AB.png")}
                />
            
            </View>
            </TouchableOpacity>
            </DropShadow>
           </View>
         
            {/* <Button onPress ={shareViewAsImage} style={{ width:200,alignSelf:"center",marginTop:10,
            backgroundColor:"#FF6A22",borderColor:"#FF6A22"}}>Share</Button> */}
                 <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginBottom: 10,
                    // borderWidth: 1,
                    // borderColor: "#FF6A22",
                    alignSelf: "center",
                  }}
                  onPress={() => navigation.navigate("home")}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#FF6A22",
                      flex: 1,
                      textAlignVertical: "center",
                      alignSelf: "center",
                    }}
                  >
                    BACK TO HOME
                  </Text>
                </Pressable>
                {loadingPay && (
          <View>
            <ActivityIndicator size={"large"} color="#3c6791" />
          </View>
        )}
              </View>
            </DropShadow>
          </Pressable>
        </Modal>
      </View>
    );
  };
  const TwoWayPopUp = () => {
    console.log("book resultttt----------------", roundBook);
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowPopUpRound(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "grey",
              opacity: 0.9,
            }}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 15 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  width: 349,
                  alignSelf: "center",
                  position: "relative",
                  elevation: 20,
                  shadowColor: "black",
                  backgroundColor: "#FFF7F3",
                  borderWidth: 1,
                  borderColor: "#FFF7F3",
                  borderRadius: 30,
                  height: 350,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: "#46BF7A",
                    marginTop: 33,
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  COMPLETED
                </Text>
                <Text
                  style={{ fontSize: 18, marginTop: 20, alignSelf: "center" }}
                >
                  The ticket has
                </Text>
                <Text style={{ fontSize: 18, alignSelf: "center" }}>
                  Successfully purchased.
                </Text>
                <Text
                  style={{ fontSize: 14, marginTop: 30, alignSelf: "center" }}
                >
                  The user will receive SMS message Shortly
                </Text>
                <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginVertical: 20,
                    borderWidth: 3,
                    borderColor: "#FF6A22",
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    getTicket();
                    setShowPopUpRound(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#FF6A22",
                      flex: 1,
                      textAlignVertical: "center",
                      alignSelf: "center",
                    }}
                  >
                    VIEW A TICKET
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginBottom: 32,
                    // borderWidth: 1,
                    // borderColor: "#FF6A22",
                    alignSelf: "center",
                  }}
                  onPress={() => navigation.navigate("home", { loginD })}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#FF6A22",
                      flex: 1,
                      textAlignVertical: "center",
                      alignSelf: "center",
                    }}
                  >
                    BACK TO HOME
                  </Text>
                </Pressable>
              </View>
            </DropShadow>
          </View>
        </Modal>
      </View>
    );
  };

  const paymentInfoOneWay = async () => {
    setLoading(true);

    if (isEnabledTwoWay == false) {
    
      const passengers = arr.map((item, index) => {
        
        return {
        
          name: fullNameList[index].split(' ')[0],
          fatherName: fullNameList[index].split(' ')[1],
          age: 20,
          // gender: "Male",
          phoneNumber: phoneNumberList[index]
    
        }
      });
      
      const bookingData = {
        firstName:fullNameList[0].split(' ')[0],
        // middleName: "string",
        middleName: fullNameList[0].split(' ')[1],
        scheduleId: allData.scheduleUUId,
        routeId: allData.routeID,
        age:20,
        phoneNumber: phoneNumberList[0],
        passengers,
      
      };

      await fetch(
        "http://159.65.88.161:8085/CrossRegional/api/v1/reservation",
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            token : condata.token,
          },
          body: JSON.stringify(bookingData),
        }
      )
        .then((response) => response.json())

        .then((res) => {
          const bookRes = res;
          // console.log(bookRes);
          if (res.apierror == undefined) {
            setBook(bookRes);
            setShowPopUp(true);
            // setArrayT([...arrayT,bookRes.transactionNumber])
            // (bookRes.transactionNumber);
            transactionNumbers.transactionNo.push(bookRes.transactionNumber);
            registerTransaction(bookRes.transactionNumber)
          } else {
            Alert.alert(
              "Yene Guzo",
              "Sorry, The booking session has expired. Please start a new booking.",
              [{ text: "OK", onPress: () => {} }]
            );
            console.log(res.apierror);
          }
          // console.log(bookRes);
        })

        .catch((error) => {
          Alert.alert(
            "Yene Guzo",
            "Sorry, The booking session has expired. Please start a new booking.",
            [{ text: "OK", onPress: () => {} }]
          );
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const paymentInfoTwoWay = async () => {
    setLoading(true);

    const bookingDetails = seat.map((item, index) => {
      return {
      
     
        passenger: {
          phoneNumber: phoneNumberList[index],
          fullName: fullNameList[index],
          age: ageList[index],
          gender: passengersgenderList[index],
        },
      };
    });

    const returnBookingRequest = {
      scheduleUUId: allData.firstScheduleUUId,
      roundTripScheduleUUId: allDataSecondTrip.secondScheduleUUId,
      roundTripOnBoardingUUId: passengerOnboardingListReturn.item.key,
      roundTripOffBoardingUUId: passengerOffBoardingPlaceReturn.item.key,
      isRoundTrip: true,
      bookingDetails,
    };

    await fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/agent/v1/api/booking/create-reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginD.access_token}`,
        },

        body: JSON.stringify(returnBookingRequest),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const roundBookres = res;
        // console.log(Roundbook);
        if (res.apierror == undefined) {
          setRoundBook(roundBookres);
          setShowPopUpRound(true);
        } else {
          Alert.alert(
            "Yene Guzo",
            `Sorry, The booking session has expired. Please start a new booking.`,
            [{ text: "OK", onPress: () => {} }]
          );
        }
      })

      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Yene Guzo",
          "Sorry, The booking session has expired. Please start a new booking.",
          [{ text: "OK", onPress: () => {} }]
        );
      })
      .finally(() => setLoading(false));
  };
   
  const transactionNumbers = {
    transactionNo : []
  }
  const registerTransaction = async (b) => {
    let user = await AsyncStorage.getItem('transactionTest');  
    let parsed = JSON.parse(user);  

  if (parsed === null) {
    parsed = []; }
 parsed.push(b) 
    try {
      await AsyncStorage.setItem('transactionTest', JSON.stringify(parsed));
      console.log('Data stored successfully!',transactionNumbers);
     
      // navigation.navigate('home')
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
  const getData = async()=>{
    try {
        let user = await AsyncStorage.getItem('transactionTest');  
        let parsed = JSON.parse(user);  
        console.log('Data retrieved successfully!',parsed);
      } catch (error) {
        console.error('Error storing data:', error);
      } 
}
  ////////////////////////////////////
  const oneWay = () => {
    if (isEnabledTwoWay == false) {
      return (
        <ScrollView>
          <View style={styles.cards}>
            {/* <Pressable onPress={toPassengerInfo}> */}

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#FF6A22",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  left: 10,
                  marginTop: 10,
                }}
              >
                {/* {allData.busName} */}
                {allData.busName}
              </Text>
              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allData.departureDate).format("dddd").slice(0, 3)}
                {", "}
                {moment(allData.departureDate).format("MMM Do")}, {allData.departTime}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  textAlign: "left",

                  marginLeft: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allData.depaLocat}
              </Text>
              <View
                style={{ flexDirection: "row", marginTop: 10, marginLeft: 15 }}
              >
                <View
                  style={{
                    height: 0,
                    width: 120,
                    borderWidth: 0.5,
                    borderColor: "black",
                    marginTop: 2,
                    borderRadius: 1,
                  }}
                ></View>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  textAlign: "right",
                  flex: 1,
                  right: 10,
                  color: "#212121",
                }}
              >
                {allData.destinlocat}
              </Text>
            </View>
          

            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#212121",
                  fontWeight: "normal",
                }}
              >
                Boarding Place
              </Text>
              {/* <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  right: 10,
                  color: "#212121",
                  fontWeight: "normal",
                }}
              >
                Boarding Time
              </Text> */}
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 12,
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {/* {Object.values(passengerOnboardingList.item.value).map(
                    (item) => item
                  )} */}
                  {allData.boardingPoints}
                </Text>
              </View>
              <View
                style={{
                  width: "27%",
                  bottom: 2,
                  marginLeft: 57,
                  fontWeight: "bold",
                  right: "17%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "right",
                          marginRight: 80,
                          color: "black",
                          fontWeight: "bold",
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          color: "black",
                          fontWeight: "bold",
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 8,
                          color: "black",
                          fontWeight: "bold",
                        }
                  }
                >
                  {/* {Object.values(passengerOffBoardingPlace.item.value).map(
                    (item) => item
                  )} */}
                  {/* {allData.departTime} */}
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                width: screenWidth / 1.2,
                height: 0.1,
                borderWidth: 1,
                alignSelf: "center",
                borderStyle: "dashed",
                borderRadius: 50,
                marginTop: 10,
                borderColor: "#FF6A22",
              }}
            ></View> */}
            {/* <View style={{ flex: 1, marginHorizontal: 3 }}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#FF6A22",
                  marginVertical: 10,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {allData.price} ETB
              </Text>
           
            </View> */}

            {/* </Pressable> */}
          </View>
          <View style={{width:screenWidth/1.1, backgroundColor:"#FFF7F3",alignSelf:"center"
          ,borderWidth:1,borderColor:"#FFF7F3",borderRadius:10,marginTop:10,elevation:5}}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text
                style={{
                  marginLeft: 15,
                 color:"#FF6A22",
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >{`Passenger(s)`}</Text>
    
            </View>
            {fullNameList.map((item, index) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "left",

                        marginLeft: 15,
                        color: "#212121",
                        marginBottom:10
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      marginRight: 40,
                    }}
                  >
              
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              width: screenWidth / 1.11,
              borderWidth: 1,
              borderColor: "#f8f8f8",
              textAlign: "right",
              color: "#FF6A22",
              fontSize: 15,
              fontWeight: "bold",
              backgroundColor:"#FFF7F3",
             borderTopStartRadius:10,
              borderTopEndRadius:10,
              borderBottomWidth:0,
              flex: 1,
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 10,
              elevation:2,
            }}
          >
            <View style={{marginLeft:16,marginVertical:10}}>
            <View style={{flexDirection:"row",flex:1,width:screenWidth/1.2}}>
            <Text
              style={{
                textAlignVertical: "center",
              
                color: "black",
              
                fontSize: 16,
                fontWeight:"400",
                fontFamily:"Arimo-Regular"
                
              }}
            >
              Tariff 
        
            </Text>
            <Text
              style={{
             
                flex:1,
                textAlign:"right",
                textAlignVertical: "center",

                // color: "#FF6A22",
                color: "black",
             
                fontSize: 18,
                fontWeight: "bold",
                fontFamily:"Arimo-Regular"
               
              
                
              }}
            >
           {allData.price} ETB
           {/* 4000 00000000ETB */}
            </Text>
           </View>
           {/* <View style={{width:screenWidth/1.2,borderWidth:1,borderColor:"#FF6A22",borderStyle:"dotted",borderRadius:1,marginVertical:3}}>

           </View> */}

</View>
           
          </View>
          <View
            style={{
              width: screenWidth / 1.11,
             
              borderColor: "#f8f8f8",
              textAlign: "right",
              color: "#FF6A22",
              fontSize: 15,
              fontWeight: "bold",
              backgroundColor:"#FFF7F3",
            borderWidth:1,
            borderBottomEndRadius:10,
            borderBottomStartRadius:10,
              flex: 1,
              flexDirection: "row",
       
              marginLeft: 20,
              
              elevation:2,
            }}
          >
            <View style={{marginLeft:16,marginVertical:10}}>
            <View style={{flexDirection:"row",flex:1,width:screenWidth/1.2}}>
        
           </View>
           {/* <View style={{width:screenWidth/1.2,borderWidth:1,borderColor:"#FF6A22",borderStyle:"dotted",borderRadius:1,marginVertical:3}}>

           </View> */}
<View style={{flexDirection:"row",flex:1}}>
            <Text
              style={{
                
                textAlignVertical: "center",
                color: "black",
                fontSize: 16,
                fontWeight:"400",
                fontFamily:"Arimo-Regular"
              }}
            >
              Total Tariff 
        
            </Text>
            <Text
              style={{
                flex:1,
                textAlign:"right",
                textAlignVertical: "center",
                color: "black",
                // color: "#FF6A22",
                fontSize: 18,
                fontWeight: "bold",
                fontFamily:"Arimo-Regular"
              }}
            >
             {arr.length * allData.price} ETB
            </Text>
            </View>
</View>
          </View>
          <View style={{ alignSelf: "center", marginTop: 80 }}>
            <Pressable
              // onPress={getTicketBtn}
              onPress={() => {
                paymentInfoOneWay();
              }}
              style={{
                backgroundColor: "#FF6A22",
                width: screenWidth / 1.1,
                height: 55,
                borderRadius: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 80,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlignVertical: "center",
                  marginRight: 3,
                }}
              >
                Confirm and Finalize
              </Text>
            </Pressable>
            <View />
          </View>
        </ScrollView>
      );
    }
  };
  //////////////////////////////////
  const twoWay = () => {
    if (returnTicket) {
      return (
        <ScrollView>
          <View style={styles.cards}>
            <Text style={{ marginLeft: 10, color: "#FF6A22", marginTop: 10 }}>
              First Trip
            </Text>
            {/* <Pressable onPress={toPassengerInfo}> */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#FF6A22",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                {`Bus ${index + 1}`}
              </Text>
              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allData.departureDate).format("dddd").slice(0, 3)}
                {", "}
                {moment(allData.departureDate).format("MMM Do")}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",

                  left: 10,
                  color: "#212121",
                }}
              >
                {allData.depaLocat}
              </Text>
              <View style={{ flex: 1 }}>
                <View
                  style={
                    allData.depaLocat.length > 10
                      ? {
                          flexDirection: "row",
                          marginTop: 10,
                          left: screenWidth / 25,
                          marginHorizontal: 3,
                        }
                      : {
                          flexDirection: "row",
                          marginTop: 10,
                          left: screenWidth / 20,
                          marginHorizontal: 3,
                        }
                  }
                >
                  <View
                    style={{
                      height: 0,
                      width: 110,
                      borderWidth: 0.5,
                      borderColor: "#3c6791",
                      marginTop: 2,
                      borderRadius: 1,
                    }}
                  ></View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                }}
              >
                {allData.destinlocat}
              </Text>
            </View>
            <View style={styles.timeStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.departTime}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.arrivalT}
              </Text>
            </View>

            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",

                  marginTop: -5,
                }}
              >
                Boarding Place
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",

                  marginTop: -5,
                }}
              >
                Drop-off Place
              </Text>
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 12,
                    fontWeight: "bold",
                    marginTop: -5,
                  }}
                >
                  {Object.values(passengerOnboardingList.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: "27%",
                  bottom: 2,
                  marginLeft: 57,

                  right: "18%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 10,
                          fontWeight: "bold",
                          left: 3,
                          marginTop: -5,
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          fontWeight: "bold",
                          marginTop: -5,
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          fontWeight: "bold",
                          marginTop: -5,
                        }
                  }
                >
                  {Object.values(passengerOffBoardingPlace.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center", right: 3 }}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - -
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "row",
                  marginBottom: 10,
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    textAlignVertical: "center",

                    color: "#FF6A22",
                  }}
                >
                  First Trip Tariff{" "}
                </Text>
                <Text
                  style={{
                    textAlignVertical: "center",

                    color: "#FF6A22",
                    fontWeight: "bold",
                  }}
                >
                  {/* {allDataSecondTrip.priceReturn}{" "} */}
                  {allData.price} ETB{" "}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cards}>
            <Text style={{ marginLeft: 10, color: "#FF6A22", marginTop: 10 }}>
              Second Trip
            </Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#FF6A22",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  left: 10,
                  marginTop: 10,
                }}
              >
                {/* {allDataSecondTrip.busNameReturn} */}
                {`Bus ${indexR + 1}`}
              </Text>

              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allDataSecondTrip.travelDateReturn)
                  .format("dddd")
                  .slice(0, 3)}
                {", "}
                {moment(allDataSecondTrip.travelDateReturn).format("MMM Do")}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginHorizontal: 3,
                  marginLeft: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allDataSecondTrip.depaLocatReturn}
              </Text>
              <View
                style={
                  allDataSecondTrip.depaLocatReturn.length > 10
                    ? {
                        flexDirection: "row",
                        marginTop: 10,
                        left: screenWidth / 25,
                        marginHorizontal: 3,
                      }
                    : {
                        flexDirection: "row",
                        marginTop: 10,
                        left: screenWidth / 20,
                        marginHorizontal: 3,
                      }
                }
              >
                <View
                  style={{
                    height: 0,
                    width: 110,
                    borderWidth: 0.5,
                    borderColor: "#3c6791",
                    marginTop: 2,
                    borderRadius: 1,
                  }}
                ></View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allDataSecondTrip.destinlocatReturn}
              </Text>
            </View>

            <View style={styles.timeStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,  
                  marginLeft: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allDataSecondTrip.departTimeReturn}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allDataSecondTrip.arrivalTReturn}
              </Text>
            </View>

            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",

                  marginTop: -5,
                }}
              >
                Boarding Place
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",

                  marginTop: -5,
                }}
              >
                Drop-off Place
              </Text>
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 12,
                    fontWeight: "bold",
                    marginTop: -5,
                  }}
                >
                  {Object.values(passengerOnboardingListReturn.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: "29%",
                  bottom: 2,
                  marginLeft: 57,
                  right: "15%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 10,
                          marginTop: -5,

                          fontWeight: "bold",
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          marginTop: -5,

                          marginRight: 10,
                          left: 1,
                          fontWeight: "bold",
                          Right: 10,
                          marginTop: -5,
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 2,
                          marginTop: -5,
                          marginRight: 10,
                          fontWeight: "bold",
                        }
                  }
                >
                  {Object.values(
                    passengerOffBoardingPlaceReturn.item.value
                  ).map((item) => item)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center", right: 3 }}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - -
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 10,
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    textAlignVertical: "center",

                    color: "#FF6A22",
                  }}
                >
                  Second Trip Tariff{" "}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    textAlignVertical: "center",

                    color: "#FF6A22",
                    fontWeight: "bold",
                  }}
                >
                  {allDataSecondTrip.priceReturn} ETB{" "}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "column", marginTop: 10 }}>
              <Text
                style={{ left: 10, fontWeight: "bold" }}
              >{`Passenger(s)`}</Text>
              <Text style={{ left: 10, marginTop: 10 }}>
                {fullNameList.map((item, index) => {
                  return item + "\n";
                })}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                marginTop: 5,

                marginLeft: 30,
                marginRight: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    top: 3,
                  }}
                >{`First trip Seats`}</Text>

                <Text
                  style={{ fontWeight: "bold", top: 3, marginLeft: 30 }}
                >{`Return Seats`}</Text>
              </View>
              <View
                style={{
                  marginBottom: 2,
                  color: "#FF6A22",
                }}
              >
             
              </View>
            </View>
          </View>

          <View
            style={{
              width: screenWidth / 1.1,
              borderWidth: 1,
              borderColor: "#FF6A22",
              textAlign: "right",
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              height: 40,

              borderBottomEndRadius: 10,

              alignSelf: "center",
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "right",
                  textAlignVertical: "center",
                  flex: 1,
                  color: "#FF6A22",
                  marginRight: 10,
                 
                }}
              >
                Total Tariff
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  textAlignVertical: "center",
                  fontSize: 15,
                  color: "#FF6A22",
                  fontWeight: "bold",
                  marginRight: 10,
                  
                }}
              >
                {arr.length * (allDataSecondTrip.priceReturn + allData.price)}{" "}
                ETB{" "}
              </Text>
            </View>
          </View>
          {/* </Pressable> */}

          <View style={{ alignSelf: "center", marginTop: 10 }}>
            <Pressable
              // onPress={getTicketBtn}
              onPress={paymentInfoTwoWay}
              style={{
                backgroundColor: "#FF6A22",
                width: screenWidth / 1.1,
                height: 55,
                borderRadius: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",

                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlignVertical: "center",
                  marginRight: 3,
                }}
              >
                Confirm and Finalise
              </Text>
            </Pressable>
            <View />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.cards}>
          {/* <Pressable onPress={toPassengerInfo}> */}

          <Text
            style={{
              width: screenWidth / 1.1,
              backgroundColor: "#3c6791",
              textAlign: "left",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              height: 30,
              textAlignVertical: "center",
            }}
          >
            {allDataTwo.busName}
          </Text>
          <View style={styles.topCalendar}>
            <Icon name="calendar" style={styles.calanderIcon} />
            <Text
              style={{
                marginHorizontal: 1,
                marginVertical: 6,
                color: "#3c6791",
                left: 10,
              }}
            >
              {allDataTwo.travelDate}
            </Text>
          </View>
          <View style={styles.cityStyle}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "left",
                marginHorizontal: 3,
                left: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.depaLocat}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  height: 0,
                  width: 110,
                  borderWidth: 0.5,
                  borderColor: "#3c6791",
                  marginTop: 2,

                  borderRadius: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.destinlocat}
            </Text>
          </View>
          <View style={styles.timeStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 20,
                color: "#3c6791",
              }}
            >
              {allDataTwo.departTime}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 20,
                color: "#3c6791",
              }}
            >
              {allDataTwo.arrivalT}{" "}
            </Text>
          </View>
          <View style={styles.timeCashStyle}>
            <Icon name="time" style={styles.timeIcon} />
            <Text
              style={{
                textAlign: "left",
                marginVertical: 4,
                left: 10,
                color: "#3c6791",
              }}
            >
              5 hrs 50 min
            </Text>
          </View>

          <View style={styles.cityStyle}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "left",
                marginHorizontal: 3,
                left: 10,
                color: "#3c6791",
                fontWeight: "bold",
              }}
            >
              {allDataTwo.destinlocat}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  height: 0,
                  width: 110,
                  borderWidth: 0.5,
                  borderColor: "#3c6791",
                  marginTop: 2,

                  borderRadius: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
                fontWeight: "bold",
              }}
            >
              {allDataTwo.depaLocat}
            </Text>
          </View>

          <View style={styles.timeStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.departTime}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.arrivalT}{" "}
            </Text>
          </View>
          <View style={styles.boardingTitleStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              Boarding Place
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              Drop-Off Place
            </Text>
          </View>

          <View style={styles.boardingPlaceStyle}>
            <Text
              style={{
                fontSize: 14,
                textAlign: "left",
                flex: 1,
                marginLeft: 10,
                color: "#3c6791",
                marginRight: 25,
              }}
            >
              {/* {Object.values(passengerOnboardingList.item.value).map((item) => item)} */}
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {/* {Object.values(passengerOffBoardingPlace.item.value).map((item) => item)}{" "} */}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "column",
                marginVertical: 10,
                maxWidth: 100,
                marginRight: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#3c6791",
                }}
              >
                Seats
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#3c6791",
                  fontWeight: "bold",
                }}
              >
                {seat.map((item) => item).join(", ")}
              </Text>
            </View>

            <View style={{ flexDirection: "column", marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  marginEnd: 70,
                  flex: 1,
                  right: 10,
                  color: "#3c6791",
                }}
              >
                {" "}
                Passengers
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginRight: 50,
                  flex: 1,
                  color: "#3c6791",
                  fontWeight: "bold",
                }}
              >
                {arr.length}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 3, flex: 1, marginHorizontal: 3 }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              Price per passenger
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
                marginVertical: 10,
                fontWeight: "bold",
              }}
            >
              {allDataTwo.price} ETB
            </Text>
            {/* <Text style ={{fontSize:15,textAlign:'left',flex : 1}}> = 500 ETB</Text> */}
          </View>

          <View
            style={{
              width: screenWidth / 1.1,
              backgroundColor: "#f27f22",
              textAlign: "right",
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              height: 32,
              borderBottomEndRadius: 1,
              borderBottomStartRadius: 1,
            }}
          >
            <Text
              style={{
                textAlign: "right",
                textAlignVertical: "center",
                flex: 1,
                color: "white",
              }}
            >
              Total Price : {arr.length * allDataTwo.price} ETB{" "}
            </Text>
          </View>
          {/* </Pressable> */}
        </View>
      );
    }
  };

  ///////////////////////////
  //////////////////////////
  return (
    <ScrollView style={{ backgroundColor: "#FFF7F3" }}>
      <View>
        {showPopUp && oneWayPopUp()}
        {showPopUpRound && TwoWayPopUp()}
        {showCbePopUp && cbePopUp()}
        {returnTicket ? twoWay() : oneWay()}

        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#3c6791" />
          </View>
        )}
      </View>
      {/* <View>
        <Pressable
          onPress={() => {
          //  console.log("jnjnj",transactionNumbers)
          // registerTransaction()
          getData()
          }}
          style={{ backgroundColor: "tomato", width: 50, height: 50 }}
        >
          <Text>test</Text>
        </Pressable>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "flex-start",
  },
  label: {
    margin: 5,
  },
  calanderIcon: {
    fontSize: 20,
    color: "#212121",

    // marginHorizontal:10,

    marginLeft: 10,
  },
  topCalendar: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  editIcon: {
    fontSize: 40,
    color: "tomato",
    marginHorizontal: 120,
    marginVertical: 30,
  },
  cards: {
    width: screenWidth / 1.1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FFF7F3",
    shadowOffset: 10,
    shadowColor: "black",
    marginHorizontal: 10,

    marginTop: 10,
    alignSelf: "center",

    backgroundColor: "#FFF7F3",
    shadowColor: "black",
    elevation: 5,
  },
  cashStyle: {
    width: 80,
    height: 40,
    backgroundColor: "#3c6791",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    borderBottomEndRadius: 10,
  },

  cityStyle: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  timeStyle: {
    flexDirection: "row",
    marginBottom: 10,
  },
  timeCashStyle: {
    flexDirection: "row",
    marginBottom: 0,

    // justifyContent : 'space-around'
  },
  timeIcon: {
    fontSize: 20,
    color: "#212121",
    left: 10,
    marginTop: 3,
  },
  boardingTitleStyle: {
    flexDirection: "row",
    marginTop:5
  },
  boardingPlaceStyle: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 11,
  },
});
