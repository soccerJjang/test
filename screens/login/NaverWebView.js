import React from 'react';
import * as RN from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { snsApi } from '../../api/sign';

const NaverWebView = (props) => {

    const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
    const webViewRef = React.useRef();
    const [sended, setSended] = React.useState(false);

    function LogInProgress(data) {
        // access code는 url에 붙어 장황하게 날아온다.
        // substringd으로 url에서 code=뒤를 substring하면 된다.
        
        const exp = "code=";
        var condition = data.indexOf(exp);

        if (condition != -1) {
            var request_code = data.substring(condition + exp.length);
            request_code = request_code.substring(0, request_code.indexOf('\&'));
            // console.log("access code :: " + request_code);

            // console.log("access code :: " + request_code);
            // 토큰값 받기

            requestToken(request_code);

        }
    };

    const requestToken = async (request_code) => {
        setSended(true);
        let returnValue = "none";
        let request_token_url = "https://nid.naver.com/oauth2.0/token";
      
        axios({ // #1 accessToken 값 가져오기 
            method: "post",
            url: request_token_url,
            params: {
                grant_type: 'authorization_code',
                client_id: 'FOPJaE0owM4LGLk8kHQa',
                client_secret: 'Y8BxsDLg_w',
                code: request_code,
                state : "STATE_STRING"
            }, 
        }).then((response)=> {
            returnValue = response.data.access_token;
            SecureStore.setItemAsync('NaverAccessToken', returnValue);
            return returnValue;
        }).then((accessToken)=> {


          axios({ // #2 프로필 값 가져오기
            method: "get",
            url: "https://openapi.naver.com/v1/nid/me",
            headers: {
              'Authorization': 'Bearer ' + accessToken
            }
          }).then((response)=> {

              return response.data.response;

          }).then((profile) => {

              (async() => {
                await SecureStore.setItemAsync('snsInfo', JSON.stringify({...profile, snsType : "naver"}))
                const res = await snsApi.snsIdChk(profile.id);

                if(res.message === 'emp') {
                  props.navigation.dispatch(
                      CommonActions.reset({
                          routes: [
                              {
                                  name : 'SnsJoin'
                              }
                          ]
                      })
                  );
              } else if (res.message === 'exi') {

                    await SecureStore.setItemAsync(
                        'login','Y'
                    );
                    await SecureStore.setItemAsync(
                        'userData',
                        (JSON.stringify(res.userInfo))
                    );
                  props.navigation.dispatch(
                      CommonActions.reset({
                          routes: [
                              {
                                  name: 'HomeDraw'
                              }
                          ]
                      })
                  )
              }

              if(res.message === 'ID not found') {
                  props.navigation.navigate('NaverWebView');
              }
              })();
          })
          .catch((err) => {
              SecureStore.deleteItemAsync('NaverAccessToken');
          })
                              
        }) 
        .catch(function (error) {
            console.log('error', error);
        });
    };



    if(sended) {
        return(<RN.View/>)
    }else {
        return (
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                scalesPageToFit={false}
                startInLoadingState={true}
                javaScriptCanOpenWindowsAutomatically={true}
                sharedCookiesEnabled={true}
                style={{ marginTop: 30}}
                source = {{uri : `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=FOPJaE0owM4LGLk8kHQa&state=STATE_STRING&redirect_uri=http://223.130.132.180:5008/login/oauth&auth_type=reauthenticate`}}
                javaScriptEnabled={true}
                injectedJavaScript={runFirst}
                onMessage={event => {
                    LogInProgress(event.nativeEvent['url']);
                }}
            />
        )
    }
}

export default NaverWebView;