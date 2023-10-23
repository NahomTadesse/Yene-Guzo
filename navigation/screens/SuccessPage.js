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
  Pressable,
  TouchableWithoutFeedback,
  Date,
  Image,
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import {
  Icon,
  IconElement,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import DropShadow from "react-native-drop-shadow";
import { useRoute } from "@react-navigation/native";
import { faCny } from "@fortawesome/free-solid-svg-icons";
const screenWidth = Dimensions.get("window").width;

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export default function SuccessPage({ navigation }) {
  const route = useRoute();
  const loginD = route.params.loginD;
  return (
    <ScrollView style={{ backgroundColor: "#FFF7F3" }}>
      <View
        style={{
          alignSelf: "center",
          marginTop: 200,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../Img/check.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 20,
          fontSize: 18,
          fontWeight: "500",
          marginRight: 180,
        }}
      >
        Thank You!
      </Text>
      <Text style={{ alignSelf: "center", fontSize: 14 }}>
        Your Request has Successfully Submitted.
      </Text>
      <Pressable
        style={{
          width: screenWidth / 1.1,
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 20,
          borderColor: "#FF6A22",
          backgroundColor: "#FFF7F3",
          alignSelf: "center",
          height: 50,
          marginTop: 200,
        }}
        onPress={() => {
          navigation.navigate("home", { loginD });
        }}
      >
        <Text
          style={{
            color: "#FF6A22",
            alignSelf: "center",
            flex: 1,
            textAlignVertical: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          BACK TO HOME
        </Text>
      </Pressable>
    </ScrollView>
  );
}
