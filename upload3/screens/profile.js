import React,{useState,useEffect}  from 'react';
import { StyleSheet, Text, View ,TextInput , Button,Alert ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import fb from '../firebase/ApiKeys'

export default function profile({navigation}) {


  return (
    <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss()
    }}>
        <View style={styles.container}>
            <View style = {styles.cont}></View>
            <Text style={styles.Header}>profile</Text>
            <Button title='SignOut' onPress={()=>{fb.auth().signOut()}}></Button>
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:5,
    justifyContent:'center',
    alignContent:'center'
  },
  Header:{
      textAlign:'left',
      fontSize:30,
      fontWeight:'800',
      margin:5
  },
  textInput:{
      borderWidth:2,
      borderColor:'grey',
      padding:5,
      margin:5 
  },
  cont:{
    width:"60%",
    height:"50%",
    borderColor:"orange",
    borderWidth:5,
    backgroundColor:"lightblue",
    margin:'auto'
  }
});
