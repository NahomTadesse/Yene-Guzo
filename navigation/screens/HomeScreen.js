import React, { useCallback, useEffect, useState, useContext } from "react";
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
  Image,
  Button,
  TouchableOpacity,
  Platform,
  Pressable,
  RefreshControl,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,

} from "react-native";

import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons/faLocationCrosshairs";

import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Calendar } from "react-native-ethiopian-calendar";

import DropShadow from "react-native-drop-shadow";

import moment from "moment";
import { Buffer } from 'buffer'

import { Autocomplete, AutocompleteItem, Icon } from "@ui-kitten/components";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { DataContext } from '../DataContext';
const filter = (item, query) =>
  item.value.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props) => <Icon {...props} name="star" />;
export default function HomeScreen({ navigation }) {
  const { condata, addData } = useContext(DataContext);
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [BusNameListDrop, setBusNameListDrop] = useState([]);
  const [fromNameValue, setFromNameValue] = useState("");
  const [toNameValue, setToNameValue] = useState("");
  const [value, setValue] = useState(null);
  const [valuefrom, setValuefrom] = useState('ADDIS ABABA');

  const [valueBus, setValueBus] = useState(null);
  const [valueTo, setValueTo] = useState(null);
  const [mode, setMode] = React.useState("EC");

  const [locale, setLocale] = React.useState("AMH");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedReturnDate, setSelectedReturnDate] = React.useState("");
  const [modeReturn, setModeReturn] = React.useState("EC");
  const [localeReturn, setLocaleReturn] = React.useState("AMH");
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [Theme, seTTheme] = useState("black");
  const [fetchNow, setFetchNow] = useState(false)
  const [showPopuularRoute, setShowPopularRoute] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [isRefund, setIsRefund] = useState(false);
  const route = useRoute();
  // const loginD = route.params.loginD;
  const activeDate = moment().add(1, "day").format("YYYY-MM-D");
  const isFocused = useIsFocused();

  useEffect(() => {
    // setValuefrom("");
    // setValueTo("");
    // setSelectedDate("");
    // setSelectedReturnDate("");
    // setBusName("");
    // setBusUuid("");
    // setInputFrom("");
    // setInputTo("");
    // setValue("");
    // setBusName("");
    // setBusUuid("");
    // setValueBus("");
    // setShowPopularRoute(false);
    // setInputFrom("");
    // setInputTo("");
    // setIsActiveSearch(false)
  }, [isFocused]);

  useEffect(() => {
    authenticate()
  }, []);
  useEffect(() => {
    fetchLocation()

  }, [fetchNow == true]);
  // useEffect(() => {

  // }, [fetchNow == true]);

  useEffect(() => {
    isActiveSearch && searchBtn();
    console.log(
      "heyyyy",
      fromText,
      "dsvdfv",
      toText,
      "accc",
      dateDeparture,
      "active",
      isActiveSearch
    );
    setIsActiveSearch(false);
  }, [isActiveSearch]);

  useEffect(() => {
    getData()
  }, []);

  const searchResult = "Search Result";
  const KeyboardAwareScrollView = Platform.select({
    ios: KeyboardAvoidingView,
    android: ScrollView,
  });
  //////
  const [InputFromName, setInputFromName] = useState("From");
  const [InputToName, setInputToName] = useState("To");
  const [userData, setUserData] = useState()

  /////
  const [busName, setBusName] = useState(value);
  const [dataLocation, setDataLocation] = useState([]);

  const [departureDateText, setDepartureDate] = useState();
  const [returnDateText, setReturnDate] = useState();

  const [toText, setInputTo] = useState("");
  const [fromText, setInputFrom] = useState("");
  const [isEnabledOneWay, setEnabledOneWay] = useState(true);
  const [isEnabledTwoWay, setEnabledTwoWay] = useState(false);

  const [show, setShow] = useState(false);
  const [showReturn, setShowReturn] = useState(false);

  const [busUuid, setBusUuid] = useState();
  const [popularRoutes, setPopularRoutes] = useState();
  // const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(dataLocation);
  const clientId = 'appuser';
  const clientSecret = 'appuser@123';

  
  const encodedCredentials = Buffer.from(clientId + ':' + clientSecret).toString('base64');
  const authorizationHeader = `Basic ${encodedCredentials}`;

  const authenticate = async () => {
    try {
      const response = await axios.get("http://159.65.88.161:8085/CrossRegional/api/v1/authentication", {
        headers: {
          Authorization: authorizationHeader
        }
      });

      console.log('response--------', response.data);
      addData(response.data);
      if (response.data.token) {
        setFetchNow(true)
      }

    } catch (error) {
      console.log('error--------', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }

  };
  const getData = async () => {
    try {
      let user = await AsyncStorage.getItem('Data');
      let parsed = JSON.parse(user);
      setUserData(parsed)
      console.log('Data retrieved successfully!', parsed.userName);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
  const x = () => {
    setFetchNow(true);
  }
  const onSelect = (index) => {
    if (data[index].key != toText) {
      setValuefrom(data[index].value);
      setInputFrom(data[index].key);
      setShowPopularRoute(true);
    } else {
      setValuefrom("");
    }
  };
  const onChangeText = (query) => {
    setValuefrom(query);
    setData(dataLocation.filter((item) => filter(item, query)));
  };
  const clearInput = () => {
    setValuefrom("");
    setData(dataLocation);
  };
  const clearInputBus = () => {
    setValueBus("");
    setBusName("");
    setBusUuid("");
    // setData(dataLocation);
    // setData(BusNameListDrop);
    setBusNameListDrop(BusNameListDrop);
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setValuefrom("");
    setValueTo("");
    setSelectedDate("");
    setSelectedReturnDate("");
    setBusName("");
    setBusUuid("");
    setInputFrom("");
    setInputTo("");
    setValue("");
    setBusName("");
    setBusUuid("");
    setValueBus("");
    setInputFrom("");
    setInputTo("");
    authenticate();
    setNumberOfPassengers(1)
    setRefreshing(false)
    getData()

  }, [refreshing]);
  const renderGoingTo = (props) => (
    <TouchableWithoutFeedback>
      <Image
        source={require("../Img/map.png")}
        style={{
          width: 20,
          height: 20,
        }}
      />
    </TouchableWithoutFeedback>
  );
  const renderLeavingFrom = (props) => (
    <TouchableWithoutFeedback>
      <Image
        source={require("../Img/circle.png")}
        style={{
          width: 20,
          height: 25,
        }}
      />
    </TouchableWithoutFeedback>
  );
  const renderCloseIconBus = (props) => (
    <TouchableWithoutFeedback onPress={clearInputBus}>
      <Icon
        {...props}
        name={valueBus == "" ? "arrow-ios-downward-outline" : "close"}
      />
    </TouchableWithoutFeedback>
  );
  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon
        {...props}
        name={valuefrom == "" ? "arrow-ios-downward-outline" : "close"}
      />
    </TouchableWithoutFeedback>
  );
  const onSelectBus = (index) => {
    console.log("data-------------", data);
    // setValueTo(dataLocation[index].value);
    /////////////////
    setValueBus(BusNameListDrop[index].label);
    setBusName(BusNameListDrop[index].label);
    setBusUuid(BusNameListDrop[index].value);
  };
  const onSelectTo = (index) => {
    console.log("data-------------", data);
    // setValueTo(dataLocation[index].value);
    if (data[index].key != fromText) {
      setValueTo(data[index].value);
      setInputTo(data[index].key);
      setValuefrom('ADDIS ABABA')
    } else {
      setValueTo("");
    }
  };
  const onChangeTextTo = (query) => {
    setValueTo(query);
    setData(dataLocation.filter((item) => filter(item, query)));
  };
  const clearInputTo = () => {
    setValueTo("");
    setData(dataLocation);
  };
  const renderCloseIconTo = (props) => (
    <TouchableWithoutFeedback onPress={clearInputTo}>
      <Icon
        {...props}
        name={valueTo == "" ? "arrow-ios-downward-outline" : "close"}
      />
    </TouchableWithoutFeedback>
  );
  const renderOption = (item, index) => {
    // console.log(item,index)
    return (
      <AutocompleteItem
        key={item.key}
        title={item.value}
      // accessoryLeft={StarIcon}
      />
    );
  };
  const renderOptionBus = (item, index) => {
    // console.log(item,index)
    return (
      <AutocompleteItem
        key={item.value}
        title={item.label}

      // accessoryLeft={StarIcon}
      />
    );
  };
  const showMode = (currenttMode) => {
    setShow(true);
  };

  const showModeFalse = (event, selectedDate) => {
    setShow(false);
  };
  const showModeFalseReturn = (event, selectedReturnDate) => {
    setShowReturn(false);
  };
  const showModeReturn = (currenttMode) => {
    setShowReturn(true);
  };

  // const locationData = route.params.locationData
  const getPopularRoute = () => {

    fetch("http://159.65.88.161:8085/CrossRegional/api/v1/route", {
      headers: {
        token: condata.token,
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPopularRoutes(data);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking. ",
          [{ text: "OK", onPress: () => { } }]
        );
      });
  };
  const pRoute = () => {
    return (
      popularRoutes && popularRoutes.map((pr, index) => {
        if (index < 6) {
          return (
            <TouchableOpacity
              onPress={() => {

                // setInputTo(pr.destination.uuid);
                // dateDeparture == activeDate;
                // setIsActiveSearch(true);
              }}
              style={{ backgroundColor: "#3C6791", borderColor: "#3C6791" }}
            >
           
                <View
                  style={{
                    width: screenWidth/1.1,
                    height:40,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 10,
                    marginTop: 5,
                    marginLeft: 20,
                    backgroundColor: "#FFF7F3",
                    borderColor: "#FFF7F3",
                    marginRight: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                       marginBottom:10,
                       marginLeft:10
                      }}
                    >
                      
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          marginLeft: 10,
                          marginTop: 10,
                          color: "black"
                        }}
                      >
                        ADDIS ABABA
                    </Text>
                    <FontAwesomeIcon
                        icon={faLocationCrosshairs}
                        size={14}
                        style={{
                          color: "black",
                          alignSelf: "center",
                          top: 8,
                          justifyContent: "center",
                          marginLeft: 5
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft:60
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        size={14}
                        style={{
                          color: "black",
                          alignSelf: "center",
                          justifyContent: "center",
                          marginLeft: 5,
                          top: 2,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          marginLeft: 10,
                          marginTop: 10,
                          color: "black",
                          // marginBottom: 10

                        }}
                      >
                        {pr.destination}
                      </Text>
                    </View>
                  </View>
                </View>
           
            </TouchableOpacity>
          );
        }
      })
    );
  };
  const changeText = () => {
    // setInputFromName(InputToName)
    setValuefrom(valueTo);
    setInputFrom(toText);
    // setInputToName(InputFromName)
    setValueTo(valuefrom);
    setInputTo(fromText);
    console.log(InputToName);
    console.log(InputFromName);
  };

  ///////////
  const fetchLocation = async () => {
    axios
      .get("http://159.65.88.161:8085/CrossRegional/api/v1/route", {
        headers: {
          token: condata.token,
        }
      })
      .then((response) => {
        if(response.data == null || response.data == undefined){
    Alert.alert(
          "Yene Guzo",
          "Connection error, please refresh after awhile . ",
          [{ text: "OK", onPress: () => {} }]
        );
        }
        else{
        setPopularRoutes(response.data)
        console.log(response.data)
        let newArray = response.data
          .filter(item => item.source === "ADDIS ABABA" && item.destination)
          .map(item => ({ key: item.routeID, value: item.destination }));
        setDataLocation(newArray)}
      })
      .catch((e) => {
        console.log(e);
        // Alert.alert(
        //   "Yene Guzo",
        //   "Sorry, The booking session has expired. Please start a new booking. ",
        //   [{ text: "OK", onPress: () => {} }]
        // );
      });
  };


  /////////////////
  const [input, setInputText] = useState("");
  const handleOnChangeText = (text) => {
    setInputText(text);
    console.log(input);
  };

  const checkOneWayForm = () => {
    if (toText && selectedDate != "" && valueTo) {
      return true;
    }
    else if(selectedDate.gregorian.date == moment().format('D') && selectedDate.gregorian.month == moment().format('M')  ){
      Alert.alert("Yene Guzo", "You can't book today's schedle, Please choose another date", [
        { text: "OK", onPress: () => { } },
      ]);
    }
    else if (isActiveSearch) {
      return true;
    }
    else {
      Alert.alert("Yene Guzo", "Please Fill Out The Required Fields", [
        { text: "OK", onPress: () => { } },
      ]);
    }
  };

  const checkTwoWayForm = () => {
    if (fromText && toText && selectedDate && selectedReturnDate != "") {
      return true;
    } else {
      Alert.alert("Yene Guzo", `Please Fill Out The Required Fields`, [
        { text: "OK", onPress: () => { } },
      ]);
    }
  };

  async function searchBtn() {
    Keyboard.dismiss()
    if (fromText !== toText) {
      if (isEnabledTwoWay == false && checkOneWayForm() == true) {
        setLoading(true);

        await fetch(
          "http://159.65.88.161:8085/CrossRegional/api/v1/schedules",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: condata.token
            },
            body: JSON.stringify({
              routeID: toText,
              departureDate: dateDeparture,
              agentID: "string",
              returnDate: "string",
              roundTrip: false
            }),
          }
        )
          .then((response) => response.json())

          /////////////
          .then((res) => {
            console.log(res);
            if (res.apierror != undefined) {
              Alert.alert("Yene Guzo", res.apierror.message, [
                { text: "OK", onPress: () => { } },
              ]);
            } else {
              var availableSchedule = res;
              console.log(res)
              if (
                availableSchedule.scheduleList.length == 0

              ) {
                Alert.alert(
                  "Yene Guzo",
                  "Sorry, the date bus is fully booked. Please choose another date",
                  [{ text: "OK", onPress: () => { } }]
                );
              } else {
                navigation.navigate("search", {
                  availableSchedule,
                  isEnabledTwoWay,
                  dateDeparture,
                  fromText,
                  toText,
                  busUuid,
                  numberOfPassengers,

                  valuefrom,
                  valueTo
                });
              }
            }
          })

          .catch((error) => {
            console.error(error);

            Alert.alert(
              "Yene Guzo",
              "Sorry, The booking session has expired. Please start a new booking. ",
              [{ text: "OK", onPress: () => { } }]
            );
            return;
          })
          .finally(() => {setLoading(false) ; Keyboard.dismiss()});
        console.log("fromid:" + fromText);
        console.log("toid:" + toText);
        console.log("date:" + dateDeparture);
      } else if (isEnabledTwoWay == true && checkTwoWayForm()) {
        setLoading(true);
        await fetch(
          "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-round-trip-schedule",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              departureLocationUUId: fromText,
              destinationLocationUUId: toText,
              departureDate: dateDeparture,
              returnDate: dateReturn,
              busCompanyUUId: busUuid,
            }),
          }
        )
          .then((response) => response.json())
          /////////////
          .then((res) => {
            if (res.apierror != undefined) {
              Alert.alert("Yene Guzo", res.apierror.message, [
                { text: "OK", onPress: () => { } },
              ]);
            } else {
              var availableSchedule = res;

              if (
                res.roundTripSchedule.firstTrip.length == 0 &&
                res.roundTripSchedule.secondTrip.length == 0
              ) {
                Alert.alert(
                  "Yene Guzo",
                  "Sorry, the date bus is fully booked. Please choose another date.",
                  [{ text: "OK", onPress: () => { } }]
                );
              } else {
                navigation.navigate("search", {
                  availableSchedule,
                  isEnabledTwoWay,
                  dateDeparture,
                  dateReturn,
                  fromText,
                  toText,
                  busUuid,
                });
              }
            }
          })

          .catch((error) => {
            console.error(error);
            Alert.alert(
              "Yene Guzo",
              "Sorry, The booking session has expired. Please start a new booking. ",
              [{ text: "OK", onPress: () => { } }]
            );
          })
          .finally(() => setLoading(false));

        console.log("fromid:" + fromText);
        console.log("toid:" + toText);
      }
    } else if (valuefrom == valueTo) {
      Alert.alert("Yene Guzo", "Please, Fill in the required information ", [
        { text: "OK", onPress: () => { } },
      ]);
    } else {
      Alert.alert("Yene Guzo", "Fill in the required information", [
        { text: "OK", onPress: () => { } },
      ]);
    }
  }

  const [selectedtwo, setSelectedtwo] = React.useState("");
  const [datatwo, setDatatwo] = React.useState([]);

  ////////////////
  const list = () => {
    locat.map((l) => console.log(l.name));
  };

    const DepMonth = selectedDate && selectedDate ?.gregorian.month.toString();
    const DepDate = selectedDate && selectedDate ?.gregorian.date.toString();
    const dateDeparture = isActiveSearch
    ? activeDate
    :
    selectedDate &&
    `${selectedDate ?.gregorian.year}-${DepMonth.length < 2 ? "0" : ""}${
    selectedDate ?.gregorian.month
    }-${DepDate.length < 2 ? "0" : ""}${selectedDate.gregorian.date}`;
    const dateDepartureFormat =
    selectedDate &&
    `${DepDate.length < 2 ? "0" : ""}${selectedDate.gregorian.date}-${
    DepMonth.length < 2 ? "0" : ""
    }${selectedDate ?.gregorian.month}-${selectedDate ?.gregorian.year}`;
    
    const EcDateDepartureFormat =
    selectedDate &&
    `${DepDate.toString().length < 2 ? "" : ""}${selectedDate.ethiopian.date}-${
    DepMonth.toString().length < 2 ? "" : ""
    }${selectedDate ?.ethiopian.month}-${selectedDate ?.ethiopian.year}`;

    const returnMonth =
    selectedReturnDate && selectedReturnDate ?.gregorian.month.toString();
    const returnDate =
    selectedReturnDate && selectedReturnDate ?.gregorian.date.toString();
    const dateReturn =
    selectedReturnDate &&
    `${selectedReturnDate ?.gregorian.year}-${
    returnMonth.length < 2 ? "0" : ""
    }${selectedReturnDate ?.gregorian.month}-${
    returnDate.length < 2 ? "0" : ""
    }${selectedReturnDate.gregorian.date}`;

    const dateReturnFormat =
    selectedReturnDate &&
    `${returnDate.length < 2 ? "0" : ""}${selectedReturnDate.gregorian.date}-${
    returnMonth.length < 2 ? "0" : ""
    }${selectedReturnDate ?.gregorian.month}-${
    selectedReturnDate ?.gregorian.year
    }`;

  const checkDate = (date) => {
    const dDate = `${date.gregorian.year}-${
      date.gregorian.month.toString().length < 2 ? "0" : ""
      }${date.gregorian.month}-${
      date.gregorian.date.toString().length < 2 ? "0" : ""
      }${date.gregorian.date}`;
    // const selectedDate = moment(new Date( `${date.gregorian.year}-0${date.gregorian.month}-${date.gregorian.date}`) )
    const selectedDate = moment(new Date(dDate));

    const today = moment();

    const isInBetween = selectedDate.isBetween(
      moment().subtract(1, "day"),
      moment().add(6, "day")
    );
    console.log("moment date: ", isInBetween);
    console.log();
    if (isInBetween) {
      return true;
    } else {
      return false;
    }
  };
  const checkDateRetun = (date) => {
    const dDate = `${date.gregorian.year}-${
      date.gregorian.month.toString().length < 2 ? "0" : ""
      }${date.gregorian.month}-${
      date.gregorian.date.toString().length < 2 ? "0" : ""
      }${date.gregorian.date}`;
    // const selectedDate = moment(new Date( `${date.gregorian.year}-0${date.gregorian.month}-${date.gregorian.date}`) )
    const selectedDate = moment(new Date(dDate));

    const today = moment();

    const isInBetween = selectedDate.isBetween(
      moment().subtract(1, "day"),
      moment().add(6, "day")
    );
    console.log("moment date: ", isInBetween);
    console.log();
    if (isInBetween && dDate != dateDeparture && dDate > dateDeparture) {
      return true;
    } else {
      return false;
    }
  };
  const Sidebar = () => {
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowSideBar(false);
          }}
          onBackdropPress={() => {
            setShowSideBar(false);
          }}
        // onRequestClose={setShowSideBar(false)}
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
                      marginBottom: 5
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

                      alignSelf: "center"
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
                    {/* Abay Bus Sales Agent */}
                    {condata.terminalName}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, marginTop: 50 }}>
                <TouchableOpacity
                  onPress={() => {
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
                    setIsRefund(true);
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
  return (
    <ScrollView
    keyboardShouldPersistTaps='handled'
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
     
        />
      }
      style={{
        backgroundColor: "#3c6791",

        height: Dimensions.get("screen").height,
      }}
    // stickyHeaderIndices={[0]}
    >
      <ImageBackground>
        {showSideBar &&
          Sidebar()}
        <View style={{ backgroundColor: "#FFF7F3", marginBottom: 30, height: 70 }}>
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
                  width: screenWidth / 1.3,
                  // backgroundColor:'red',
                  marginLeft: 10,
                  top: 10,
                }}
              >
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                    style={{
                      flex: 1,
                      marginTop: 15,
                      color: "#FF6A22",
                      textAlign: "right",
                      alignSelf: 'flex-end',
                      marginRight: 10
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
                    alignItems: 'flex-end'
                  }}
                />
              </View>
            </Pressable>
          </View>
        </View>
       
          <View
            style={{
              width: screenWidth / 1.1,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 40,
              backgroundColor: "white",
              marginBottom: 20,
              elevation: 10,
              alignSelf: "center",
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
            </View>           
              <Autocomplete
                placeholder="ADDIS ABABA"
                // placeholder="Leaving from"
                placeholderTextColor={"grey"}
                value={valuefrom}
                disabled={true}
                style={{
                  backgroundColor: "white",
                  width: screenWidth / 1.3,
                  borderWidth: 0,
                  margin: 10,
                  elevation: 10,
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignSelf: 'center'
                }}
                size="large"
                accessoryRight={renderCloseIcon}
                accessoryLeft={renderLeavingFrom}
                onChangeText={onChangeText}
                onSelect={onSelect}
              >
                {data.map(renderOption)}
              </Autocomplete>
            
            <Pressable></Pressable>

              <Autocomplete
                placeholder="Going To"
                placeholderTextColor={"grey"}
                value={valueTo}
                onSelect={onSelectTo}
                accessoryRight={renderCloseIconTo}
                accessoryLeft={renderGoingTo}
                style={{
                  backgroundColor: "white",
                  borderColor: 'white',
                  width: screenWidth / 1.3,
                  borderWidth: 1,
                  borderRadius: 10,
                  elevation: 10,
                  margin: 10,
                  height: 50,
                  alignSelf: 'center'
                }}
                size="large"
                placement="top"
                onChangeText={onChangeTextTo}
              >
                {data.map(renderOption)}
              </Autocomplete>

            <Pressable onPress={() => showMode("date")}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: screenWidth / 1.3,
                    borderWidth: 1,
                    borderColor: "#FFF7F3",
                    elevation: 10,
                    borderRadius: 10,
                    marginBottom: 20,
                    marginTop: 10,
                    alignSelf: 'center'
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size={20}
                    style={{
                      color: "grey",
                      padding: 10,
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                  />
                  <TextInput
                    // placeholder='Departure Date'
                    placeholder={
                      selectedDate == "" ? "Leaving On" : EcDateDepartureFormat
                    }
                    underlineColorAndroid="transparent"
                    placeholderTextColor="grey"
                    style={styles.textInput}
                    editable={false}
                    keyboardType="numeric"
                  />
                </View>
             
            </Pressable>

            {show && (
              <View>
                <TouchableOpacity
                  onPressOut={() => {
                    return setShow(!show);
                  }}
                >
                  <Modal
                    transparent={true}
                    onRequestClose={() => {
                      setShow(false);
                    }}
                    close
                  >
                    <Pressable
                      onPress={(event) => event.target == event.currentTarget && setShow(false)}
                      style={{ flex: 1, justifyContent: "center" }}>
                      <View
                        style={{
                          // width: screenWidth / 1.1,
                          alignSelf: "center",
                          position: "relative",
                          elevation: 20,
                          shadowColor: "black",
                          borderWidth: 2,
                          borderRadius: 10,
                          borderColor: "white",
                        }}
                      >
                       
                          <Calendar
                            hideHeaderButtons={true}
                            mode={mode}
                            onDatePress={(date) => {
                              checkDate(date);
                              setSelectedDate(date)
                              // setSelectedDate(
                              //   checkDate(date) ? date
                              //     : Alert.alert(
                              //         "Yene Guzo",
                              //         "The selected date should be within 5 days",
                              //         [
                              //           {
                              //             text: "OK",
                              //             onPress: () => {
                              //               setSelectedDate("");
                              //             },
                              //           },
                              //         ]
                              //       )
                              // );
                              showModeFalse();
                              setDepartureDate(
                                selectedDate &&
                                `${selectedDate.ethiopian.date}/${selectedDate ?.ethiopian.month}/${selectedDate ?.ethiopian.year}`
                              );
                              console.log(date);
                            }}
                            onModeChange={(selectedMode) => setMode(selectedMode)}
                            onLanguageChange={(lang) => setLocale(lang)}
                            locale={locale}
                            theme={{
                              switchButtonColor: "#f27f22",
                              arrowColor: "#3c6791",
                              selectedDayBackgroundColor: "#3c6791",
                              todayTextColor: "#FF6A22",
                            }}
                          />
                       
                      </View>
                    </Pressable>
                  </Modal>
                </TouchableOpacity>
              </View>
            )}

            {isEnabledTwoWay && (
              <Pressable
                onPress={() => (isEnabledTwoWay ? showModeReturn("date") : "")}
              >
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
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FFF7F3",
                      width: screenWidth / 1.3,
                      marginLeft: 18,
                      borderWidth: 1,
                      borderColor: "#FFF7F3",
                      elevation: 10,
                      borderRadius: 10,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      size={20}
                      style={{
                        color: "grey",
                        padding: 10,
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                    />
                    <TextInput
                      placeholder={
                        selectedReturnDate == "" ? "Return On" : dateReturnFormat
                      }
                      placeholderTextColor="grey"
                      // placeholderTextColor={'#000'}
                      style={styles.textInput}
                      editable={false}
                    // onChangeText={text => setReturnDate(text)}
                    />
                  </View>
                </DropShadow>
              </Pressable>
            )}
            <Text style={{ marginTop: 10, alignSelf: "center", fontSize: 14, color: "#FF6A22" }}>
              Number Of Passengers
          </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  numberOfPassengers >= 2 &&
                    setNumberOfPassengers(numberOfPassengers - 1);
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    backgroundColor: "#FF6A22",

                    shadowColor: "black",
                    borderColor: "#FF6A22",
                    marginRight: 30,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    size={30}
                    style={{
                      color: "white",
                      alignSelf: "center",
                      top: 5,
                      justifyContent: "center",
                    }}
                  />
                </View>
              </Pressable>
              {/* /////////////////// */}
              <View>
                <Text style={{ fontSize: 18, top: 10, color: "#FF6A22", fontWeight: "600" }}>
                  {numberOfPassengers.toString().length == 1
                    ? `0${numberOfPassengers}`
                    : numberOfPassengers}
                </Text>
              </View>
              {/* ////////////// */}
              <Pressable
                onPress={() => {
                  setNumberOfPassengers(numberOfPassengers < 5 ? numberOfPassengers + 1 : numberOfPassengers);
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    backgroundColor: "#FF6A22",

                    shadowColor: "black",
                    borderColor: "#FF6A22",
                    marginLeft: 30,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    size={30}
                    style={{
                      color: "white",
                      alignSelf: "center",
                      top: 5,
                      justifyContent: "center",
                    }}
                  />
                </View>
              </Pressable>
            </View>


            {loading && (
              <View>
                <ActivityIndicator size={"large"} color="#3C6791" />
              </View>
            )}
            {showReturn && (
              <TouchableOpacity
                activeOpacity={0}
                onPressOut={() => {
                  setShowReturn(false);
                }}
              >
                <Modal
                  transparent={true}
                  onRequestClose={() => {
                    setShowReturn(false);
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <View
                      style={{
                        width: screenWidth / 1.1,
                        alignSelf: "center",
                        position: "relative",
                        elevation: 20,
                        shadowColor: "black",
                        borderWidth: 5,
                        borderRadius: 10,
                        borderColor: "#FFF7F3",
                      }}
                    >
                      <DropShadow
                        style={{
                          shadowColor: "#171717",
                          shadowOffset: { width: 10, height: 20 },
                          shadowOpacity: 0.4,
                          shadowRadius: 2,
                        }}
                      >
                        <Calendar
                          mode={mode}
                          hideHeaderButtons={true}
                          onDatePress={(date) => {
                            checkDateRetun(date);
                            setSelectedReturnDate(
                              checkDateRetun(date)
                                ? date
                                : Alert.alert(
                                  "Yene Guzo",
                                  "The selected date should be within 5 days ",
                                  [
                                    {
                                      text: "OK",
                                      onPress: () => {
                                        setSelectedReturnDate("");
                                      },
                                    },
                                  ]
                                )
                            );
                            showModeFalseReturn();
                            setReturnDate(
                              selectedReturnDate &&
                              `${selectedReturnDate ?.ethiopian.year}-${selectedReturnDate ?.ethiopian.month}-${selectedReturnDate.ethiopian.date}`
                            );
                          }}
                          onModeChange={(selectedMode) =>
                            setModeReturn(selectedMode)
                          }
                          onLanguageChange={(lang) => setLocaleReturn(lang)}
                          locale={locale}
                          theme={{
                            switchButtonColor: "#f27f22",
                            arrowColor: "#3c6791",
                            selectedDayBackgroundColor: "#3c6791",
                            todayTextColor: "#FF6A22",
                          }}
                        />
                      </DropShadow>
                    </View>
                  </View>
                </Modal>
              </TouchableOpacity>
            )}

            <View
              style={{
                height:
                  Dimensions.get("screen").height -
                  Dimensions.get("screen").height +
                  100, marginBottom: 20
              }}
            >
              <Pressable
                onPress={()=>{
                  if(selectedDate.gregorian.date == moment().format('D') && selectedDate.gregorian.month == moment().format('M') ){
                  Alert.alert("Yene Guzo", "You can't book today's schedule, Please choose another date", [
                    { text: "OK", onPress: () => { } },
                  ]);
                }
                else { searchBtn()}
              
              }}
                style={{
                  backgroundColor: "#FF6A22",
                  width: screenWidth / 1.3,
                  height: 55,
                  borderRadius: 15,
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 0,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    flex: 1,
                    textAlignVertical: "center",
                  }}
                >
                  Search
              </Text>
              </Pressable>

              {/* <Pressable onPress={()=>{console.log('inpuutto------',moment().format("")) }} >
              <Text
                style={{
                  textAlign: "right",
                  marginTop: 40,
                  backgroundColor: "#f27f22",
                  padding: 4,
                  borderRadius: 5,
                  left: 10,
                }}
              >
                test
              </Text>
            </Pressable>  */}
            </View>
          </View>
      
        <Text style={{ color: "white", fontSize: 18, marginLeft: 30, marginBottom: 5 }}>
          Available Routes
      </Text>

        {
          <View style={{ flexDirection: "column" }}>
            <Text>
              {pRoute()}
            </Text>
          </View>

        }

      </ImageBackground>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  text: { flex: 1, alignItems: "", justifyContent: "center" },
  welcome: {},
  toggle: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    left: 8,
    marginTop: 5,
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "white",
    color: "#424242",

    borderColor: "#fff",
    borderRadius: 10,
  },
  textInputFromTo: {
    borderTopWidth: 3,
    borderLeftWidth: 3,
    padding: 5,

    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    fontSize: 10,
    borderRadius: 10,
    borderTopColor: "#3c6791",
    borderLeftColor: "#3c6791",
    shadowOffset: 10,
    width: screenWidth / 2,
  },
  twoWayIcon: {
    fontSize: 40,
    color: "red",
  },

  dropdown: {
    margin: 10,
    height: 50,
    left: 8,
    width: screenWidth / 1.1,
    backgroundColor: "white",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#3c6791",
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  // itemTextStyle:{
  //   color:'grey'
  // }
});
