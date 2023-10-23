import React, { useState, useEffect,useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  BackHandler,
  Switch,
  Linking,
  TextInput,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Modal,
  Date,
  RefreshControl,
  NativeModules,
  Keyboard
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import Clipboard from '@react-native-clipboard/clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import {
  Icon,
  IconElement,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useRoute ,useIsFocused,
  useFocusEffect, } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";
import { DataContext } from '../DataContext';
const screenWidth = Dimensions.get("window").width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faL } from "@fortawesome/free-solid-svg-icons";
import IntentLauncher, { IntentConstant } from 'react-native-android-intent-launcher'
const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;


export default function RefundCancelRequest({ navigation }) {
  const [ticketNum, setTicketNum] = React.useState();
  const { condata, addData } = useContext(DataContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showCbePopUp, setShowCbePopUp] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [bankSelectedTeleBirr, setBankSelectedTeleBirr] = useState(false);
  const [bankSelectedCbe, setBankSelectedCbe] = useState(false);
  const [userData,setUserData] = useState()
  const [userTransaction,setUserTransaction] = useState()
const [searchTick,setSearchTick] = useState(false)
const [refreshing, setRefreshing] = useState(false);
const [isClickable,setIsClickable] = useState(true)
  const isRefund = true;
  const route = useRoute();
  const { CustomModule } = NativeModules;


 useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("home");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  useEffect(() => {
    getData()
  }, []);
  useEffect(() => {
    getDataTransaction()
  }, []);
  useEffect(() => {
    searchTick && SearchTicket()
  }, [ticketNum]);

  const getData = async()=>{
    try {
        let user = await AsyncStorage.getItem('Data');  
        let parsed = JSON.parse(user);  
        setUserData(parsed)
        console.log('Data retrieved successfully!',parsed.userName);
      } catch (error) {
        console.error('Error storing data:', error);
      } 
  }
  const getDataTransaction = async()=>{
    try {
        let user = await AsyncStorage.getItem('transactionTest');  
        let parsed = user!=null && JSON.parse(user);  
      setUserTransaction(parsed)
        console.log('Data retrieved successfully!',parsed.transactionNo);
      } catch (error) {
        console.error('Error storing data:', error);
      } 
  }
  const renderIcon = (props) => (
    <TouchableWithoutFeedback>
      <Text style={{ color: "#006ED5", fontSize: 25, fontWeight: "bold" }}>
        *
      </Text>
    </TouchableWithoutFeedback>
  );
  const closeModal = () => {
    setShowSideBar(false);
  };
  const reversedArray =userTransaction && userTransaction

  const onRefresh = React.useCallback(async () => {
  setTicketNum('')
  }, [refreshing]);
  const Sidebar = () => {
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowSideBar(false);
          }}
        >
          <Pressable
            onPress={(event) => event.target == event.currentTarget && setShowSideBar(false)}
          style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={{
                width: screenWidth / 1.6,
                alignSelf: "flex-start",
                position: "relative",
                elevation: 20,
                shadowColor: "black",

                backgroundColor: "#808080",
                opacity: 0.9,

                height: Dimensions.get("window").height,
              }}
            >
              <TouchableOpacity
                style={{ marginBottom: 30 }}
                onPress={() => {
                  setShowSideBar(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "column",

                    top: 20,
                    alignSelf: "flex-end",
                    width: 50,
                    height: 50,
                  }}
                >
                  <Image
                    source={require("../Img/close1.png")}
                    style={{
                      width: 35,
                      height: 35,
                      marginRight: 20,
                      top: 30,
                      marginBottom:5
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginBottom: 30 }}>
                <View
                  style={{
                    flexDirection: "column",
                    top: 30,
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={require("../Img/profile10.png")}
                    style={{
                      width: 60,
                      height: 60,
                    
                      alignSelf:"center"
                    }}
                  />
                  <Text
                    style={{ marginTop: 10, color: "white" }}
                  >
                    {userData.userName}
                  </Text>
               
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, marginTop: 50 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("home");
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/home.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      BOOK
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/ticketsb.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      TICKET
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("cancelTicket");
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/history.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      HISTORY
                    </Text>
                  </View>
                </TouchableOpacity>
              
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("profile");
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/user.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 18,

                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      PROFILE
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("refund");
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/refund.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 18,

                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      REFUND
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  };
  
  const getCurrentActivityName = () => {
   
    CustomModule.getCurrentActivityName().then((currentActivityName) => {
      console.log('Current activity name:', currentActivityName);
    }).catch((error) => {
      console.error('Error getting current activity:', error);
    });
  };

  const startPaymentETH = (ticketNum , paymentType) => {
   
console.log('Transaction number :-',ticketNum)
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
            transactionNumber:ticketNum, 
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
            Linking.openURL(EtcUrl)
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
        .finally(() => {setLoadingPay(false); setIsClickable(true) });

  };


  const startPayment = (ticketNum , paymentType) => {
   
    console.log('Transaction number :-',ticketNum)
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
                transactionNumber: ticketNum,
                paymentProvider: paymentType,
                paymentChannel: "ANDROID",
            returnApp:{Activity:"MainActivity",PackageName:"com.yeneguzo"}
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
                "Sorry, The selected date is in the past. Please select a future date.",
                [{ text: "OK", onPress: () => { } }]
              );
              return;
            })
            .finally(() => {setLoadingPay(false); setIsClickable(true) });
    
      };
  const SearchTicket = () => {
    Keyboard.dismiss()
    if (ticketNum != null) {
      setLoading(true);
      
    fetch(
      "http://159.65.88.161:8085/CrossRegional/api/v1/reservation/issue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token : condata.token
          },
          body: JSON.stringify({
            transactionNumber: ticketNum
          }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const bookRes = data;
          console.log('data---------',data)
          if(data.status == 4){
        setShowPopUp(true)
          }
          else if(data.status == 5){
            Alert.alert("Yene Guzo", "Ticket cannot be issued, reservation is canceled by system", [
              { text: "OK", onPress: () => {} },
            ]);
          }
      else{
        navigation.navigate("ticketScreen",{bookRes})
      }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            "Yene Guzo",
            "Sorry, The session has expired. Please try again later. ",
            [{ text: "OK", onPress: () => {} }]
          );
        })
        .finally(() => {
          setLoading(false);
          setSearchTick(false)
        });
    } else {
      Alert.alert("Yene Guzo", "Fill the required fields ", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };

const copyTicket = (ticketN)=>{
  Clipboard.setString(`${ticketN}`)
  console.log('Ticket Number-------',ticketN)
}
  const Refund = () => {
    return (
      <View style={{ marginTop: 10,marginBottom:10 }} >
       
        <DropShadow
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: 1, height: 5 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
          }}
        >
          <View
            style={{
              width: screenWidth / 1.1,
              borderWidth: 1,
              borderRadius: 35,
              backgroundColor: "#FFF7F3",
              borderColor: "#FFF7F3",
              height: 265,
              marginBottom: 40,
              elevation: 10,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "#FF6A22", marginLeft: 30 }}>
            Check Ticket
            </Text>
            <Text style={{ fontSize: 14, marginLeft: 30, marginVertical: 10 }}>
              Please add your Bill Reference
            </Text>
            <Input
              value={ticketNum}
              placeholder="Bill Reference"
              accessoryRight={renderIcon}
              keyboardType="numeric"
              onChangeText={(nextValue) => setTicketNum(nextValue)}
              style={{
                width: screenWidth / 1.3,
                marginBottom: 10,
                borderWidth: 1,
                borderRadius: 10,
                alignSelf: "center",
                elevation: 20,
                shadowColor: "black",
                backgroundColor: "#FFF7F3",
                borderColor:"#FFF7F3"
              }}
            />
            <Button
              style={{
                width:257 ,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                borderColor:'#FF6A22',
                backgroundColor: "#FF6A22",
                alignSelf: "center",
              }}
              onPress={SearchTicket}
            >
              Seacrh
            </Button>
          </View>
        </DropShadow>
        {/* <Button onPress={()=>{Clipboard.setString('hello world');}}>Hello</Button> */}
      {userTransaction &&  <Text style={{alignSelf:'center',marginBottom:10,color:"#FF6A22",fontWeight:'700',fontSize:16}}>{`Latest Bill Reference(s)`}</Text>}
      {userTransaction &&  <Text style={{alignSelf:'center',marginBottom:10,color:"#FF6A22",fontWeight:'700',fontSize:14}}>{`If your already made a payment, please wait for a confirmaton text message before checking`}</Text>}
          {userTransaction && [...reversedArray].reverse().map((tn,index)=>{
            if(index < 3){
            return(
              <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={()=>{setTicketNum(tn), setSearchTick(true)}}
              style={{width:screenWidth/1.3,backgroundColor: "#FFF7F3",marginLeft:10,
              height:50,alignSelf:"center",marginBottom:10,
              elevation:3,borderWidth:1,borderRadius:10,borderColor:"#FFF7F3"}}>
<Text style={{alignSelf:'center',flex:1,textAlignVertical:'center'}}>Bill Reference : 
<Text style={{fontWeight:"800"}}>{tn}</Text>
</Text>
                </TouchableOpacity>
<TouchableOpacity style={{marginTop:15,marginLeft:5}} onPress={()=>{copyTicket(tn)}}>
  <FontAwesomeIcon
  icon={faCopy}
  size={20}
  style={{
    color:  "#FF6A22",
    alignSelf: "center",
    borderColor:'red',
    justifyContent: "center",
  
}}
/>
</TouchableOpacity>
</View>

            )}
          })}
          {/* <Pressable onPress={getCurrentActivityName} style={{backgroundColor:"black",width:100,height:100}}></Pressable> */}
        
      </View>
    );
  };
  const cbePopUp = () => {
   
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
            
   
    <Text onPress={()=>{copyTicket(ticketNum)}} style={{fontSize:18,fontWeight:'500',}}>{' '}{`${ticketNum}`}</Text> </Text>
      
            <TouchableOpacity style={{marginLeft:5}} onPress={()=>{copyTicket(ticketNum)}}>
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
         <Text style={{fontSize:16,marginBottom:10}}>Step 5 - Enter Bill Reference No. <Text style={{fontWeight:'bold'}}>{`(${(ticketNum)})`}</Text>  </Text>
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
                
              </View>
            </DropShadow>
          </Pressable>
        </Modal>
      </View>
    );
  };
  const oneWayPopUp = () => {
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowPopUp(false);
          }}
        >
          <Pressable
               onPress={(event) => event.target == event.currentTarget && setShowPopUp(false)}
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
                  style={{ fontSize: 18, marginTop: 20, alignSelf: "center" }}
                >
               payment has not been made.
                </Text>
                <Text style={{ fontSize: 18, alignSelf: "center" }}>
                  Do you want to pay now?
                </Text>
          <View style={{flexDirection:"row",alignSelf:"center",marginBottom:10}}>
          <Text onPress ={()=>{copyTicket(ticketNum)}} style={{marginTop:10}}>Bill Reference: <Text style={{fontWeight:"800"}}>{ticketNum}</Text></Text>
          <TouchableOpacity style={{marginLeft:7,marginTop:7}} onPress={()=>{copyTicket(ticketNum)}}>
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
           <View style={{flexDirection:'row',alignSelf:'center'}}>
           <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
           <TouchableOpacity onPress={()=>{ isClickable && setShowCbePopUp(true)}}>
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
            <TouchableOpacity onPress={()=>{isClickable && startPayment(ticketNum ,"TELE_BIRR")}}>
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
                  <TouchableOpacity onPress={()=>{ isClickable && startPaymentETH(ticketNum ,"ETH_SWITCH")}}>  
            <View style={{backgroundColor:"#FFF7F3",width:80,height:80,borderWidth:3,
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
 <View style={{backgroundColor:"#FFF7F3",width:80,height:80,borderWidth:3,
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
          
                 <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginBottom: 10,
        
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
        <View style={{}}>
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
  return (
    <ScrollView 
    
    keyboardShouldPersistTaps='handled'
    style={{ backgroundColor: "#FFF7F3" }}  
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      
    } >
      {showSideBar && Sidebar()}
      {showPopUp && oneWayPopUp()}
      {showCbePopUp && cbePopUp()}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowSideBar(true);
          }
        }
        >
                     <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignSelf: "flex-start",
                marginVertical: 30,
                marginLeft: 20,
              }}
            >
              <Image
                source={require("../Img/hamburgery.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
        
            <View
              style={{
               
                flexDirection: "row",
                width:screenWidth/1.3,
                // backgroundColor:'red',
                marginLeft:10,
                top: 10,
              }}
            >
              <View style={{flex:1, flexDirection: "column" }}>
                <Text
                  style={{
                    flex:1,
                    marginTop: 20,
                    color: "#FF6A22",
                    textAlign: "right",
                    alignSelf:'flex-end',
                    marginRight:10
                  }}
                >
                    {userData && userData.userName}
                </Text>
                {/* <Text style={{color:"#000000",flex:1,textAlign: "right",
                    alignSelf:'flex-end',marginRight:10}}>
                  {condata.terminalName}</Text> */}
              </View>
              <Image
                source={require("../Img/profile10.png")}
                style={{
                 
                  width: 50,
                  height: 50,
                  marginRight:10
                }}
              />
            </View>
          
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1,alignSelf:"center" }}>{Refund()}</View>
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
  {/* <Pressable style={{width:100,height:100,backgroundColor:"black"}} onPress={getCurrentActivityName}></Pressable> */}
    </ScrollView>
  );
}
