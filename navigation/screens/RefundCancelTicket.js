import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Switch,
  TextInput,
  ActivityIndicator,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Date,
  Alert,
  Image,
  Modal,
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import {
  Icon,
  IconElement,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import moment from "moment";
import { useRoute } from "@react-navigation/native";
// import DropShadow from "react-native-drop-shadow";
const screenWidth = Dimensions.get("window").width;

export default function RefundCancelTicket({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const route = useRoute();
  const isRefund = route.params.isRefund;
  const ticketNum = route.params.ticketNum;
  const loginD = route.params.loginD;
  const requestData = route.params.requestData;

  const requestTicket = (x) => {
    console.log("tickey num------------------" + x);
    if (isRefund == true) {
      setLoading(true);
      fetch(
        `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/refund-ticket-request/${x}`
      )
        .then((response) => response.json())
        .then((data) => {
          const requestData = data;
          console.log(requestData);
          if (requestData.errorCode == null) {
            navigation.navigate("success", { requestData, loginD });
          } else {
            Alert.alert(
              "Yene Guzo",
              "Sorry, The session has expired. Please try again later. ",
              [{ text: "OK", onPress: () => {} }]
            );
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            "Yene Guzo",
            "Sorry, The session has expired. Please try again later. ",
            [{ text: "OK", onPress: () => {} }]
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(
        `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/cancel-ticket-request/${x}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const requestData = data;
          console.log(requestData);
          if (requestData.errorCode == null) {
            navigation.navigate("success", { requestData, loginD });
          } else {
            Alert.alert(
              "Yene Guzo",
              "Sorry, The session has expired. Please try again later. ",
              [{ text: "OK", onPress: () => {} }]
            );
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            "Yene Guzo",
            "Sorry, The session has expired. Please try again later. ",
            [{ text: "OK", onPress: () => {} }]
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const refundTicket = () => {
    return requestData.map((requestData) => {
      if (requestData.active == true) {
        return (
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                width: screenWidth / 1.1,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "#FFF7F3",
                borderColor: "#FFF7F3",
                height: 265,
                marginBottom: 40,
                elevation: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#212121",
                    marginLeft: 15,
                    textAlign: "left",
                  }}
                >
                  {requestData.from}
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
                      marginLeft: 30,
                      borderRadius: 1,
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    flex: 1,
                    color: "#212121",
                    textAlign: "right",
                    marginRight: 15,
                  }}
                >
                  {requestData.to}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",

                  marginTop: 20,
                }}
              >
                <Text style={{ textAlign: "left", marginLeft: 15 }}>
                  Date issued
                </Text>
                <Text style={{ flex: 1, textAlign: "right", marginRight: 15 }}>
                  Date to be expired
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",

                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    marginLeft: 15,
                    color: "#FF6A22",
                  }}
                >
                  {moment(requestData.departureDate).format("dddd").slice(0, 3)}
                  {", "}
                  {moment(requestData.departureDate).format("MMM Do")}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    marginRight: 15,
                    color: "#FF6A22",
                  }}
                >
                  {moment(requestData.departureDate).format("dddd").slice(0, 3)}
                  {", "}
                  {moment(requestData.departureDate).format("MMM Do")}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",

                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    marginLeft: 15,
                    fontWeight: "bold",
                  }}
                >
                  Passenger Name
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    marginRight: 15,
                  }}
                >
                  {requestData.fullName}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: screenWidth / 1.2,
                  height: 0.1,
                  borderStyle: "dotted",
                  borderRadius: 50,
                  alignSelf: "center",
                  marginTop: 30,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",

                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    marginRight: 20,
                    color: "#FF6A22",
                  }}
                >
                  Paid Amount
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    marginRight: 15,
                    color: "#FF6A22",
                    fontWeight: "bold",
                  }}
                >
                  {requestData.price} ETB
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: screenWidth / 1.1,
                height: 60,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#FFF7F3",
                // marginTop: 10,
                marginBottom: 10,
                top: -20,
                backgroundColor: "#FF6A22",
                alignSelf: "center",
              }}
              onPress={() => requestTicket(requestData.ticketNumber)}
            >
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  flex: 1,
                  textAlignVertical: "center",
                  color: "white",
                }}
              >
                Request
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    });
  };

  const cancelTicket = () => {
    return requestData.map((requestData) => {
      if (requestData.active == true) {
        return (
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                width: screenWidth / 1.1,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "#FFF7F3",
                borderColor: "#FFF7F3",
                height: 265,
                marginBottom: 40,
                elevation: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#212121",
                    marginLeft: 15,
                    textAlign: "left",
                  }}
                >
                  {requestData.from}
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
                      marginLeft: 30,
                      borderRadius: 1,
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    flex: 1,
                    color: "#212121",
                    textAlign: "right",
                    marginRight: 15,
                  }}
                >
                  {requestData.to}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",

                  marginTop: 20,
                }}
              >
                <Text style={{ textAlign: "left", marginLeft: 15 }}>
                  Date issued
                </Text>
                <Text style={{ flex: 1, textAlign: "right", marginRight: 15 }}>
                  Date to be expired
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",

                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    marginLeft: 15,
                    color: "#FF6A22",
                  }}
                >
                  {moment(requestData.departureDate).format("dddd").slice(0, 3)}
                  {", "}
                  {moment(requestData.departureDate).format("MMM Do")}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    marginRight: 15,
                    color: "#FF6A22",
                  }}
                >
                  {moment(requestData.departureDate).format("dddd").slice(0, 3)}
                  {", "}
                  {moment(requestData.departureDate).format("MMM Do")}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",

                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    marginLeft: 15,
                    fontWeight: "bold",
                  }}
                >
                  Passenger Name
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    marginRight: 15,
                  }}
                >
                  {requestData.fullName}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: screenWidth / 1.2,
                  height: 0.1,
                  borderStyle: "dotted",
                  borderRadius: 50,
                  alignSelf: "center",
                  marginTop: 30,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",

                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    marginRight: 20,
                    color: "#FF6A22",
                  }}
                >
                  Paid Amount
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    marginRight: 15,
                    color: "#FF6A22",
                    fontWeight: "bold",
                  }}
                >
                  {requestData.price} ETB
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: screenWidth / 1.1,
                height: 60,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#FFF7F3",
                // marginTop: 10,
                marginBottom: 10,
                top: -20,
                backgroundColor: "#FF6A22",
                alignSelf: "center",
              }}
              onPress={() => requestTicket(requestData.ticketNumber)}
            >
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  flex: 1,
                  textAlignVertical: "center",
                  color: "white",
                }}
              >
                Request
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    });
  };

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
                    navigation.navigate("cancelTicket", { loginD });
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
                      CANCELLATION
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

  return (
    <ScrollView
      style={{ backgroundColor: "#FFF7F3" }}
      stickyHeaderIndices={[0]}
    >
      {showSideBar && Sidebar()}
      <View style={{ backgroundColor: "#FFF7F3" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
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
                  color: "#FFF7F3",
                  fontWeight: "bold",
                }}
              >
                {isRefund ? "Refund" : "Cancel"}
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
                  style={{
                    marginTop: 10,
                    color: "#FF6A22",
                    textAlign: "right",
                  }}
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
      </View>
      <View style={{ flex: 1, alignSelf: "center" }}>
        {isRefund ? refundTicket() : cancelTicket()}
      </View>
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
      {/* <Pressable
        onPress={() => {
          console.log("data---------------", requestData);
        }}
        style={{
          marginTop: 50,
          alignSelf: "center",
          width: 70,
          backgroundColor: "red",
        }}
      >
        <Text>press</Text>
      </Pressable> */}
    </ScrollView>
  );
}
