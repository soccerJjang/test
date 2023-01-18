import React from 'react';
import * as RN from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { snsApi } from '../../api/sign';

const KakaoWebView = (props) => {

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
            // console.log("access code :: " + request_code);
            // 토큰값 받기

            requestToken(request_code);

        }
    };
 
    const requestToken = async (request_code) => {
        setSended(true);
        var data = '';
        var accessToken = "none";
        var request_token_url = "https://kauth.kakao.com/oauth/token";

        axios({
            method: "post",
            url: request_token_url,
            params: {
                grant_type: 'authorization_code',
                client_id: '3324eec2b165a32e8395141fd7675856',
                redirect_uri: 'http://223.130.132.180:5008/login/oauth',
                code: request_code,
            },
        }).then(async (response) =>{

            data = response.data;
            accessToken = response.data.access_token;
            await SecureStore.setItemAsync('kakaoAccessToken', accessToken);

            return accessToken;
        }).then((accessToken) => {
          axios({
            method: 'get',
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }).then(res => {
                var kakaoInfo = res.data;
                // snsId db존재여부 확인
                (async() => {
                    await SecureStore.setItemAsync("snsInfo", JSON.stringify({...kakaoInfo, snsType : "kakao"}));
                    const res = await snsApi.snsIdChk(kakaoInfo.id);
                    
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
                        props.navigation.navigate('KakaoWebView');
                    }
                    
                })();
            })
            .catch((err) => {
                SecureStore.deleteItemAsync('kakaoAccessToken');
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
                sharedCookiesEnabled={true}           
                source = {{uri : `https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252F223.130.132.180%253A5008%252Flogin%252Foauth%26client_id%3D3324eec2b165a32e8395141fd7675856`}}
                javaScriptEnabled={true}
                injectedJavaScript={runFirst}
                onMessage={event => {
                    LogInProgress(event.nativeEvent['url']);
                }}
            />
        )
    }
    
}

export default KakaoWebView;