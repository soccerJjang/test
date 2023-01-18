import * as React from 'react';
import * as RN from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import { SettingButton } from '../../styled-components/my_page/Setting';
import axios from 'axios';

const Setting = (props) => {
    
    const [kakaoAccessToken, setKakaoAccessToken] = React.useState(null);
    const [naverAccessToken, setNaverAccessToken] = React.useState(null);
    const [user, setUser] = React.useState(null);

    const signOut = async({navigation}) => {
        if(kakaoAccessToken !== null) {
            console.log("카카오 로그아웃");
            axios({
                method: 'POST',
                url: 'https://kapi.kakao.com/v1/user/unlink',
                headers: {
                    'Authorization': 'Bearer ' + kakaoAccessToken
                }
            })
            .then((res) => {
                console.log(res);
            })
            .then(async () => {
                await SecureStore.deleteItemAsync('kakaoAccessToken');
            })
        }
    
        if(naverAccessToken !== null) {

            console.log("네이버 로그아웃");
            axios({
                method: 'POST',
                url: `https://nid.naver.com/oauth2.0/token?`,
                body: {
                    'grant_type' : 'delete',
                    'client_id' : 'FOPJaE0owM4LGLk8kHQa',
                    'client_secret' : 'Y8BxsDLg_w',
                    'access_token' : naverAccessToken,
                }
            })
            .then(res => {
                console.log(res);
            })
            .then(async () => {
                await SecureStore.deleteItemAsync('naverAccessToken');
            })
        }
    
        try {
            await SecureStore.deleteItemAsync('remember')
            await SecureStore.deleteItemAsync('login')
            await SecureStore.deleteItemAsync('userData')
            await SecureStore.deleteItemAsync('snsInfo')
            await SecureStore.deleteItemAsync('naverAccessToken')
            await SecureStore.deleteItemAsync('kakaoAccessToken')
            .then(navigation.navigate("SplashScreen"))
            .catch(error => console.log('not delete' + error));
            
        } catch(e) {
            console.log(e);
        }
    }

    const deleteUser = () => {


        RN.Alert.alert(
            "정말로 탈퇴하시겠습니까?",
            ""
            ,
            [
            {
                text: "네",
                onPress: () => {

                    if(user != null && user.user_no ) {
                        console.log(user.user_no)
            
                        console.log(user);
                        axios({
                            method: 'DELETE',
                            url: `http://223.130.132.180:5008/login/delete`,
                            data: {
                                userNo : user.user_no
                            }
                        })
                        .then(res => {
                            console.log(res);
                        })
                        .then(async () => {
                            signOut(props);
                        })
            
                    }
                },            
            },
            {
                text: "아니오",                
                style: "cancel",
            },
            ],            
        );            

        
        


    }

    React.useEffect(async() => {
        const getKakaoAccessToken = await SecureStore.getItemAsync('kakaoAccessToken');
        const getNaverAccessToken = await SecureStore.getItemAsync('naverAccessToken');
        const user = await SecureStore.getItemAsync('userData');
        setKakaoAccessToken(getKakaoAccessToken);
        setNaverAccessToken(getNaverAccessToken);
        setUser(JSON.parse(user));

    }, [])
    
    return (
        <CommonBackground>
            <CommonContainer>
                <SettingButton onPress={() => signOut(props)}>로그아웃</SettingButton>
                <SettingButton style={{marginTop: 100}} onPress={() => deleteUser()}>계정 탈퇴</SettingButton>
            </CommonContainer>
        </CommonBackground>
    )
}

export default Setting;