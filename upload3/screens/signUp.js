import React ,{useState} from 'react';
import { StyleSheet, Text, View ,TextInput , Button,Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import fb from '../firebase/ApiKeys'
import {NavigationActions} from 'react-navigation';

export default function signUp({navigation}) {

  const [Email,setEmail] = useState('')
  const [Password,setPassword] = useState('')
  const [PasswordConfirm,setPasswordConfirm] = useState('')
  
  const onChangeEmailHandler = (val) =>{
    setEmail(val)
  }
  const onChangePasswordHandler = (val) =>{
    setPassword(val)
  }
  const onChangePasswordConfirmHandler = (val) =>{
    setPasswordConfirm(val)
  }

  
  const signUpHandler = () =>{
    if(PasswordConfirm !== Password){
      Alert.alert('Warning!','Enter your Password not correct',['Okay'])
    }else{
      fb.auth().createUserWithEmailAndPassword(Email,Password).then(()=>
        console.log('signUpHandler'),
        (error)=>{
          Alert.alert(error.message)
        }) 
    }
  }

  const signInHandler = () => {
    navigation.navigate('SignIn')
  }

  const forgetPasswordHandler = () => {
    navigation.navigate('ForgetPassword')
  }
  

  return (
    <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss()
    }}>
        <View style={styles.container}>
            <Text style={styles.Header}>SignUp</Text>
            <TextInput style={styles.textInput} placeholder="Email" value = {Email}  onChangeText={onChangeEmailHandler}></TextInput> 
            <TextInput style={styles.textInput} placeholder="password" value = {Password} onChangeText={onChangePasswordHandler}></TextInput> 
            <TextInput style={styles.textInput} placeholder="confirm password" value = {PasswordConfirm} onChangeText={onChangePasswordConfirmHandler}></TextInput> 
            <View style={styles.marggin}>
              <Button title="SignUp" onPress={()=>{signUpHandler()}}></Button>
            </View>
            <View style={styles.up}></View>
            <View style={styles.marggin}>
             <Button title="Login" onPress={()=>{signInHandler()}}></Button>
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
    marginTop:330
  }
});
