import React from 'react';
import * as RN from 'react-native';
import { CommonBackground, CommonContainer, PageButton } from '../../styled-components/Common';
import { CommonActions } from '@react-navigation/native';
import { signApi } from '../../api/sign';
import { 
    LoginText,
    TextInput,
    LoginInputContainer
} from '../../styled-components/login/Login';
const FindPwdStep3 = (props) => {

    const { userInfo, infoType } = props.route.params;
    const [updatePwd, setUpdatePwd] = React.useState('');
    const [confirmPwd, setConfirmPwd] = React.useState('');

    const pwdUpdate = async () => {
        if (updatePwd !== confirmPwd) { 
            RN.Alert.alert("비밀번호 확인이 일치하지 않습니다.");
            return false;
        }   
        const result = await signApi.pwdUpdate(userInfo, infoType, updatePwd);
        if(result === 200) {
            props.navigation.dispatch(
                CommonActions.reset({
                    routes: [
                                {
                                    name: 'FindPwdSuccess',
                                }
                            ]
                        }) 
                    )
        }
    }

    const navigation = props.navigation;
    const goScreen = (screenName) => {
        navigation.navigate(screenName);
    }
    return (
        <CommonBackground>
            <CommonContainer>
                {/*<View><Text onPress={() => goScreen('FindPwdSuccess')}>FindPwdStep3</Text></View>*/}
                    <LoginInputContainer>
                        <LoginText>비밀번호</LoginText>
                        <TextInput style={{ marginBottom: 24 }} placeholder="비밀번호" placeholderTextColor="#ccc"
                        onChangeText={(text) => setUpdatePwd(text)}></TextInput>
                        <LoginText>비밀번호확인</LoginText>
                        <TextInput style={{ marginBottom: 18 }} placeholder="비밀번호 확인" placeholderTextColor="#ccc"
                        onChangeText={(text) => setConfirmPwd(text)}
                        ></TextInput>
                    </LoginInputContainer>
            </CommonContainer>
            <PageButton onPress={() => pwdUpdate()}>비밀번호 재설정</PageButton>
        </CommonBackground>
        
    )
}

export default FindPwdStep3;