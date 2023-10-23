import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Switch,
  Image,
  TextInput,
  ActivityIndicator,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Modal,
  Date,
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import {
  Icon,
  IconElement,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";
import { height } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
const screenWidth = Dimensions.get("window").width;

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;
export default function CancelTicket({ navigation }) {
  const [ticketNum, setTicketNum] = React.useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTicketNumber,setisTicketNumber] = useState(false)
  const isRefund = false;
  const route = useRoute();
  const loginD = route.params.loginD;
  const renderIcon = (props) => (
    <TouchableWithoutFeedback>
      <Text style={{ color: "#FFF7F3", fontSize: 25, fontWeight: "bold" }}>
        *
      </Text>
    </TouchableWithoutFeedback>
  );
  const Sidebar = () => {
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowSideBar(false);
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
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
                      marginLeft: 20,
                    }}
                  />
                  <Text
                    style={{ marginTop: 10, marginLeft: 10, color: "white" }}
                  >
                    {loginD.fullName}
                  </Text>
                  <Text style={{ marginTop: 10, color: "white" }}>
                    Abay Bus Sales Agent
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, marginTop: 50 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("home", { loginD });
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
                      BOOK
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("refundTicket", { loginD });
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
                        alignSelf: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      REFUND
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
                      source={require("../Img/cancel.png")}
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
                      CANCELLATION{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("handover", { loginD });
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/calculator.png")}
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
                      HANDOVER
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("home", { loginD });
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
                <View style={{ marginTop: 100 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("home", { loginD });
                      setShowSideBar(false);
                    }}
                    style={{ marginBottom: 30 }}
                  >
                    <View style={{ flexDirection: "row", marginLeft: 60 }}>
                      <Image
                        source={require("../Img/lang.png")}
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
                        LANGUAGE
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("login");
                      setShowSideBar(false);
                    }}
                    style={{ marginBottom: 30 }}
                  >
                    <View style={{ flexDirection: "row", marginLeft: 60 }}>
                      <Image
                        source={require("../Img/logout.png")}
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
                        SIGN-OUT
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const SearchTicket = () => {
    if (ticketNum != null) {
      setLoading(true);
      if(isTicketNumber){

        fetch(
          `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/get-tickets/${ticketNum}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const requestData = data;
            if (requestData.length != 0) {
              navigation.navigate("refundCancelTicket", {
                requestData,
                isRefund,
                ticketNum,
                loginD,
              });
            } else {
              Alert.alert("Yene Guzo", "Sorry, No ticket found. ", [
                { text: "OK", onPress: () => {} },
              ]);
            }
          })
          .catch((error) => {
            console.error(error);
            Alert.alert(
              "Yene Guzo",
              "Sorry, The session has expired. Please try again later.",
              [{ text: "OK", onPress: () => {} }]
            );
          })
          .finally(() => {
            setLoading(false);
          });

      }
      else{
      fetch(
        `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/get-user-tickets/${ticketNum}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const requestData = data;
          if (requestData.length != 0) {
            navigation.navigate("refundCancelTicket", {
              requestData,
              isRefund,
              ticketNum,
              loginD,
            });
          } else {
            Alert.alert("Yene Guzo", "Sorry, No ticket found. ", [
              { text: "OK", onPress: () => {} },
            ]);
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            "Yene Guzo",
            "Sorry, The session has expired. Please try again later.",
            [{ text: "OK", onPress: () => {} }]
          );
        })
        .finally(() => {
          setLoading(false);
        });}
    } else {
      Alert.alert("Yene Guzo", "Fill the required fields ", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };
  const Cancel = () => {
    return (
      <View style={{ marginTop: Dimensions.get("window").height / 6 }}>
        <Text style={{ marginBottom: 20, textAlign: "center", fontSize: 14 }}>
          Find the booked ticket you want to cancel
        </Text>
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
              Cancel a Ticket
            </Text>
            <Text style={{ fontSize: 14, marginLeft: 30, marginVertical: 10 }}>
              Please add the your phone number
            </Text>

             {/* <View style={{  flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    left: 8,
    marginTop: 9,
    marginLeft: 20,
    maxWidth: 160,
    maxHeight:30,
    }}>
            toggle One

              <Switch
                trackColor={{ false: "#EBEBEB", true: "#f27f22" }}
                thumbColor={isTicketNumber ? "#f27f22" : "#f4f3f4"}
                onValueChange={() => setisTicketNumber(!isTicketNumber)}
                value={isTicketNumber}
              />

              <Text style={{ color: "black", top: 1, fontSize: 16 }}>
                Ticket Number
              </Text>
            </View> */} 
            <Input
              value={ticketNum}
              placeholder="Insert Your Phone Number"
              accessoryRight={renderIcon}
              keyboardType="numeric"
              onChangeText={(nextValue) => setTicketNum(nextValue)}
              style={{
                width: screenWidth / 1.3,
                marginBottom: 10,
                borderWidth: 1,
                borderRadius: 10,
                alignSelf: "center",
                borderColor:"#FFF7F3",
                elevation: 20,
                shadowColor: "black",
                backgroundColor: "#FFF7F3",
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
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFF7F3" }}>
      {showSideBar && Sidebar()}
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
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              flex: 1,
              flexDirection: "row",

              marginVertical: 30,
            }}
          >
            <Image
              source={require("../Img/hamburgery.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                marginLeft: 5,
                color: "#FF6A22",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",

              alignSelf: "flex-end",
              top: 10,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ marginTop: 10, color: "#FF6A22", textAlign: "right" }}
              >
                {loginD.fullName}
              </Text>
              <Text style={{}}>Abay Bus Sales Agent</Text>
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
      <View style={{ flex: 1, alignSelf: "center" }}>{Cancel()}</View>
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
    </ScrollView>
  );
}
