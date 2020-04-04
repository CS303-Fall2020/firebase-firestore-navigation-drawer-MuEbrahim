import React from 'react'
import { StyleSheet, Text, View , Button,TouchableWithoutFeedback} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import fb from '../firebase/ApiKeys'

export default function HomeHeader({navigation}) {

  const openMenu = () =>{
    navigation.openDrawer()
  }

  return ( 
        <View style={styles.headerStyle}>
                <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon}/>
                <View>
                  <Text style={styles.header}>profile</Text>
                </View>
                <Button title='signout' onPress={()=>{fb.auth().signOut()}}></Button>
        </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    height:70,
    width: 410,
    flexDirection:'row',
    backgroundColor: 'red',
    alignItems:'center',
    justifyContent:'center',
  },
  header:{
      textAlign:'center',
      fontSize:20,
      fontWeight:'800',
      margin:5
  },
  icon:{
    position:'absolute',
    left:16
  }
});
