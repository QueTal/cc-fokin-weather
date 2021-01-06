import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';

export default class extends React.Component{
  getLocation = async() =>{
    try {
      const response = await Location.requestPermissionsAsync();
      console.log(response);
      const loation = await Location.getCurrentPositionAsync();
      console.log(location);
    } catch (error) {
      Alert.alert("cannot find");
    }

  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    return <Loading />;
  }
} 