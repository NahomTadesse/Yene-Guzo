import React, { useEffect, useLayoutEffect, useState, useRef, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Switch,
  TextInput,
  Button,
  Pressable,
  ActivityIndicator,
  Alert,
  Platform,
  Modal,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropShadow from "react-native-drop-shadow";
import { useNavigation } from "@react-navigation/native";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPenToSquare,
  width,
} from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { useRoute } from "@react-navigation/native";
import { faPingPongPaddleBall } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from '../DataContext';

import moment from "moment";

export default function SearchResult({ navigation }) {
  const { condata, addData } = useContext(DataContext);
  const [currenttDate, setCurrentDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [availableSchedule, setSchedule] = useState();
  const [newData, setData] = useState();
  const [busNo, setBuusNo] = useState();

  const [loading, setLoading] = useState(false);
  const route = useRoute();
  // const availableSchedule = route.params.availableSchedule;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const depDate = route.params.dateDeparture;
  const valuefrom = route.params.valuefrom;
  const valueTo = route.params.valueTo;
  const fromText = route.params.fromText;
  const toText = route.params.toText;
  const busUuid = route.params.busUuid;
  const dateReturn = route.params.dateReturn;
  const loginD = route.params.loginD;
  const numberOfPassengers = route.params.numberOfPassengers;
  ////////////////

  const navigationn = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigationn.addListener("beforeRemove", (e) => {
      e.preventDefault();

      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigationn.dispatch(e.data.action);
      });
    });

    return unsubscribe;
  }, [animation, navigationn]);

  ///////////////

  useLayoutEffect(() => {
    setSchedule(route.params.availableSchedule);
  }, []);

  // console.log("----------------YeneGuzoAgent")

  // console.log(availableSchedule)
  const [datetext, setDateText] = useState(depDate);

  const [dates, setDates] = useState([{ selected: true, date: moment() }]);

  console.log(availableSchedule);
  useLayoutEffect(() => {
    const dateArray = [];

    for (let i = 0; i < 6; i++) {
      const date = moment(depDate).add(i, "days");
      dateArray.push({
        selected: date.isSame(moment(datetext), "day"),
        date,
      });
    }

    setDates(dateArray);
  }, [datetext]);
  // console.log("------------------------------------------");
  //    console.log('datearray : ', dates);

  //////////////////

  if (!availableSchedule) {
    return null;
  }

  ///////////////////

  const dateSearch = async (date) => {
    if (date !== datetext) {
      setLoading(true);

      const refechData = JSON.stringify({
        departureLocationUUId: fromText,
        destinationLocationUUId: toText,
        departureDate: date,

        busCompanyUUId: busUuid,
      });

      console.log("the date----------------", refechData);

      // return;

      await fetch(
        "http://159.65.88.161:8085/CrossRegional/api/v1/schedules",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: condata.token
          },
          body: refechData,
        }
      )
        .then((response) => response.json())

        /////////////
        .then((res) => {
          // console.log( 'response: ', res)

          // setSchedule(()=>{res})
          // setData(res)
          // setSchedule(newData)
          // console.log('response: available----',availableSchedule)

          if (res.apierror != undefined) {
            Alert.alert("Yene Guzo", res.apierror.message, [
              { text: "OK", onPress: () => { } },
            ]);
          } else {
            if (res.scheduleList.length == 0) {
              Alert.alert(
                "Yene Guzo",
                "Sorry, there's no schedule for the selected date. Please choose another date.",
                [{ text: "OK", onPress: () => { } }]
              );
            } else {
              setSchedule((prevstate) => res);
            }
            {
              res.scheduleList.length > 0
                ? setDateText(res.schedules[0].departureTime)
                : "";
            }

            // console.log("date----------",availableSchedule.schedules[0].departureDate)
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
        .finally(() => setLoading(false));
    }
  };

  const dateSearchTwoWay = async (date) => {
    if (date !== datetext) {
      setLoading(true);

      const refechData = JSON.stringify({
        departureLocationUUId: fromText,
        destinationLocationUUId: toText,
        departureDate: date,
        returnDate: dateReturn,
        busCompanyUUId: busUuid,
      });

      await fetch(
        "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-round-trip-schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: refechData,
        }
      )
        .then((response) => response.json())
        /////////////
        .then((res) => {
          if (res.apierror != undefined) {
            Alert.alert("Yene Guzo", res.apierror.message, [
              { text: "OK", onPress: () => { } },
            ]);
            return;
          } else {
            if (
              //availableSchedule.roundTripSchedule.firstTrip == null &&
              res.roundTripSchedule.firstTrip.length == 0 &&
              // availableSchedule.roundTripSchedule.secondTrip == null &&
              (res.roundTripSchedule.secondTrip == 0) &
              (availableSchedule.alternateRoundTripSchedule.firstTrip ==
                null) &&
              availableSchedule.alternateRoundTripSchedule.secondTrip == null
            ) {
              Alert.alert(
                "Yene Guzo",
                "Sorry, the selected date is fully booked. Please choose another date.",
                [{ text: "OK", onPress: () => { } }]
              );
            } else {
              setSchedule((prevstate) => res);
            }
            {
              res.roundTripSchedule.firstTrip.length > 0
                ? setDateText(res.roundTripSchedule.firstTrip[0].departureDate)
                : res.alternateRoundTripSchedule.firstTrip.length > 0 &&
                  res.alternateRoundTripSchedule.firstTrip != null
                  ? setDateText(
                    res.alternateRoundTripSchedule.firstTrip[0].departureDate
                  )
                  : "";
            }
          }
        })

        .catch((error) => {
          console.error("error-----------", error);

          Alert.alert(
            "Yene Guzo",
            "Sorry, The selected date is in the past. Please select a future date.",
            [{ text: "OK", onPress: () => { } }]
          );
          return;
        })
        .finally(() => setLoading(false));
    }
  };

  console.log("new--------------------------", availableSchedule);

  const topDatePicker = () => {
    return (
      <ScrollView horizontal={true}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
            width: "100%",
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          {dates.map(({ selected, date }, index) => {
            return (
              <View>
                <Pressable
                  onPress={() =>
                    isEnabledTwoWay
                      ? dateSearchTwoWay(date.format("YYYY-MM-DD"))
                      : dateSearch(date.format("YYYY-MM-DD"))
                  }
                >
                  <View
                    style={
                      selected
                        ? {
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          backgroundColor: "#FF6A22",
                          elevation: 10,
                          shadowColor: "black",
                          margin: 10,
                        }
                        : {
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          backgroundColor: "#FFF7F3",
                          elevation: 10,
                          shadowColor: "black",
                          margin: 10,
                        }
                    }
                  >
                    <Text
                      style={
                        selected
                          ? {
                            textAlign: "center",
                            flex: 1,
                            textAlignVertical: "center",
                            color: "white",
                          }
                          : {
                            textAlign: "center",
                            flex: 1,
                            textAlignVertical: "center",
                            color: "#FF6A22",
                          }
                      }
                    >
                      {date.format("DD")}
                    </Text>
                  </View>
                  <Text style={{ textAlign: "center", color: "#000000" }}>
                    {date.format("dddd").slice(0, 3)}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const onChangeBtn = (event, selectedDate) => {
    const currenttDate = selectedDate || date;
    setShow(Platform.OS === "android"), setDate(currenttDate);
    setShow(false);

    let tempDate = new Date(currenttDate);
    let month = (tempDate.getMonth().length = 1
      ? "0" + tempDate.getMonth()
      : tempDate.getMonth());
    let dateDay = (tempDate.getDate().length = 1
      ? "0" + tempDate.getDate()
      : tempDate.getDate());

    let cDate = tempDate.getFullYear() + "-" + month + "-" + dateDay;
    setDateText(cDate);
  };
  const showMode = (currenttMode) => {
    setShow(true);
    setMode(currenttMode);
  };
  const selectedSearch = (allData, index) => {
    var returnTicket;
    console.log("hbdh", loginD)
    navigation.navigate("Passenger Information", {
      allData,
      isEnabledTwoWay,
      returnTicket: false,
      index,
      numberOfPassengers,
      loginD,
      valuefrom,
      valueTo
    });
  };

  const test = () => {
    // var x =availableSchedule.twoWayScheduleResponse
    // var x =availableSchedule
    // console.log(x)
    // console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    // console.log(x.roundTripSchedule.firstTrip[0].dropOffPoints)
    // console.log(x.roundTripSchedule.firstTrip[0].boardingPoints)
    // console.log(isEnabledTwoWay)
    // console.log(returnTicket);
    console.log("date-------------------", availableSchedule);
  };
  const selectedTwoWaySearch = (allData, index) => {
    if (
      (availableSchedule.roundTripSchedule.secondTrip == null &&
        availableSchedule.alternateRoundTripSchedule.secondTrip.length == 0) ||
      null
    ) {
      Alert.alert("Yene Guzo", "No Return Ticket Available", [
        { text: "OK", onPress: () => { } },
      ]);
      console.log(availableSchedule);
    } else {
      navigation.navigate("returnSearchResult", {
        allData,
        isEnabledTwoWay,
        availableSchedule,
        returnTicket: true,
        depDate,
        dateReturn,
        fromText,
        toText,
        busUuid,
        dateReturn,
        loginD,
        index,
      });
    }
  };

  function cardViewOneWay() {
    var available = availableSchedule.scheduleList;

    return available.map((d, index) => {
      var depaLocat = valuefrom;
      var destinlocat = valueTo;

      var arrivalT = d.arrivalTime;
      var departTime = d.boardingTime;
      var price = d.price;
      // var reservedSeatList = d.reservedSeats;
      // var bookedSeatList = d.bookedSeats;
      // var busUuid = d.vehicleType.uuid;
      var travelDate = d.departureTime;
      var busName = d.busLevel;
      var scheduleUUId = d.scheduleID;
      var maxAvailableSeat = d.seatsAvailable;
      var boardingPoints = d.boardingPlace;
      var dropOffPoints = d.boardingPlace;
      var departureDate = d.departureTime;
      var routeID = d.routeID
      var allData = {
        depaLocat,
        maxAvailableSeat,
        destinlocat,
        arrivalT,
        departTime,
        price,

        travelDate,
        busName,
        scheduleUUId,
        dropOffPoints,
        boardingPoints,
        departureDate,
        routeID
      };
      console.log(depaLocat);
      console.log(destinlocat);
      console.log(arrivalT);
      console.log(departTime);
      console.log(travelDate);
      console.log(busName);
      console.log(scheduleUUId);

      return (
        <View>
          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 1, height: 5 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            <View style={styles.cards}>
              <Pressable onPress={() => selectedSearch(allData, index)}>
                <View
                  style={{
                    width: screenWidth / 1.12,
                    backgroundColor: "#FFF7F3",
                    height: 50,
                    flexDirection: "row",
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: "#FFF7F3"
                  }}
                >
                  <Text
                    style={{
                      color: "#FF6A22",
                      fontSize: 18,
                      textAlignVertical: "center",
                      textAlign: "left",
                      fontWeight: "bold",
                      marginLeft: 20,
                    }}
                  >
                    {/* {allData.busName} */}
                    {busName}
                    {/* {() => setBuusNo(`Bus ${index + 1}`)} */}
                  </Text>

                  <Text
                    style={{
                      marginTop: 15,
                      marginRight: 20,
                      flex: 1,
                      textAlign: "right",
                      color: "#FF6A22",
                    }}
                  >
                    {allData.maxAvailableSeat} Seats Left
                    {/* {moment(departureDate).format("dddd").slice(0, 3)}
                    {", "}
                    {moment(departureDate).format("MMM Do")} */}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#212121",
                      marginLeft: 15,
                      textAlign: "left",
                    }}
                  >
                    {valuefrom}
                  </Text>
                  {/* <Icon name = 'arrow-forward-outline' style={{textAlign : 'center' , flex : 1}}/> */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    <View
                      style={{
                        height: 0,
                        width: 100,
                        borderWidth: 0.5,
                        borderColor: "#212121",
                        marginTop: 2,

                        borderRadius: 1,
                      }}
                    ></View>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",

                      color: "#212121",
                      textAlign: "right",
                      marginRight: 15,
                    }}
                  >
                    {valueTo}
                  </Text>
                </View>
                <View style={styles.timeStyle}>
              
                  <View
                    style={{
                      flexDirection: "row",
                   
                      marginLeft: 18,
                    }}
                  >
                    {/* <Icon name="bus" style={styles.busIcon} /> */}
                    <Icon
                          name="calendar"
                          style={{ fontSize: 18, marginRight: 5,marginTop:2}}
                        />
                    <Text
                      style={{
                        textAlign: "left",
                        marginVertical: 2,
                        color: "black",
                        fontWeight: "normal",
                      }}
                    >
                   
                      <Text
                        style={{
                          marginTop: 15,
                          flex: 1,
                          textAlign: "right",
                          
                        }}
                      >
                     
                      </Text>
                      <Text style={{ color: "black", marginLeft: 10 }}>
                        {moment(departureDate).format("dddd").slice(0, 3)}
                        {", "}
                        {moment(departureDate).format("MMM Do")} {", "}{allData.departTime}
                      </Text>
                    </Text>
              
                  </View>
                  {/* <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "right",
                      color: "#212121",
                      marginRight: 20,
                    }}
                  >
                    {allData.arrivalT}
                  </Text> */}
                </View>
                <View style={styles.timeCashStyle}>
                <View style={{flex:1,flexDirection:'row',marginTop:5}}>
                <View>
                  <Text  style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "left",
                      color: "#212121",
                      marginLeft: 20,
                      marginTop:10
                    }}>Boarding Place</Text>
                <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "left",
                      color: "#212121",
                      marginLeft: 20,
                      marginTop:5,
                      fontWeight:'bold'
                    }}
                  >
                     {allData.boardingPoints}
                  </Text>
                  </View>
<View style={{marginLeft:105,maxWidth:120,}}>
                  {/* <Text  style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "left",
                      color: "#212121",
                      marginLeft: 10,
                      marginTop:10
                    }}>Boarding Time</Text>
                <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "left",
                      color: "#212121",
                      marginLeft: 10,
                      marginTop:5,
                      fontWeight:'bold'
                    }}
                  >
                   
                    {allData.departTime}
                  </Text> */}
                  </View>

                 </View>
                  {/* <View style={{width:screenWidth/1.3 , height:0.5,borderWidth:0.9,borderStyle:'dashed',alignSelf:'center',marginTop:15,borderColor:"#FF6A22"}}> */}
                  <View style={{width:screenWidth/1.3 ,height:2,alignSelf:'center',marginTop:15,backgroundColor:"#FF6A22"}}>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text
                      style={{
                        color: "#FF6A22",
                        flex: 1,
                        fontSize: 14,
                        textAlignVertical: "center",
                        textAlign: "left",
                        fontWeight: "bold",
                        marginLeft:20
                      
                      }}
                    >
                      <Text style={{color:'black'}}> Tariff : </Text>
                      {' '}{allData.price != null
                        ? `${allData.price} ETB`
                        : "No price added"}
                    </Text>
                    <Text
                      style={{
                        color: "#FF6A22",
                        flex: 1,
                        textAlign: "right",
                        marginRight: 20,
                        marginTop: 7,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                          <FontAwesomeIcon
                        icon={faAngleRight}
                        size={25}
                        style={{
                          color: "#FF6A22",
                         
                          top: 8,
                          justifyContent: "center",
                          marginLeft: 5
                        }}
                      />
                    </Text>
              
                  </View>
                </View>
              </Pressable>
            </View>
          </DropShadow>
        </View>
      );
    });
  }
  ////////////////////////////////////////////////////
  function cardViewTwoWay() {
    var availableTwoTrip = availableSchedule.roundTripSchedule.firstTrip;

    return availableTwoTrip.map((d, index) => {
      var depaLocat = valuefrom;
      var destinlocat = valueTo;
      var arrivalT = d.arrivalTime;
      var departTime = d.departureTime;
      var price = d.tariff.amount;
      var reservedSeatList = d.reservedSeats;
      var bookedSeatList = d.bookedSeats;
      var busUuid = d.vehicleType.uuid;
      var travelDate = d.departureDate;
      var busName = d.busCompany;
      var maxAvailableSeat = d.maxAvailableSeat;
      var firstScheduleUUId = d.uuid;
      var boardingPoints = d.boardingPlace;
      var dropOffPoints = d.boardingPlace;
      var maxAvailableSeat = d.maxAvailableSeat;
      const departureDate = d.departureDate;
      const dropOffPointsFirst = d.dropOffPoints;
      const boardingPointsFirst = d.boardingPoints;
      var allData = {
        depaLocat,
        destinlocat,
        arrivalT,
        departTime,
        price,
        reservedSeatList,
        bookedSeatList,
        busUuid,
        travelDate,
        busName,
        boardingPoints,
        dropOffPoints,
        maxAvailableSeat,
        maxAvailableSeat,
        firstScheduleUUId,
        boardingPointsFirst,
        dropOffPointsFirst,
        departureDate,
        valuefrom,
        valueTo
      };

      // console.log(depaLocat)
      // console.log(destinlocat)
      // console.log(arrivalT)
      // console.log(departTime)
      // console.log(travelDate)
      // console.log(busName)
      console.log(firstScheduleUUId);

      return (
        <View>
          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 10, height: 5 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            <View style={styles.cards}>
              <Pressable onPress={() => selectedTwoWaySearch(allData, index)}>
                <View
                  style={{
                    width: screenWidth / 1.12,
                    backgroundColor: "#EBEBEB",
                    height: 50,
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "#FF6A22",
                      fontSize: 18,
                      textAlignVertical: "center",
                      textAlign: "left",
                      fontWeight: "bold",
                      marginLeft: 20,
                    }}
                  >
                    {/* {busName} */}
                    {`Bus ${index + 1}`}
                  </Text>

                  <Text
                    style={{
                      marginTop: 15,
                      flex: 1,
                      marginRight: 5,
                      textAlign: "right",
                      color: "#006ED5",
                      marginRight: 20,
                    }}
                  >
                    {allData.maxAvailableSeat} Seats Left
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "left",

                      marginLeft: 10,
                      color: "#212121",
                      fontWeight: "bold",
                      marginLeft: 15,
                    }}
                  >
                    {depaLocat}
                  </Text>
                  {/* <Icon name = 'arrow-forward-outline' style={{textAlign : 'center' , flex : 1}}/> */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    <View></View>

                    <View
                      style={{
                        height: 0,
                        width: 100,
                        borderWidth: 0.5,
                        borderColor: "#212121",
                        marginTop: 2,

                        borderRadius: 1,
                      }}
                    ></View>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",

                      color: "#212121",
                      textAlign: "right",
                      marginRight: 15,
                    }}
                  >
                    {destinlocat}
                  </Text>
                </View>
                <View style={styles.timeStyle}>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "left",
                      color: "#212121",
                      left: 20,
                    }}
                  >
                    {departTime}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "right",
                      color: "#212121",
                      marginRight: 20,
                    }}
                  >
                    {arrivalT}
                  </Text>
                </View>
                <View style={styles.timeCashStyle}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    {/* <Icon name="bus" style={styles.busIcon} /> */}
                    <Text
                      style={{
                        textAlign: "left",
                        marginVertical: 2,
                        color: "black",
                        fontWeight: "normal",
                      }}
                    >
                      {/* 5 hrs 50 min */}
                      {/* {price != null ? `${price} ETB` : "No price added"} */}
                      <Icon
                        name="calendar"
                        style={{ fontSize: 18, marginRight: 10 }}
                      />
                      <Text
                        style={{
                          marginTop: 15,
                          marginRight: 20,
                          textAlign: "right",
                        }}
                      >
                        {moment(departureDate).format("dddd").slice(0, 3)}
                        {", "}
                        {moment(departureDate).format("MMM Do")}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        color: "#006ED5",
                        flex: 1,
                        fontWeight: "bold",
                        fontSize: 14,
                        textAlignVertical: "center",
                        textAlign: "right",
                        right: 5,
                        marginRight: 15,
                      }}
                    >
                      {price != null ? `${price} ETB` : "No price added"}
                      {/* {allData.maxAvailableSeat} Seats Left */}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ textAlign: "center", top: 5, right: 3 }}>
                      - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      - - - - - - - - - - - -
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    {/* <Text style={styles.cashStyle}>
                      {price != null ? `${price} ETB` : "No price added"}
                    </Text> */}
                    <Text
                      style={{
                        color: "#006ED5",
                        fontSize: 14,
                        flex: 1,
                        textAlign: "center",
                        marginRight: 20,
                        marginTop: 10,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      NEXT
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </DropShadow>
        </View>
      );
    });
  }

  /////////////////////////////////////////////////////

  return (
    <ScrollView
      style={{ backgroundColor: "#FFF7F3" }}
      contentContainerStyle={{ flexGrow: 1 }}
      stickyHeaderIndices={[0]}
    >
      {navigation.getParent() ?.setOptions({ tabBarStyle: { display: "none" } })}
      <View style={{ backgroundColor: "#FFF7F3" }}>{topDatePicker()}</View>
      {loading && (
        <View>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
      {!isEnabledTwoWay && availableSchedule.scheduleList.length == 0 && (
        <View

        // }}
        >
          <Text
            style={{
              color: "#f27f22",
              fontSize: 14,
              marginLeft: 20,
              marginRight: 10,
            }}
          >
            Sorry, No results were found for your bus preference. Please check
            other bus options.
          </Text>
        </View>
      )}

      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.firstTrip.length == 0 && (
          <View
          // style={{
          //   flex: 1,
          //   flexDirection: "row",
          //   alignSelf: "center",
          //   marginLeft: 5,
          //   marginTop: 10,
          //   backgroundColor: "#f27f22",
          //   borderWidth: 1,
          //   borderColor: "#f27f22",
          //   borderRadius: 10,
          // }}
          >
            <Text
              style={{
                color: "#f27f22",
                fontSize: 14,
                marginLeft: 20,
                marginRight: 10,
              }}
            >
              Sorry, No results were found for your bus preference. Please check
              other bus options.
            </Text>
          </View>
        )}
      {!isEnabledTwoWay && availableSchedule.scheduleList.length != 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "flex-end",
            marginRight: 20,
            marginTop: 10,
            marginBottom: 10,
            // backgroundColor: "red",
            maxHeight: 20,

          }}
        >
          <Text style={{ color: "#FF6A22" }}>
            {`${availableSchedule.scheduleList.length} Schedule(s) found`}
          </Text>
        </View>
      )}
      {!isEnabledTwoWay && availableSchedule.scheduleList.length == 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "flex-end",
            marginRight: 20,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#006ED5" }}>
            {`${availableSchedule.alternate.length}  Route(s) found`}
          </Text>
        </View>
      )}

      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.firstTrip.length != 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#006ED5" }}>
              {`${availableSchedule.roundTripSchedule.firstTrip.length}  Route(s) found`}
            </Text>
          </View>
        )}

      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.firstTrip.length == 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 10,

            }}
          >
            <Text style={{ color: "#006ED5" }}>
              {`${availableSchedule.alternateRoundTripSchedule.firstTrip.length}  Route(s) found`}
            </Text>
          </View>
        )}

      {isEnabledTwoWay ? cardViewTwoWay() : cardViewOneWay()}


      {/* <Pressable
        onPress={()=>{console.log('bdhvbdf',valueTo)}}
        style={{
          backgroundColor: "#f27f22",
          width: screenWidth / 1.3,
          height: 50,
          borderRadius: 15,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Next
        </Text>
      </Pressable> */}

    </ScrollView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
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
    fontSize: 30,
    color: "#f27f22",
    marignleft: 33,
  },
  cards: {
    backgroundColor: "#FFF7F3",
    width: screenWidth / 1.12,
    borderWidth: 0,
    shadowOffset: 10,
    shadowColor: "black",
    marginHorizontal: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    flex: 1,
    alignSelf: "center",
    marginVertical: 10,
    borderTopWidth: 5,
    borderColor: "#FFF7F3",
    elevation: 10,
  },
  cashStyle: {
    textAlign: "left",
    fontSize: 14,
    color: "#FF6B1B",
    padding: 15,
    marginLeft: 10,
  },
  cityStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: 7,
  },
  timeStyle: {
    flexDirection: "row",
    // justifyContent : 'space-around',

    top: 5,
  },
  timeCashStyle: {
    // justifyContent : 'space-around'
  },
  busIcon: {
    fontSize: 20,
    color: "#212121",
  },
});
