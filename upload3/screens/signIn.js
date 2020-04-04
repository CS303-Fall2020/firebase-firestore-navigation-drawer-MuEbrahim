import React,{useState,useEffect}  from 'react';
import { StyleSheet, Text, View ,TextInput , Button,Alert ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import {NavigationActions} from 'react-navigation';
import fb from '../firebase/ApiKeys'


export default function signIn({navigation}) {

    const [Email,setEmail] = useState('')
    const [Password,setPassword] = useState('')

    const onChangeEmailHandler = (val) =>{
        setEmail(val)
    }
    const onChangePasswordHandler = (val) =>{
        setPassword(val)
    }

    const signInHandler = () =>{
        fb
        .auth()
        .signInWithEmailAndPassword(Email,Password)
        .then(()=>
        console.log('signInHandler'),
        (error)=>{
            Alert.alert(error.message)
        })
    }
    
    const signUpHandler = () => {
        navigation.navigate('SignUp')
    }

    const forgetPasswordHandler = () => {
        navigation.navigate('ForgetPassword')
    }

  return (
    <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss()
    }}>
        <View style={styles.container}>
            <Text style={styles.Header}>Login</Text>
            <TextInput style={styles.textInput} placeholder="Email" value={Email}  onChangeText={onChangeEmailHandler}></TextInput> 
            <TextInput style={styles.textInput} placeholder="password" value={Password} onChangeText={onChangePasswordHandler}></TextInput> 
            <View style={styles.marggin}>
                <Button title="Login" onPress={()=>{signInHandler()}}></Button>
            </View>
            <View style={styles.up}></View>
            <View style={styles.marggin}>
                <Button title="SignUp" onPress={()=>{signUpHandler()}}></Button>  
            </View>
            <View style={styles.marggin}>
               <Button title="ForgetPassword" onPress={()=>{forgetPasswordHandler()}}></Button>
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:5
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
  marggin:{
      width:340,
      margin:5,
  },
  up:{
    marginTop:390
  }
});
