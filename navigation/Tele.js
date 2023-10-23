import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  NativeModules,
 

} from "react-native";


const { CustomModule } = NativeModules;

// Call the getCurrentActivityName method

export default function Tele() {
  const x =()=>{
    CustomModule.getCurrentActivityName().then((currentActivityName) => {
      console.log('Current activity name:', currentActivityName);
    }).catch((error) => {
      console.error('Error getting current activity:', error);
    });
  }
 
  return (
    <View>
      <Pressable onPress={()=>{x()}}><Text>Hello</Text></Pressable>
    </View>
  )
}
