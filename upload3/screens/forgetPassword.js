import React,{useState} from 'react';
import { StyleSheet, Text, View ,TextInput , Button ,Alert ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import fb from '../firebase/ApiKeys' 
import {NavigationActions} from 'react-navigation';


export default function forgetPassword({navigation}) {

  const [Email, setEmail] = useState('')

  const onChangeHandler = (val) =>{
   setEmail(val)
  }

  const signUpHandler = () => {
    navigation.navigate('SignUp')

  }
  
  const signInHandler = () => {
    navigation.navigate('SignIn')
  }
  const forgetPasswordHandler = () =>{
    fb.auth().sendPasswordResetEmail(Email).then(()=>{
      Alert.alert("Password reset has been sent.")
    },(error)=>{
      Alert.alert(error.message)
    })
    
  }


  return (
    <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss()
    }}>
        <View style={styles.container}>
            <Text style={styles.Header}>Forget Password?</Text>
            <TextInput style={styles.textInput} placeholder="Email" onChangeText={onChangeHandler}></TextInput>
            <View style={styles.marggin}>
              <Button style={styles.btn} title="Send Rest Request" onPress={()=>{forgetPasswordHandler()}}></Button>
            </View>
            <View style={styles.up}></View>
            <View style={styles.marggin}>
             <Button title="SignUp" onPress={()=>{signUpHandler()}}></Button>
            </View>
            <View style={styles.marggin}>
             <Button title="Login" onPress={()=>{signInHandler()}}></Button>
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
    marginTop:430
  }

});
