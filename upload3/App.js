import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput, Button,FlatList, TouchableOpacity,Alert,Keyboard, TouchableWithoutFeedback} from 'react-native';
import Navigator from './routes/drawer'
import fb from './firebase/ApiKeys'
import SignStack from './routes/SignStack'

export default function App() {
  const [isAuth,setisAuth] = useState(false)

  useEffect(() => {
    fb.auth().onAuthStateChanged(onAuthStateChanged);
  },[])

  function onAuthStateChanged(user){
    setisAuth(!!user)
  }
  return (
      <View style={styles.container}>
        { (isAuth === false) ? <SignStack/> : <Navigator/>}    
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // padding:20
    // alignItems: 'center',
    // justifyContent: 'center',

  },
  header:{
    backgroundColor:"white",
    height:40,
    marginTop:15,
    marginBottom:15,
    padding:10,
    fontSize:30,
    alignItems:"center"
  }
});
