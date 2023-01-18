import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity , Button, NativeModule, Dimensions, Modal, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { signApi, snsApi } from '../../api/sign';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import {
    LoginText,
    TextInputWrap,
    TextInput,
    BottomTextContainer,
    JoinPwd,
    LoginButtonContainer,
    LoginInputContainer,     
    AutoLogin,
    IcoCircle,
    SnsContainer,
    ImgKakao,
    ImgNaver,
} from '../../styled-components/login/Login';
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import axios from 'axios';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwtDecode from 'jwt-decode';
import { CommonActions } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

const Login = (props) => {

    const refId = useRef();
    const refPwd = useRef();

    const [remember, setRemember] = useState(false);
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');


    const kakaoUnlink = async() => {
        const kakaoAccessToken = await SecureStore.getItemAsync('kakaoAccessToken');

        axios({
            method: 'POST',
            url: 'https://kapi.kakao.com/v1/user/unlink',
            headers: {
                'Authorization': `Bearer ${kakaoAccessToken}`
            }
        })
        .then((res) => {
            console.log(res);
        })
    }
    const goLogin = async() => {
        if(id && pwd) {  
                const result = await signApi.login({id,pwd})

                if(Array.isArray(result)) {
                    
                    try {
                        if(remember !== false) {
                            SecureStore.setItemAsync(
                                'remember','Y'
                            )
                        }
                        SecureStore.setItemAsync(
                            'login','Y'
                        );
                        SecureStore.setItemAsync(
                            'userData',
                            (JSON.stringify(result[0]))
                        );
                    } catch(e) {
                        console.log(e);
                    }
                    props.navigation.navigate("HomeDraw", {screen: "AnalysisListStack"});
                }else if(typeof result === "object" && result.reason === "not-pro"){    
                    Alert.alert("프로 계정은 관리자 승인 이후에 로그인 가능합니다.");
                }else {
                    Alert.alert('아이디가 혹은 비밀번호가 틀립니다.');
                }

        }else {
            Alert.alert('아이디가 존재하지 않습니다.');
        }
    }

    return (
        <CommonBackground>
            <CommonContainer>
                    <LoginInputContainer>
                        <LoginText>이메일</LoginText>
                        <TextInput placeholder="이메일" placeholderTextColor="#ccc" onChangeText={(text)=>setId(text)}
                            ref={refId}    
                        >
                        </TextInput>
                        <LoginText>비밀번호</LoginText>
                        <TextInput placeholder="비밀번호" placeholderTextColor="#ccc" onChangeText={(text)=>setPwd(text)} secureTextEntry={true}
                            ref={refPwd}
                        ></TextInput>
                    </LoginInputContainer>
                    <BottomTextContainer>
                        <AutoLogin onPress={() => {(setRemember(!remember))}}>
                        {remember ? 
                        <>
                        <IcoCircle><Image style={{ width: '100%', height: '100%' }} source={require('../../images/ico_Circle_Check.png')}/></IcoCircle><View style={{ width: 9 }}/><Text style={{color:"#222"}}>자동로그인</Text>
                        </> : 
                        <><IcoCircle><Image style={{ width: '100%', height: '100%' }} source={require('../../images/ico_Circle.png')}/></IcoCircle><View style={{ width: 9 }}/><Text style={{color:"#666"}}>자동로그인</Text></>
                        }
                        </AutoLogin>
                        <JoinPwd>
                            <TouchableOpacity onPress={() => props.navigation.navigate('FindPwdStep1')}><Text>비밀번호 찾기</Text></TouchableOpacity>
                            <View style={{ width: 16 }}></View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Join')}><Text>회원가입</Text></TouchableOpacity>                            
                        </JoinPwd>
                    </BottomTextContainer>
                    <TouchableOpacity onPress={() => goLogin(props)}><LoginButtonContainer>로그인</LoginButtonContainer></TouchableOpacity>



                    
{/*               */}      
                    <SnsContainer>
                        <TouchableOpacity onPress={() => props.navigation.navigate('KakaoWebView')}><ImgKakao source={require('../../images/img-kakao.png')}><Image style={{ width: '100%', height: '100%' }} source={require('../../images/img-kakao.png')}/></ImgKakao></TouchableOpacity>
                        <TouchableOpacity onPress={()=> props.navigation.navigate('NaverWebView')}><ImgNaver style={{marginLeft:16}}><Image style={{ width: '100%', height: '100%' }}  source={require('../../images/img-naver.png')}/></ImgNaver></TouchableOpacity>                                                                                                        
                        {
                            
                            Platform.OS == 'ios'  ?
                                <AppleAuthentication.AppleAuthenticationButton
                                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                    cornerRadius={100}
                                    style={{ width: 60, height: 63, marginLeft: 16 }}
                                    onPress={async () => {
                                    try {
                                        const credential = await AppleAuthentication.signInAsync({
                                        requestedScopes: [
                                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                        ],
                                        }).then(data => {                                                                                    
                                            let decodedIdentityToken = jwtDecode(data.identityToken);

                                            console.log("testVal=", decodedIdentityToken);

                                            (async() => {
                                                await SecureStore.setItemAsync('snsInfo', JSON.stringify({id : decodedIdentityToken.email , snsType : "apple"}))
                                                const res = await snsApi.snsIdChk(decodedIdentityToken.email);
                                
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
                                        // signed in
                                    } catch (e) {
                                        if (e.code === 'ERR_CANCELED') {
                                        // handle that the user canceled the sign-in flow
                                        } else {
                                        // handle other errors
                                        }
                                    }
                                    }}
                                />
                            :
                            null                            
                        }                        
                    </SnsContainer>  
                    
                   
                    {/* <SnsContainer>                                                                          
                        <TouchableOpacity onPress={() => clientSocket()}><Text>소켓</Text></TouchableOpacity>
                    </SnsContainer> */}
            </CommonContainer>
        </CommonBackground>
    )
}
export default Login;