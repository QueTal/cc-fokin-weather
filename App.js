import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "2fb1b957d16dbdd5ad66ef3255bdbfee";

export default class extends React.Component{
  state ={
    isLoading : true
  };
  getWeather = async(latitude, longitude) => {
    const {data:{main: {temp}, weather}} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    this.setState({isLoading: false,  condition: weather[0].main, temp});
  };
  getLocation = async() => {
    try {
      Location.requestPermissionsAsync();
      const {coords :{latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      //this.setState({isLoading:false});
      
    } catch (error) {
      Alert.alert("cannot find");
    }
  };
  componentDidMount(){
    this.getLocation();
  };
  render(){
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading />  : <Weather temp={Math.round(temp)} condition={condition} />;
  }
} 