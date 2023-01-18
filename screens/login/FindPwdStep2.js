import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { CommonBackground, CommonContainer, PageButton, TitSmall } from '../../styled-components/Common';
import { 
    NumInputdBox,
    NumInput,
    NumInputError,
    ErrorMessage,
    ErrorMessageIcon
} from '../../styled-components/login/Login';
import { signApi } from '../../api/sign';

const FindPwdStep2 = (props) => {

    const { userInfo, infoType } = props.route.params;

    const [button, setButton] = React.useState(false);
    const [verify, setVerify] = React.useState(null);
    const [verifyNum, setVerifyNum] = React.useState(['','','','','','']);

    const verify1 = React.useRef();
    const verify2 = React.useRef();
    const verify3 = React.useRef();
    const verify4 = React.useRef();
    const verify5 = React.useRef();
    const verify6 = React.useRef();

    const [style, setStyle] = React.useState({
        marginRight: 17, borderBottomWidth: 1, borderBottomColor: '#000', borderStyle: 'solid'
    })
    const [lastStyle, setLastStyle] = React.useState({
        borderBottomWidth: 1, borderBottomColor: '#000', borderStyle: 'solid' 
    })
    const verifyError = () => {
        setStyle({ marginRight: 17, borderBottomWidth: 1, borderBottomColor: '#E63312', borderStyle: 'solid' });
        setLastStyle({ borderBottomWidth: 1, borderBottomColor: '#E63312', borderStyle: 'solid' });
    }

    const verifySMS = async() => {
        let verifyCode = ''
        for (var i = 0; i < verifyNum.length; i++) {
            if(verifyNum[i] !== '') {
                verifyCode += verifyNum[i];
            }
        }        
        const result = await signApi.verifySMS(userInfo, infoType, verifyCode);

        if(result === 404) {
            verifyError();
            setVerify(false);
        }

        if(result === 200) {
            props.navigation.dispatch(
                CommonActions.reset({
                    routes: [
                                {
                                    name: 'FindPwdStep3',
                                    params: { userInfo: userInfo, infoType: infoType }
                                }
                            ]
                        }) 
                    )
        }
    }

    
    const setFocus = (text, idx, prevRef, nextRef) => {
        var i = 0;
        if(text.length == 1) {
            nextRef.current?.focus();
        }
        if(text.length == 0) {
            prevRef.current?.focus();
        }
        var newVerifyArr = [...verifyNum];
        newVerifyArr[idx] = text;
        setVerifyNum(newVerifyArr);
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
            <Text onPress={() => goScreen('FindPwdStep3')}>FindPwdStep2</Text>
        </View>
        */}
        <TitSmall style={{ marginTop: 10, marginBottom: 9 }}>등록된 휴대폰 번호로 보내드린 인증번호를{"\n"}입력해주세요.</TitSmall>
        <NumInputdBox>
            <NumInput style={style}
            ref={verify1}
            onChangeText={(text) => setFocus(text, 0, verify1, verify2)}
            maxLength={1}
            keyboardType="number-pad"
            ></NumInput>
            <NumInput style={style}
            ref={verify2}
            onChangeText={(text) => setFocus(text, 1, verify1, verify3)}
            maxLength={1}
            keyboardType="number-pad"
            ></NumInput>
            <NumInput style={style}
            ref={verify3}
            onChangeText={(text) => setFocus(text, 2, verify2, verify4)}
            maxLength={1}
            keyboardType="number-pad"
            ></NumInput>
            <NumInput style={style}
            ref={verify4}
            onChangeText={(text) => setFocus(text, 3, verify3, verify5)}
            maxLength={1}
            keyboardType="number-pad"
            ></NumInput>
            <NumInput style={style}
            ref={verify5}
            onChangeText={(text) => setFocus(text, 4, verify4, verify6)}
            maxLength={1}
            keyboardType="number-pad"
            ></NumInput>
            <NumInput style={lastStyle}
            ref={verify6}
            onChangeText={(text) => setFocus(text, 5, verify5, verify6)}
            maxLength={1}
            keyboardType="number-pad"
            ></NumInput>
        </NumInputdBox>
            {
            (verify === false)
            ?<ErrorMessage style={{ marginTop: 0 }}>
            <ErrorMessageIcon><Image style={{ width: '100%', height: '100%' }} source={require('../../images/ico-errorMessage.png')}/></ErrorMessageIcon>
            <View style={{width: 5}}></View>
            <Text style={{fontSize: 12, fontWeight: '400', color: '#E63312' }}>일치하지 않습니다.</Text>
        </ErrorMessage>
            :null
            }
        </CommonContainer>
        <PageButton style={(button)?{backgroundColor:"#171C61"}:""} onPress={() => verifySMS()}>인증번호 보내기</PageButton>
    </CommonBackground>
    )
}

export default FindPwdStep2;