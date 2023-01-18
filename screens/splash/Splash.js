import React,{useState,useRef, useEffect} from 'react'
import { Animated,TouchableOpacity,Easing , Text , View, Dimensions ,} from 'react-native'
import { Clock, useCode, Value } from 'react-native-reanimated';
import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    width:100%;
    
 
`;

const SplashImg = styled.Image`
  width:100%;
  height:100%;
` 

const Splash = () => {
  return (
    <Container>
      <SplashImg source={require("../../images/splash.gif")}></SplashImg>
    </Container>
  )
    

}


export default Splash;