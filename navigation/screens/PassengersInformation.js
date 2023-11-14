import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Switch,
  TextInput,
  Alert,
  Button,
  Pressable,
  TouchableOpacity,
  Date,
  Keyboard,
} from "react-native";
import { useFocusEffect, useIsFocused, } from '@react-navigation/native';
import { SelectList } from "react-native-dropdown-select-list";
import { useRoute } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";
import { DataContext } from '../DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Icon,
  IconElement,
  Input,

} from "@ui-kitten/components";
import { parse } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;
const initialLayout = { width: Dimensions.get('window').width };
export default function PassengersInformation({ navigation }) {
  const [isForOthers, setIsForOthers] = useState()
  useEffect(() => { getData() }, [isForOthers])
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState()

  const getData = async () => {
    try {
      let user = await AsyncStorage.getItem('Data');
      const parsed = JSON.parse(user);
      setUserData(parsed)
      console.log('Data retrieved successfully!', parsed.userName);
      if (!isForOthers) {
        setFirstName({ ...firstName, [0]: parsed.userName.split(' ')[0] })
        setLastName({ ...lastName, [0]: parsed.userName.split(' ')[1] })
        setPhoneNumber({ ...phoneNumber, [0]: parsed.userPhone })
      }
      else if (isForOthers) {
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
      }
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }

  const userDataFirstName = userData && userData.userName.split(' ')[0]
  const userDataLastName = userData && userData.userName.split(' ')[1]
  const userDataPhoneNumber = userData && userData.userPhone

  const [selected, setSelected] = useState("");
  const { condata, addData } = useContext(DataContext);
  // const [validate , setValidation] = useState({age:})
  const [fullName, setFullName] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [onboarding, setOnBoarding] = useState([]);
  const [offboarding, setOffBoarding] = useState([]);
  const [onboardingReturn, setOnBoardingReturn] = useState([]);
  const [offboardingReturn, setOffBoardingReturn] = useState([]);
  const [textInputPhone, settextinputPhone] = useState(true);
  const [showOption, setShowOption] = useState(false)
  const [refresh, setRefresh] = useState(false);

  useFocusEffect(() => {
    setRefresh(true);

    return () => {
      setRefresh(false);
    };
  });
  const route = useRoute();

  const loginD = route.params.loginD;
  const index = route.params.index;
  const indexR = route.params.indexR;

  const allData = route.params.allData;
  const allDataTwo = route.params.allDataTwo;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const returnTicket = route.params.returnTicket;
  const numberOfPassengers = route.params.numberOfPassengers;
  const valueTo = route.params.valueTo;
  const fromText = route.params.fromText;
  const [loading, setLoading] = useState(false);
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const firstNameList = Object.values(firstName);
  const lastNameList = Object.values(lastName);
  const [validatedForm, setValidatedForm] = useState(false);
  const [phoneNumberForQuuick, setPhoneNumberForQuick] = useState()
  const [showTabOne, setShowTabOne] = useState(true)
  const [showTabTwo, setShowTabTwo] = useState(false)
  // const totalPrice =  seat.length * allData.price
  // const totalPriceTwoWay = seat.length * allDataTwo.price
  // const fullNameList = Object.values(fullName);
  const fullNameList = firstNameList.map((fName, index) => {
    return `${fName} ${lastNameList[index]}`;
  });
  const arr = Array(numberOfPassengers).fill(numberOfPassengers)
  const phoneNumberList = Object.values(phoneNumber);
  const ageList = Object.values(age);
  const passengersgenderList = Object.values(gender);
  const passengerOnboardingList = onboarding;
  const passengerOffBoardingPlace = offboarding;
  const passengerOnboardingListReturn = onboardingReturn;
  const passengerOffBoardingPlaceReturn = offboardingReturn;
  useEffect(() => {
    // setFirstName('')
    // setLastName('')
    // setAge('')
    // setGender('')
    // setPhoneNumber('')
    // setOnBoarding('')
    // setOffBoarding('')
    // setShowOption('')
    // setPhoneNumberForQuick('')

  }, [isFocused]);
  const ageChecker = () => {
    const ageChecked = ageList.every((age) => {
      if (age < 115 && age > 0) {
        return true;
      } else {
        return false;
      }
    });
    return ageChecked;
  };
  const adultChecker = () => {
    const adultFound = ageList.some((age) => {
      if (age >= 18) {
        return true;
      } else {
        return false;
      }
    });

    return adultFound;
  };

  const phoneNumberChecker = () => {
    const allCorrect = phoneNumberList.every((phonenum) => {
      if (phonenum.length == 10 || (phonenum.length == 13 && !undefined)) {
        return true;
      } 
   
      else {
        return false;
      }
    });

    return allCorrect;
  };

  const firstNameChecker = () => {
    const isFirstNameValid = firstNameList.every((firstNamee) => {
      if (
        firstNamee.length >= 3 &&
        firstNamee.length <= 15 &&
        /\d/.test(firstNamee) == false
      ) {
        return true;
      } else if (/\d/.test(firstNamee) == false) {
        // return true
        console.log("---------checked");
      } else {
        return false;
      }
    });
    return isFirstNameValid;
  };
  const lastNameChecker = () => {
    const isLastNameValid = lastNameList.every((lastNamee) => {
      if (
        lastNamee.length >= 3 &&
        lastNamee.length <= 15 &&
        /\d/.test(lastNamee) == false
      ) {
        return true;
      } else {
        return false;
      }
    });
    return isLastNameValid;
  };
  const test = () => {
    //  phoneNumberChecker()
    //  checkForm()
    //  console.log( passengerOnboardingList )
    //  console.log( passengerOffBoardingPlace )
    //  console.log( passengerOnboardingListReturn )
    console.log(loginD);
  };

  const checkForm = () => {
    if (
      fullNameList.length == numberOfPassengers &&
      phoneNumberList.length >= 1 &&
      // ageList.length == numberOfPassengers &&
      // passengersgenderList.length == numberOfPassengers &&
      // passengerOnboardingList.item != undefined &&
      // passengerOffBoardingPlace.item != undefined &&
      firstNameList.length == numberOfPassengers &&
      lastNameList.length == numberOfPassengers
    ) {
      return true;
    } else {
      return false;
    }
  };
  const checkFormTwo = () => {
    if (
      fullNameList.length == numberOfPassengers &&
      phoneNumberList.length == numberOfPassengers &&
      ageList.length == numberOfPassengers &&
      passengersgenderList.length == numberOfPassengers &&
      passengerOnboardingList.item != undefined &&
      passengerOffBoardingPlace.item != undefined &&
      firstNameList.length == numberOfPassengers &&
      lastNameList.length == numberOfPassengers &&
      passengerOnboardingListReturn.item != undefined &&
      passengerOffBoardingPlaceReturn.item != undefined
    ) {
      return true;
    } else {
      return false;
    }
  };
  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: "none",
  //     },
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: undefined,
  //     });
  // }, [navigation]);
  const nextBtn = () => {
    Keyboard.dismiss()
    console.log("One trip");

    setLoading(true);

    if (!checkForm()) {
      Alert.alert("Yene Guzo", "Please Fill The Required Information", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }

    if (!phoneNumberChecker()) {
      Alert.alert("Yene Guzo", " Please enter a valid phone number", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }
    // if (!ageChecker()) {
    //   Alert.alert("Yene Guzo", "Please enter a valid  Age", [
    //     { text: "OK", onPress: () => {} },
    //   ]);
    //   setLoading(false);
    //   return;
    // }
    // if (!adultChecker()) {
    //   Alert.alert("Yene Guzo", "No Adult ", [{ text: "OK", onPress: () => {} }]);
    //   setLoading(false);
    //   return;
    // }
    if (!firstNameChecker()) {
      Alert.alert("Yene Guzo", "Invalid Please enter a valid first name ", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }
    if (!lastNameChecker()) {
      Alert.alert("Yene Guzo", "Please enter a valid last name", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }
    setShowOption(false)
    console.log("logind", loginD)
    navigation.navigate("paymentOption", {
      allData,
      phoneNumberList,
      ageList,
      passengerOffBoardingPlace,

      passengerOnboardingList,
      passengersgenderList,
      numberOfPassengers,
      returnTicket,
      isEnabledTwoWay,
      fullNameList,
      loginD,
      index,
      indexR,
    });

    // }
    setLoading(false);
  };

  const returnNextBtn = () => {
    console.log("round trip");

    setLoading(true);
    if (!checkFormTwo()) {
      Alert.alert("Yene Guzo", "Please Fill The Required Information ", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }

    if (!phoneNumberChecker()) {
      Alert.alert("Yene Guzo", "Invalid Phone Number ", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }
    if (!ageChecker()) {
      Alert.alert("Yene Guzo", "Invalid Age", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }
    if (!adultChecker()) {
      Alert.alert("Yene Guzo", "No Adult ", [{ text: "OK", onPress: () => { } }]);
      setLoading(false);
      return;
    }
    if (!firstNameChecker()) {
      Alert.alert("Yene Guzo", "Please enter a valid first name", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }
    if (!lastNameChecker()) {
      Alert.alert("Yene Guzo", "Please enter a valid last name", [
        { text: "OK", onPress: () => { } },
      ]);
      setLoading(false);
      return;
    }

    navigation.navigate("paymentOption", {
      allDataTwo,

      returnTicket,
      isEnabledTwoWay,
      phoneNumberList,
      ageList,
      passengerOffBoardingPlace,
      passengerOffBoardingPlaceReturn,
      allDataSecondTrip,
      allData,
      passengerOnboardingList,
      passengerOnboardingListReturn,
      passengersgenderList,

      fullNameList,
      loginD,
      index,
      indexR,
    });
    setLoading(false);
  };
  // const getInfoFromPhone= async()=>{
  //   console.log("phone--------",phoneNumberForQuuick)
  //   setLoading(true);
  //   if(phoneNumberForQuuick == ''){
  //     setLoading(false);
  //     Alert.alert(
  //       "Yene Guzo",
  //       `Please enter your phone number `,
  //       [{ text: "OK", onPress: () => {} }]
  //     );
  //   }
  // else{  try {
  //     const response = await fetch(
  //       `https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/agent/v1/api/customer/get-customer-by-phone-number/${phoneNumberForQuuick}`,
  //       {
  //         headers: { "Content-Type": "application/json",
  //         Authorization: `Bearer ${loginD.access_token}`,}
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error('Network request failed');
  //     }
  //     const data = await response.json();
  //     if (data.errorCode ==  "404" || data.status === 0) {
  //       Alert.alert(
  //         "Yene Guzo",
  //         `Sorry, customer not found for phone no.- ${phoneNumberForQuuick} `,
  //         [{ text: "OK", onPress: () => {} }]
  //       );
  //     } else {
  //       const passInfo = data;
  //       const fn = passInfo.fullName.split(' ')[0]
  //       const ln = passInfo.fullName.split(' ')[1]
  //       const ag = 24
  //       const gen = data.gender

  //       setFirstName({fn})
  //       setLastName({ln})
  //       setAge({ag})
  //       setGender({gen})
  //       setPhoneNumber({phoneNumberForQuuick})

  //     setShowOption(true)
  //       // navigation.navigate("paymentOption", {
  //       //   allData,
  //       //   phoneNumberList,
  //       //   ageList,
  //       //   passengerOffBoardingPlace,

  //       //   passengerOnboardingList,
  //       //   passengersgenderList,
  //       //   seat,
  //       //   returnTicket,
  //       //   isEnabledTwoWay,
  //       //   fullNameList,
  //       //   loginD,
  //       //   index,
  //       //   indexR,

  //       // })
  //       console.log("tickets Data--------------", passInfo);
  //       console.log('this----------',firstName)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert(
  //       "Yene Guzo",
  //       "Sorry, an error occurred. Please try again later.",
  //       [{ text: "OK", onPress: () => {} }]
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // }}
  const genderList = [
    { key: "0", value: "Male" },
    { key: "1", value: "Female" },
  ];
  const drop = allData.boardingPoints;
  const boarding = allData.boardingPoints

  const dropReturn = allDataSecondTrip && allDataSecondTrip.dropOffPointsSecond;
  const boardingReturn =
    allDataSecondTrip && allDataSecondTrip.boardingPointsSecond;

  const onBoardingListReturn =
    boardingReturn != null
      ? boardingReturn.map((item) => {
        return { key: "1", value: allData.boardingPoints };
      })
      : [{ key: "1", value: "Menahria1" }];

  const offBoardingListReturn =
    dropReturn != null
      ? dropReturn.map((item) => {
        return { key: "1", value: item.terminalName };
      })
      : [{ key: "1", value: "Menahria2" }];

  const onBoardingList =
    boarding != null ?
      { key: "1", value: allData.boardingPoints }
      : [{ key: "1", value: "Menahria1" }];

  const offBoardingList =
    drop != null
      ? { key: "1", value: allData.boardingPoints }

      : [{ key: "1", value: "Menahria2" }];

  const personalInfo = () => {
    return arr.map((data, index) => {
      // if(index==0){
      //   setFirstName(userData && userData.userName.split(' ')[0])
      //   setLastName(userData && userData.userName.split(' ')[1])
      // }

      if (data.length == 0) {
        return (
          <View>
            <Text style={{ fontSize: 100, fontWeight: "bold" }}>
              NO SEAT SELECTED
            </Text>
          </View>
        );
      } else {
        return (
          <View style={index == 1 && arr.length == 3 ? { alignItems: "center", marginBottom: 20, flex: 1, marginTop: 10 } :
            index == 1 && arr.length == 2 ? { alignItems: "center", marginBottom: 100, flex: 1, marginTop: 10 } :

           arr.length == 4 && index == 3 ? { alignItems: "center", marginBottom: 100, flex: 1, marginTop: 10 } :
           arr.length == 3 && index == 2 ? { alignItems: "center", marginBottom: 100, flex: 1, marginTop: 10 } :
              index == 4 ? { alignItems: "center", marginBottom: 100, flex: 1, marginTop: 10 } :
                { alignItems: "center", marginBottom: 20, flex: 1, marginTop: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                width: screenWidth / 1.1,
                borderWidth: 0,
                borderTopWidth: 0,

              }}
            >
              <DropShadow
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                }}
              >
                <View
                  style={{

                    width: screenWidth / 1.1,
                    backgroundColor: "#FFF7F3",
                    flexDirection: "row",
                    height: 30,
                    elevation: 10,
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: "bold",
                      color: "#FF6A22",
                      textAlign: "left",
                      fontSize: 14,
                      textAlignVertical: "center",
                      marginLeft: 20,
                    }}
                  >
                    {/* Passenger {index + 1} */}
                    {index == 0 ? "Main Passenger" : `Passenger ${index + 1}`}
                  </Text>

                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.firstName}>
                    <TextInput
                      placeholder={index == 0 && !isForOthers ? userDataFirstName : "First name"}
                      // value={index==0 && userData && userData.userName.split(' ')[0]}
                      value={firstName}
                      editable={index == 0 && !isForOthers ? false : true}
                      style={{
                        fontSize: 15,
                        marginLeft: 15,
                        width: "50%",
                        borderEndWidth: 10,
                      }}
                      // onChangeText={(e) => setFullName({ ...fullName, [index]: e })}
                      onChangeText={(e) =>
                        setFirstName({ ...firstName, [index]: e })
                      }
                    ></TextInput>
                  </View>
                  <View style={styles.lastName}>
                    <TextInput
                      placeholder={index == 0 && !isForOthers ? userDataLastName : "Last name"}
                      editable={index == 0 && !isForOthers ? false : true}
                      value={lastName}
                      // value={index==0 && userData && userData.userName.split(' ')[1]}
                      style={{ fontSize: 15, marginLeft: 15 }}
                      onChangeText={(e) =>
                        setLastName({ ...lastName, [index]: e })
                      }

                    ></TextInput>
                  </View>
                </View>
                <View style={styles.phoneNumber}>
                  <Pressable
                    onPress={() => {
                      settextinputPhone(true);
                    }}
                  >
                    <TextInput
                      placeholder={index == 0 && !isForOthers ? userDataPhoneNumber : "Phone number"}
                      // editable={textInputPhone}
                      editable={index == 0 && !isForOthers ? false : textInputPhone}
                      value={phoneNumber}
                      style={{ fontSize: 15, marginLeft: 15 }}
                      keyboardType="numeric"
                      onChangeText={(e) => {
                        setPhoneNumber({ ...phoneNumber, [index]: e });
                        e.length > 12 && settextinputPhone(false);
                      }}
                    ></TextInput>
                  </Pressable>
                </View>

              </DropShadow>
            </View>
          </View>
        );
      }
    });
  };
  const getInfoPhoneNumber = () => {

    if (arr.length == 1) {
      return (
        <View style={{ flex: 1 }}>
          <Input
            value={phoneNumberForQuuick}
            placeholder="Phone Number"

            keyboardType="numeric"
            onChangeText={(nextValue) => setPhoneNumberForQuick(nextValue)}
            style={{
              width: screenWidth / 1.3,
              marginTop: 20,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "#FFF7F3",
              borderColor: "#FFF7F3",
              elevation: 5,
              alignSelf: 'center'
            }}
          />
          <TouchableOpacity
            onPress={() => { getInfoFromPhone() }}
            style={{
              backgroundColor: "#FF6A22", height: 50, width: 100, alignSelf: 'center',
              marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: "#FF6A22", marginBottom: 10
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, alignSelf: 'center', flex: 1, textAlignVertical: "center" }}>Next</Text></TouchableOpacity>

          {showOption && (<View>
            <SelectList
              setSelected={(key) => {
                const item = onBoardingList.find(
                  (val) => val.key === key
                );

                setOnBoarding({ ...onboarding, item });
                console.log(item);
              }}
              data={onBoardingList}
              save="key"
              placeholder="Onboarding place"
              borderRadius="40%"
              search={false}
              boxStyles={{
                borderRadius: 0,
                borderBottomWidth: 0,
                borderEndWidth: 0,
                borderTopWidth: 0,
                borderStartWidth: 0,
                backgroundColor: "#FFF7F3",
                elevation: 10,
                marginBottom: 10,
                width: screenWidth / 1.2,
                alignSelf: "center"
              }}
              dropdownStyles={{
                backgroundColor: "#FFF7F3",
                width: screenWidth / 1.2,
                alignSelf: "center",
                marginBottom: 5
              }}
              dropdownTextStyles={{ color: "grey" }}
            />
            <SelectList
              setSelected={(key) => {
                const item = offBoardingList.find(
                  (val) => val.key === key
                );
                setOffBoarding({ ...offboarding, item });
                console.log(item);
              }}
              data={offBoardingList}
              save="key"
              placeholder="Offboarding place"
              search={false}
              style={styles.offBoardingStyle}
              boxStyles={{
                borderRadius: 0,
                borderBottomWidth: 0.5,
                borderEndWidth: 0,
                borderStartWidth: 0,
                backgroundColor: "#FFF7F3",
                borderTopWidth: 0,
                elevation: 10,
                marginBottom: 10,
                width: screenWidth / 1.2,
                alignSelf: "center"
              }}
              dropdownStyles={{
                backgroundColor: "#FFF7F3",
                width: screenWidth / 1.2,
                alignSelf: "center",
              }}
              dropdownTextStyles={{ color: "grey" }}
            />


          </View>)}
        </View>
      )
    }
    else {
      Alert.alert("Yene Guzo", "This Feature Only Works For a Single Passenger", [
        { text: "OK", onPress: () => { } },
      ]);
    }
  }
  // const renderScene = SceneMap({
  //   first: personalInfo,
  //   second: getInfoPhoneNumber,

  // });
  // const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   { key: 'first', title: 'New' },
  //   { key: 'second', title: 'Returning' },

  // ]);

  // const renderTabBar = (props) => (
  //   <TabBar
  //     {...props}
  //     indicatorStyle={{ backgroundColor: "#FF6A22" }}
  //     style={{ backgroundColor:"#FFF7F3" ,marginBottom:10}}
  //     labelStyle={{ color: "#FF6A22" }}
  //   />

  // );

  return (
    <ScrollView
    keyboardShouldPersistTaps='handled'
      style={{ backgroundColor: "#FFF7F3" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >

      {/* <View style={{flex:1,flexDirection:'row',alignSelf:'center',maxHeight:30,marginVertical:10}}>
 <Pressable style={
  showTabOne ?
  {backgroundColor:"#FFF7F3",height:50,width:screenWidth/2
,borderColor:"#FF6A22",borderBottomWidth:4
}
:
{backgroundColor:"#FFF7F3",height:50,width:screenWidth/2

}
} onPress={()=>{setShowTabOne(true);setShowTabTwo(false);setShowOption(false)}}>
<Text style={{flex:1,textAlignVertical:"center",alignSelf:"center",color:"#FF6A22"}}>New</Text>
 </Pressable>


 <Pressable style={showTabTwo ?{backgroundColor:"#FFF7F3",height:50,width:screenWidth/2
,borderColor:"#FF6A22",borderBottomWidth:4}:
{backgroundColor:"#FFF7F3",height:50,width:screenWidth/2
,borderColor:"#FF6A22"}
} onPress={()=>{
  if(arr.length==1){ setShowTabOne(false);setShowTabTwo(true)}
  else{
    Alert.alert("Yene Guzo", "This Feature Only Works For a Single Passenger", [
      { text: "OK", onPress: () => {} },
    ]);
  }
  
 }}>
  <Text style={{flex:1,textAlignVertical:"center",alignSelf:"center",color:"#FF6A22"}} >Returning</Text>
  </Pressable>

</View>  */}
     
      <View style={{
        flex: 1,
        maxHeight: 30,
        alignItems: "flex-start",
        flexDirection: "row",
        left: 8,
        marginTop: 5,
        marginLeft: 10,
      }}>
        {/* toggle One */}

        <Switch
          trackColor={{ false: "#EBEBEE", true: "#FF6A22" }}
          thumbColor={isForOthers ? "#FF6A22" : "#FF6A22"}
          onValueChange={() => setIsForOthers(!isForOthers)}
          value={isForOthers}
        />

        <Text style={{ color: "black", marginTop: 2, right: 0 }}>
          For others
              </Text>
      </View>
      <View style={{ marginBottom: 5 }}>{personalInfo()}</View>


      {loading && (
        <View>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}


      <View style={{marginBottom: 10,
          position: "absolute",
          bottom: 0,alignSelf:"center"}}> 
          <Text
        style={{
          color: "#FF6A22",
          fontSize: 14,
          marginLeft: 10,
          marginTop: 20,
          marginBottom:10

        }}
      >
        The ticket details will be sent to the main passenger mobile number
      </Text>
      <Pressable
        onPress={isEnabledTwoWay && returnTicket ? returnNextBtn : nextBtn}
        style={{
          backgroundColor: "#FF6A22",
          width: screenWidth / 1.1,
          height: 55,
          borderRadius: 15,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Proceed to Checkout
        </Text>
      </Pressable>
      </View>
      {/* <Pressable onPress={()=>{console.log("dkjnd--",  numberOfPassengers)}}
       style={{width:200,height:200,backgroundColor:'red'}}></Pressable> */}

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  offBoardingStyle: {
    borderWidth: 0,
  },
  firstName: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#FFF7F3",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0,
    borderBottomColor: "grey",
    elevation: 10,
    width: "50%",
    marginVertical: 10,
  },
  lastName: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#FFF7F3",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0,
    borderBottomColor: "grey",
    elevation: 10,
    width: "50%",
    marginVertical: 10,
  },
  phoneNumber: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#FFF7F3",
    borderWidth: 0,
    borderBottomWidth: 0,
    borderBottomColor: "grey",
    elevation: 10,
    marginBottom: 10,
  },
  age: {
    padding: 5,
    paddingVertical: 10,
    borderWidth: 0,
    backgroundColor: "#FFF7F3",
    fontSize: 15,
    elevation: 10,
    marginBottom: 10,
  },
  genderStyle: {
    borderEndColor: "tomato",
  },
});
