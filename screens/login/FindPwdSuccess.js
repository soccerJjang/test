import React from 'react';
import { View, Text, Button } from 'react-native';
import { CommonBackground, CommonContainer, PageButtonOn, TitLarge } from '../../styled-components/Common';
import { 
    JoinSuccessImg,
} from '../../styled-components/login/Login';
const FindPwdSuccess = (props) => {
    const navigation = props.navigation;
    const goScreen = (screenName) => {
        navigation.navigate(screenName);
    }
    return (
        <CommonBackground>
            <CommonContainer>
                <JoinSuccessImg source={require('../../images/img-FindPwdStep3.png')}/>
            <TitLarge style={{ textAlign:"center" }}>비밀번호 재설정이{"\n"}
            완료되었습니다.</TitLarge>
            </CommonContainer>
            <PageButtonOn 
            onPress={() => props.navigation.navigate("Login")}
            style={{ elevation: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }} >로그인 바로가기</PageButtonOn>
        </CommonBackground>
    )
}

export default FindPwdSuccess;