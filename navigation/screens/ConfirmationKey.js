import {React,useState,useEffect} from 'react'
import { View,ScrollView,Text,Pressable,TouchableOpacity,Dimensions } from 'react-native'
import {
    Icon,
    IconElement,
    Input,
    Button,
    Layout,
  } from "@ui-kitten/components";

  import { useRoute } from "@react-navigation/native";

export default function ConfirmationKey ({navigation}){
  const screenWidth = Dimensions.get('window').width

const[confKey,setConfKey]=useState('')
    const ConfView = ()=>{

        return(
            <View style={{flex:1,alignSelf:"center",justifyContent:'center'}}>
               <Text style={{fontSize:20,fontWeight:'600',alignSelf:"center",marginBottom:10}}>YENE GUZO</Text>
              <Text style={{fontSize:16,fontWeight:'600',alignSelf:"center",marginBottom:10}}>Verification Key</Text>
        <Input
                value={confKey}
                placeholder="Enter your Key"
              
                onChangeText={(nextValue) => setConfKey(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginBottom: 10,
                  borderWidth:1,
                  borderColor:"#EBEBEB",
                  
                  borderRadius: 10,
                  backgroundColor: "#EBEBEB",
                  elevation: 10,
                }}
              />
              <Button onPress={()=>{navigation.navigate("pin")}}
               style={{marginTop:10,backgroundColor:'#FF6B1B',borderColor:'#FF6B1B'}}>Next</Button>
            </View>
        )
    }
    return(
        <ScrollView >
          <View style={{marginTop:200}}>{ConfView()}</View>

        </ScrollView>
    )
}