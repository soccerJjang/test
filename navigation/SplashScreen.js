import * as React from 'react';
import * as RN from 'react-native';
import AppLoading from "expo-app-loading";
import { IntroImage } from '../styled-components';
import * as SecureStore from "expo-secure-store";
import axios from 'axios';

const STYLES = ['default', 'dark-content', 'light-content'];

const SplashScreen = (props) => {
  const [ready, setReady] = React.useState(false);

  const onFinish = () => { 
    setReady(true);
  }

  const startLoading = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

    const getItemAsync = async() => {
  
      let remember = await SecureStore.getItemAsync('remember').then();
      let userData = await SecureStore.getItemAsync('userData').then();
      let kakaoAccessToken = await SecureStore.getItemAsync('kakaoAccessToken');
      let naverAccessToken = await SecureStore.getItemAsync('naverAccessToken');

      let accessToken = ''
      let url = ''

      if(kakaoAccessToken !== null) {
          accessToken = kakaoAccessToken;
          url = 'https://kapi.kakao.com/v1/user/access_token_info';
      }

      if(naverAccessToken !== null) {
          accessToken = naverAccessToken;
          url = 'https://openapi.naver.com/v1/nid/me'
      }

      console.log("앱이 시작되었다 !!!!")

      console.log(kakaoAccessToken, naverAccessToken);
      
       
      if(kakaoAccessToken === null && naverAccessToken === null) {
        if(remember !== null && userData !== null ) {
          props.navigation.replace('HomeDraw');
        } else {
          await SecureStore.deleteItemAsync('snsInfo')
          await SecureStore.deleteItemAsync('userData')
          await SecureStore.deleteItemAsync('kakaoAccessToken')
          await SecureStore.deleteItemAsync('naverAccessToken')
          props.navigation.replace('LoginDraw');
        }
      } else {

        
        if(kakaoAccessToken !== null || naverAccessToken !== null) {
          props.navigation.replace('HomeDraw');

          (async () => {
            axios({
              method: 'GET',
              url: url,
              headers: {
                'Authorization': `Bearer ` + accessToken 
              }
            })
            .then((res) => {

            })
          })
          
        } else {
          props.navigation.replace('LoginDraw');
        }
        
        
      }

    }
    getItemAsync();
 

  return (
    <RN.View>
    </RN.View>
  )
}

export default SplashScreen;