import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { CommonBackground, CommonContainer, PageButton, TitSmall } from '../../styled-components/Common';
import { 
    TextInput,
    TextInputFocus,
    NoticeText
} from '../../styled-components/login/Login';
import { signApi } from '../../api/sign';

const FindPwdStep1 = (props) => { 

    const infoRef = React.useRef();
    const [focus, setFocus] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState('');
    const [infoType, setInfoType] = React.useState('');

    // 이메일 정규표현식 
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 전화번호 정규표현식 
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    const onTextChanged = (info) => {
        if(emailRegExp.test(info)) {
            setFocus(true);
            setInfoType('email_id');
            setUserInfo(info);
        } else if(phoneRegExp.test(info)) {
            setFocus(true);
            setInfoType('phone');
            setUserInfo(info);
        } else {
            setFocus(false);
        }

    }

    const sendMail = async () => {
        
        let result = '';
        if(infoType === 'email_id') {
            checkId = await signApi.checkId(userInfo);
            if(checkId.success) {
                Alert.alert('아이디가 존재하지 않습니다.')
                result = 300;
            } else{
                result = await signApi.sendSMTP(userInfo, infoType);
            }
        } else {
            console.log("phone");
            checkPhoneNumber = await signApi.checkPhoneNumber(userInfo);
            if(checkPhoneNumber) {
                
                Alert.alert('등록된 번호가 없습니다.')
                result = 300;
            }else {
                
                result = await signApi.sendSMS(userInfo, infoType);                
            }
            console.log('slslsl')
        }
        
        if(result === 200) {
            props.navigation.navigate("FindPwdStep2", {userInfo: userInfo, infoType: infoType});
        } else if (result === 300) {
        
        } else {
            Alert.alert('SMS not sent');
        }
    }

    const navigation = props.navigation;
    const goScreen = (screenName) => {
        navigation.navigate(screenName);
    }
    return (    
    <CommonBackground>
        <CommonContainer>
            {/*
            <View>
            <Text onPress={() => goScreen('FindPwdStep2')}>FindPwdStep1</Text>
        </View>
        */}
        <TitSmall style={{ marginTop: 10, marginBottom: 9 }}>이메일 또는 휴대전화번호</TitSmall>
        <TextInput 
        ref={infoRef} 
    
        style={(focus)?{borderColor: "#171C61"}:""}
        onChangeText={(text) => onTextChanged(text)}
        placeholder="이메일 또는 휴대전화번호" placeholderTextColor="#ccc"></TextInput>
        <NoticeText>Goal AI에 가입했던 이메일 또는 전화번호를 입력해주세요. {"\n"}
            인증을 위해 인증번호를 보내드립니다.</NoticeText>
        </CommonContainer>
        {
        (!focus)
        ?<PageButton>인증번호 보내기</PageButton>
        :<PageButton style={{backgroundColor: "#171C62"}} onPress={() => sendMail()}>인증번호 보내기</PageButton>
        }
    </CommonBackground>
    )
}
export default FindPwdStep1;