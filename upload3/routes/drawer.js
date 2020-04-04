import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import profile from './profile'
import home from './homeStack'
import React from 'react'
import { StyleSheet, Text, View , Button} from 'react-native';
import fb from '../firebase/ApiKeys'
import {TouchableOpacity} from 'react-native-gesture-handler'


const RootDrawerNavigator = createDrawerNavigator({
    home:{
        screen:home,
    },
    profile:{
        screen:profile, 
    },  
    x:{
        screen:profile, 
        navigationOptions: {
            drawerLabel: () => (
            <TouchableOpacity>
                <Button
                title='SignOut'
                onPress={() => {
                    fb.auth().signOut()
                }}
                >
                </Button>
            </TouchableOpacity>
            )
            }
        }
    }
)
const styles = StyleSheet.create({
    
  });

export default createAppContainer(RootDrawerNavigator)