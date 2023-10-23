import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions, Pressable } from "react-native";
import { useState, useEffect ,useContext} from "react";

//////////////////
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from 'react-native-splash-screen';
// Screens
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SearchResult from "./screens/SearchResult";
import Profile from "./screens/Profile"


import PassengersInformation from "./screens/PassengersInformation";

import PaymentOption from "./screens/PaymentOptions";
import TicketScreen from "./screens/TicketScreen";

import RefundTicket from "./screens/RefundTicket";
import CancelTicket from "./screens/CancelTicket";
import RefundCancelTicket from "./screens/RefundCancelTicket";
import SuccessPage from "./screens/SuccessPage";

import Refund from "./screens/Refund";


import FirstForm from "./screens/FirstForm"
import { Buffer } from 'buffer'

import axios from "axios";
import { DataContext } from './DataContext'

//Screen names
const homeName = "LIYU BUS";
const detailsName = "Ticket";
const settingsName = "Settings";
const splashScreen = "splash";
const { Navigator, Screen } = createStackNavigator();

const screenWidth = Dimensions.get("window").width;
const Tab = createBottomTabNavigator();

export default function MainContainer() {
 const [showScreen, setShowScreen] = useState(false);
 const [isX,setIsX]=useState(false)
 const[isLoading,setIsLoading] = useState(true)

const linking ={
  prefixes:['yeneguzo://']
}
  const onNavigationReady = () => {
    SplashScreen.hide();
}
  const [isFirstTime,setIsFirstTime] = useState(true)
  useEffect(()=>{getData()},[])

  const getData = async()=>{
   
    try {
        let user = await AsyncStorage.getItem('Data');  
        // let parsed = JSON.parse(user);  
        // console.log('Data retrieved successfully!',parsed.userName);
        if(user!=null){
setIsFirstTime(false)
        }
      } catch (error) {
        console.error('Error storing data:', error);
      } 

      setIsLoading(false)
}

const Home = () => {
  return (
    <Navigator>

{isFirstTime && <Screen
        name="form"
        component={FirstForm}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />}

      <Screen
        name="home"
        component={HomeScreen}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />

        <Screen
        name="refund"
        component={Refund}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />


         <Screen
        name="profile"
        component={Profile}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />
  
      <Screen
        name="refundTicket"
        component={RefundTicket}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />
      <Screen
        name="cancelTicket"
        component={CancelTicket}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />
      <Screen
        name="refundCancelTicket"
        component={RefundCancelTicket}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />
      <Screen
        name="success"
        component={SuccessPage}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />
  
      <Screen
        name="ticketScreen"
        component={TicketScreen}
        options={() => ({
          tabBarStyle: {
            display: "none",
          },

          tabBarButton: () => null,
          headerShown: false,
        })}
      />
   



      <Screen
        name="paymentOption"
        component={PaymentOption}
        options={{
          title: "Checkout Page",
          headerStyle: {
            backgroundColor: "#FFF7F3EB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#FF6A22",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#FF6A22",
            fontSize: 16,
          },
        }}
      />
      <Screen
        name="Passenger Information"
        component={PassengersInformation}
        options={{
          title: "Passenger Information",
          headerStyle: {
            backgroundColor: "#FFF7F3EB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#FF6A22",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#FF6A22",
            fontSize: 16,
          },
        }}
      />
      <Screen
        name="search"
        component={SearchResult}
        options={{
          title: "Select Your Departure",
          
          headerStyle: {
            backgroundColor: "#FFF7F3EB",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "#FF6A22",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#FF6A22",
            fontSize: 16,
          },
        }}
      />
    
      <Screen
        name="passengersInfo"
        component={PassengersInformation}
        options={{
          title: "Passengers Information",
          headerStyle: {
            backgroundColor: "#3c6791",
            alignItems: "center",
            height: 60,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "white",
            fontSize: 15,
          },
        }}
      />
    </Navigator>
  );
};

  return ( 
    <NavigationContainer onReady={onNavigationReady} linking={linking}>
      {!isLoading &&
      <Tab.Navigator
        initialRouteName="home"
        headerMode="none"
        screenOptions={({ route }) => ({
          activeTintColor: "#FF6A22",
            inactiveTintColor: "grey",
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 10, height: 70 },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === detailsName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        // tabBarOptions={{
        //   activeTintColor: "#FF6A22",
        //   inactiveTintColor: "grey",
        //   labelStyle: { paddingBottom: 10, fontSize: 10 },
        //   style: { padding: 10, height: 70 },
        // }}
      >
        <Tab.Screen
          name={homeName}
          component={Home}
          options={() => ({
            headerShown: false,
            unmountOnBlur: true,
            tabBarStyle: {
              display: "none",
            },
          })}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
        />

        <Tab.Screen
          name={detailsName}
          component={DetailsScreen}
          options={() => ({ unmountOnBlur: true })}
        />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
      </Tab.Navigator>
      
      }
    </NavigationContainer>
  );
}

