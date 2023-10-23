import * as React from "react";
import { useState, useEffect,useRef,useContext } from "react";
import {
  useRoute,
  useIsFocused,
  useFocusEffect,
} from "@react-navigation/native";

// import {ticketImg}from '../Img/ticket.svg'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  ImageBackground,
  Dimensions,
  Switch,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Alert,
  CameraRoll ,
  Modal,
} from "react-native";
// import {CheckBox} from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { faTicket } from "@fortawesome/free-solid-svg-icons/faTicket";
import DropShadow from "react-native-drop-shadow";
import QRCode from "react-native-qrcode-svg";
import Base64 from 'react-native-base64';
import ViewShot from "react-native-view-shot";
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share'
import { DataContext } from '../DataContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from "react-native-fs";
import moment from "moment";
import { all } from "axios";

const screenWidth = Dimensions.get("window").width;

export default function TicketScreen({ navigation }) {
  const [showSideBar, setShowSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketImage, setTicketImage] = useState()
  const [onewayload,Setoneway] = useState(false)
  const [userData,setUserData] = useState()
  const { condata, addData } = useContext(DataContext);
  const route = useRoute();
  const allData = route.params.allData;
  const phoneNumberList = route.params.phoneNumberList;
  const ageList = route.params.ageList;
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const returnSeat = route.params.returnSeat;
  const allDataTwo = route.params.allDataTwo;
  const passengerOffBoardingPlace = route.params.passengerOffBoardingPlace;
  const passengerOnboardingList = route.params.passengerOnboardingList;
  const passengersgenderList = route.params.passengersgenderList;
  const seat = route.params.seat;
  const roundBook = route.params.roundBook;
  // const book = route.params.bookRes;
  const ticketInfo = route.params.bookRes;
  const returnTicket = route.params.returnTicket;

  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const fullNameList = route.params.fullNameList;
  const passengerOffBoardingPlaceReturn =
    route.params.passengerOffBoardingPlaceReturn;
  const passengerOnboardingListReturn =
    route.params.passengerOnboardingListReturn;
    const numberOfPassengers = route.params.numberOfPassengers
    const arr = Array(numberOfPassengers).fill(numberOfPassengers)

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       // navigation.navigate("home", { loginD });
  //       return true;
  //     };

  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  //   }, [])
  // );
  
  useEffect(() => {
    getData()
  }, []);
  const viewRef = useRef();


  const shareViewAsImage= async () => {
    try {
      const uri = await viewRef.current.capture();
      const shareOptions = {
        title: 'Share Image',
        message: 'Your Ticket',
        url: uri, 
        type: 'image/jpeg',
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

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
  const captureView = ()=>{
   
   // setLoading(true)
    const captureView = async () => {
      try {
       
        const captureResult = await captureRef(viewRef, {
          format: 'png',
          quality: 1,
        });
        setTicketImage(captureResult)
        
        const base64 = await RNFS.readFile(captureResult, 'base64');    
       const base64Image = `data:image/png;base64,${base64}`;   
       const uri = await viewRef.current.capture();
     
      } catch (error) {
        console.log('Failed to capture view as image:', error);
      }
     // setLoading(false);
    
    };

    captureView();
}


const allin =()=>{
  return(
    <ViewShot ref={viewRef}   >
      {oneWayTicket()}
      </ViewShot>
  )
}
  const scaledTicket =()=>{
    return(
      <View style={  ticketInfo && ticketInfo.paymentDetails.length ==2 ? {transform: [{ scale: 0.8 }] , marginTop:-170,marginBottom:-150,marginLeft:35}
       : 
       ticketInfo &&  ticketInfo.paymentDetails.length ==3 ? {transform: [{ scale: 0.8 }] , marginTop:-400,marginBottom:-260,marginLeft:35} :
       {transform: [{ scale: 0.8 }] , marginTop:-90,marginBottom:-80,marginLeft:35}}>
        {allin()}
      </View>
    )
  }
  const oneWayTicket = () => {

    return ticketInfo && ticketInfo.paymentDetails.map((x, index) => {
      return (
    
    <View style={{backgroundColor:"#FFF7F3"}}>
        
<View style={{width:screenWidth/1.1,backgroundColor:  "#FFF7F3",marginLeft:-20,
marginBottom:10,marginTop:10,elevation:5,
marginRight:10}}>
<Text style={{alignSelf:"center",fontSize:30,fontWeight:'bold',marginTop:20,marginBottom:5}}> {ticketInfo.associationName}</Text>

<Text style={{alignSelf:"center",fontSize:16,fontWeight:'400'}}>Date {moment().format("MMM Do Y")}</Text>
<Text style={{marginBottom:10,fontSize:18,fontWeight:'bold',alignSelf:"center"}}>------------------------------------------</Text>
<View style={{flex:1,flexDirection:"column",marginLeft:20,marginRight:10}}>

  <Text style={{marginBottom:10,fontSize:22,fontWeight:'400'}}>Ticket No. :-<Text style={{fontWeight:"500"}}>{'   '}{x.ticketNumber}</Text></Text>
  <Text style={{marginBottom:10,fontSize:22,fontWeight:'400'}}>Departure Date :-<Text style={{fontWeight:"500"}}> {'  '}{ticketInfo.departureTime}</Text></Text>
  <Text style={{marginBottom:10,fontSize:22,fontWeight:'400'}}>Departure Time :- <Text style={{fontWeight:"500"}}>{'  '}{ticketInfo.boardingTime}</Text></Text>
  <Text  style={{marginBottom:10,fontSize:22,fontWeight:'400'}}>Passenger Name :-<Text style={{fontWeight:"500"}}>{'  '}{x.name} {x.fatherName}  </Text> </Text>
  <Text  style={{marginBottom:10,fontSize:22,fontWeight:'400'}}>From :-<Text style={{fontWeight:"500"}}>{'  '}{`${ticketInfo.departureLocation}`}</Text></Text>
  <Text  style={{marginBottom:5,fontSize:22,fontWeight:'400'}}>To :-<Text style={{fontWeight:"500"}}>{'  '}{`${ticketInfo.destinationLocation}`}</Text></Text>
  <Text  style={{marginBottom:5,fontSize:22,fontWeight:'400'}}>Seat no. :-<Text style={{fontWeight:"500"}}>{'  '} {x.seatNumber}</Text></Text>
  <Text  style={{marginBottom:5,fontSize:22,fontWeight:'400'}}>Side no. :-<Text style={{fontWeight:"500"}}>{'  '}{ticketInfo.sideNumber}</Text></Text>
  <View style={{flex:1,flexDirection:'row',marginBottom:10,height:35}}>
  <Text style={{fontSize:22,fontWeight:'400',top:6}}>Plate no. :-  </Text>
  <Text style={{fontSize:28,fontWeight:'500',textDecorationLine:'underline',
   textDecorationThickness: 10,
  }}>{`${ticketInfo.plateNumber}`}</Text>
  </View>

  <Text  style={{marginBottom:10,fontSize:22,fontWeight:'400'}}>Amount :-<Text style={{fontWeight:"500"}}>{'  '}{`${ticketInfo.totalPayment}`}</Text></Text>
  
  <Text style={{marginBottom:10,fontSize:18,fontWeight:'bold',alignSelf:"center"}}>------------------------------------------</Text>
  <View style={{alignSelf:'center',marginBottom:10,marginTop:5 ,flex:1,flexDirection:'row'}}>
  <QRCode
                          value={x.qrCode}
                          size={140}
                          color="#000000"
                          // backgroundColor="#ffffff"
                        />
                        <View style={{justifyContent:"center",marginLeft:15}} >
                          <Text style={{fontSize:18,fontWeight:'500'}}> Validaion Number</Text>
                          <Text style={{fontSize:25,fontWeight:'500',marginLeft:20}}>{x.validationCode}</Text>
                        </View>
                        </View>
                        <Text style={{marginBottom:10,marginTop:3,fontSize:18,fontWeight:'bold',alignSelf:"center"}}>------------------------------------------</Text>                     
  <Text  style={{marginBottom:5,fontSize:15,fontWeight:'600',alignSelf:"center"}}>VALID FOR ONE TRIP ONLY</Text>
  <Text style={{marginBottom:5,fontSize:18,fontWeight:'bold',alignSelf:"center"}}>POWERED BY KIFIYA</Text>
  <Text style={{marginBottom:5,fontSize:18,fontWeight:'bold',alignSelf:"center"}}>Call 8586 for more information</Text>
  <Text style={{marginBottom:5,fontSize:18,fontWeight:'bold',alignSelf:'center'}}>------------------------------------------</Text>
</View>
</View>
</View>
      );
    });
  };


  /////////////////////////////

  const twoWayTicket = () => {
    return ticketInfo && ticketInfo.map((x, index) => {
      return (
        <View
          style={{
            flexDirection: "column",
            transform: [{ rotate: "-90deg" }],
            marginTop: 240,
            marginBottom: 250,
            elevation: 10,
          }}
        >
          <View>
            <View style={{ marginTop: -200 }}>
              <DropShadow
                style={{
                  shadowColor: "black",

                  shadowOffset: { width: -1, height: 5 },
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                }}
              >
                <ScrollView horizontal={true}>
                  <View style={{ backgroundColor: "#EBEBEB" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text
                        style={{
                          marginTop: 10,
                          marginLeft: 10,
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {ticketInfo[index].organizationName}
                      </Text>
                      <Text
                        style={{
                          marginTop: 20,
                          marginLeft: 10,
                          flex: 1,
                          textAlign: "right",
                          marginRight: 10,
                          fontSize: 10,
                        }}
                      >
                        {`Invoice Number ${ticketInfo[index].invoiceNumber}`}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        borderWidth: 0.8,
                        borderColor: "black",
                        marginLeft: 10,
                      }}
                    ></View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 10,
                          marginRight: 10,
                          fontSize: 10,
                        }}
                      >
                        Passenger Name
                      </Text>
                      <Text style={{ marginLeft: 10, fontSize: 18 }}>
                        {ticketInfo[index].fullName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        marginBottom: 20,
                      }}
                    >
                      {/* firstrow */}
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            BUS NAME
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].organizationName}
                            </Text>
                          </View>
                        </View>

                 
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            ON{"\n"}BOARDING
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].onBoardingPlace}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            DEPARTURE{"\n"}DATE
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].departureDate}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            AMOUNT PAID{"\n"}
                            {`(NUM)`}
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: -5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].price}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* secondrow */}
                      <View style={{ marginLeft: 20 }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            FROM
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 30,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].from}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            TO
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 48,
                              width: 100,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].to}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            OFF{"\n"}BOARDING
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 10,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].offBoardingPlace}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            DEPARTURE{"\n"}Time
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: 5,
                              width: 105,
                              height: 20,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].departureTime}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 10,
                            }}
                          >
                            AMOUNT PAID{"\n"}
                            {`(ALPHABET)`}
                          </Text>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginLeft: -5,
                              width: 105,
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 1,
                              }}
                            >
                              {ticketInfo[index].totalPriceInWord}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: 20,
                          marginTop: 10,
                          marginRight: 30,
                        }}
                      >
                        <QRCode
                          value={ticketInfo[index].ticketNumber}
                          size={120}
                          color="#000000"
                          // backgroundColor="#ffffff"
                        />
                        <Text
                          style={{
                            flex: 1,
                            textAlign: "center",
                            marginTop: 10,
                          }}
                        >
                          {ticketInfo[index].ticketNumber}
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          flex: 1,
                          textAlign: "center",
                        }}
                      >
                        REMINDER
                      </Text>
                      <Text
                        style={{ flex: 1, fontSize: 10, textAlign: "center" }}
                      >
                        This is one time travel ticket, please arrive at the bus
                        station at least 15 minutes before departure
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </DropShadow>
            </View>
            {/* <View>
      <Text>{`Scroll >>`}</Text>
      </View> */}
          </View>
          {/* //////////////////////////////////////
      ////////////////////////////////////// */}
        </View>
      );
    });
  };

  ////////////////////////////////////
  const Sidebar = () => {
    return (
      <View>
        <Modal
          transparent={true}
          onBackdropPress={() => {
            setShowSideBar(false);
          }}
          onRequestClose={() => {
            setShowSideBar(false);
          }}
          // onRequestClose={setShowSideBar(false)}
        >
          <Pressable
          onPress={(event) => event.target == event.currentTarget && setShowSideBar(false)}
          style={{ flex: 1, justifyContent: "center" }}
          >
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
                     alignSelf:'center'
                    }}
                  />
                  <Text
                    style={{ marginTop: 10, color: "white" }}
                  >
                    {userData && userData.userName}
                  </Text>
                  <Text
                    style={{ marginTop: 10, color: "white", marginLeft: 10 }}
                  >
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, marginTop: 50 }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowSideBar(false)
                   navigation.navigate('home');
                   
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
                   
                    navigation.navigate("refundTicket");
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

  const printTicket = async () => {
    const pdfBytes = await captureView();
    const filePath = `${RNFS.DocumentDirectoryPath}/example.pdf`;
    await RNFS.writeFile(filePath, pdfBytes, "base64");
  };
  ///////////////////////////////////////

  return (
    <ScrollView style={{ backgroundColor: "#FFF7F3" }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setShowSideBar(true);
          }}
        >
              <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setShowSideBar(true);
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignSelf: "flex-start",
                marginVertical: 30,
                marginLeft: 30,
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
          <Pressable>
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
                    marginTop: 15,
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
                alignItems:'flex-end'
                }}
              />
            </View>
          </Pressable>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginLeft: 100,
              top: 10,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ marginTop: 10, color: "#FF6A22", marginLeft: 25 }}>
                {/* {loginD.fullName} */}
              </Text>
           
            </View>
            <Image
              source={require("../Img/profile10.png")}
              style={{
                width: 50,
                height: 50,
                marginLeft: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      {showSideBar && Sidebar()}

      <ScrollView
        // horizontal={true}
        style={{
          marginBottom: 10,
          alignSelf: "flex-start",
        }}
      >
        {isEnabledTwoWay ? twoWayTicket() : scaledTicket()}
      </ScrollView>
      
      <View>
       
            <TouchableOpacity
              onPress={() => {shareViewAsImage();
                console.log('vdsvsvd---',ticketInfo)
              
              }}
              style={{
                backgroundColor: "#FF6A22",
                width: screenWidth / 1.3,
                height: 55,
                borderRadius: 15,
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                  flex: 1,
                  textAlignVertical: "center",
                }}
              >
                Share
              </Text>
            </TouchableOpacity>
        {/* <Pressable onPress={()=>{console.log('fgdgdfb---',arr)}} style={{backgroundColor:"red",width:100,height:100}}>

        </Pressable> */}
      
        {loading && (
        <View>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
      </View>
    </ScrollView>
  );
}
