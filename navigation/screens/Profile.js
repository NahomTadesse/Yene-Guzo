import {React,useState,useEffect} from 'react'
import { View,ScrollView,Text,Pressable,TouchableOpacity,Dimensions,Alert,Image,Modal, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Icon,
    IconElement,
    Input,
    Button,
    Layout,
  } from "@ui-kitten/components";

  import { useRoute } from "@react-navigation/native";
import { parse } from 'react-native-svg';
  const screenWidth = Dimensions.get('window').width
  export default function Profile ({navigation}){
    useEffect(()=>{getData()},[])
    const [showSideBar, setShowSideBar] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userData,setUserData] = useState()
    const obj = {
        userName : `${fullName}`,
        userPhone : `${phoneNumber}`
    }
    const registerUser = async () => {
      if(fullName.split(' ')[0] !='' && fullName.split(' ')[1] !=null && fullName.split(' ')[1] != '' && phoneNumber !=''){
      try {
        await AsyncStorage.setItem('Data', JSON.stringify(obj));
        console.log('Data stored successfully!');
              Alert.alert(
          "Yene Guzo",
          "Edit Succesfull. ",
          [{ text: "OK", onPress: () => {} }]
        );
        Keyboard.dismiss()
        getData()
       
      } catch (error) {
        console.error('Error storing data:', error);
      }}
      else{
        Alert.alert(
          "Yene Guzo",
          "sorry, fill the required information ",
          [{ text: "OK", onPress: () => {} }]
        );
        Keyboard.dismiss()
      }
    };
    const getData = async()=>{
        try {
            let user = await AsyncStorage.getItem('Data');  
            let parsed = JSON.parse(user);  
            console.log('Data retrieved successfully!',parsed.userName);
            setUserData(parsed)
          } catch (error) {
            console.error('Error storing data:', error);
          } 
    }
 
    const userForm = ()=>{
        return(
<View>
<Input
                value={fullName}
                placeholder={userData && userData.userName}
                label = 'Enter your full name'
                onChangeText={(nextValue) => setFullName(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor:"#EBEBEB",
                  borderRadius: 10,
                  backgroundColor: "#EBEBEB",
                  elevation: 10,
                }}
              />
       <Input
                value={phoneNumber}
                placeholder= {userData && userData.userPhone}
                label = 'Enter your phone number'
                keyboardType="numeric"
                onChangeText={(nextValue) => setPhoneNumber(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor:"#EBEBEB",
                  borderRadius: 10,
                  backgroundColor: "#EBEBEB",
                  elevation: 10,
                }}
              />
    <Button onPress={registerUser} style={{backgroundColor:"#FF6B1B",borderColor:"#FF6B1B"}}>Edit Profile</Button>
    {/* <Button onPress={getData} style={{backgroundColor:"#FF6B1B",borderColor:"#FF6B1B"}}>Register</Button> */}
</View>
        )
    }
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
    return(
        <ScrollView style={{backgroundColor: "#FFF7F3"}}  keyboardShouldPersistTaps='handled'>
               <View style={{ backgroundColor: "#FFF7F3", marginBottom: 30,height:70 }}>
               {showSideBar &&  
      Sidebar()}
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
      </View>
            <View style={{alignSelf:'center',marginTop:100}}>
            {userForm()}
            </View>
        </ScrollView>
    )

  }