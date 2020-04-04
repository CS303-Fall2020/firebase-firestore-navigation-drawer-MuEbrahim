import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from '../components/Home'
import task from '../components/task'
import React, {useState} from 'react';
import HomeHeader from '../components/HomeHeader'
import { StyleSheet, Text, View , Button,TouchableWithoutFeedback} from 'react-native';


const screens = {
 TodoList:{
    screen:Home,
    navigationOptions:({navigation}) =>{
       return{
          headerTitle:()=> <HomeHeader navigation={navigation}/>,
       }
    }
 },
 details:{
    screen:task
 }
}
const HomeStack = createStackNavigator(screens);

export default HomeStack;