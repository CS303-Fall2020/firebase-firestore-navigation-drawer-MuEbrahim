import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import profile from '../screens/profile'
import HomeHeader from '../components/HomeHeader'
import React, {useState} from 'react';

const screens = {
 profile:{
    screen:profile,
    navigationOptions:({navigation}) =>{
      return{
         headerTitle:()=> <HomeHeader navigation={navigation}/>,
      }
   }
 }
}
const HomeStack = createStackNavigator(screens);

export default HomeStack;