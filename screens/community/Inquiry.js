import React from 'react';
import * as RN from 'react-native';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import {
    LoginText,
    TextInputWrap,
    TextInput,
    TextInputBox,
    TextInputInner,
    BottomTextContainer,
    JoinPwd,
    LoginButtonContainer,
    LoginInputContainer,     
    AutoLogin,
    IcoCircle,
} from '../../styled-components/login/Login';
import { article } from '../../api/article';
import * as SecureStore from 'expo-secure-store';
import { sub } from 'react-native-reanimated';

const Inquiry = (props) => {
    const refSub = React.useRef();
    const refCont = React.useRef();

    const [subject, setSubject] = React.useState();
    const [contents, setContents] = React.useState();

    const [userData, setUserData] = React.useState();

    React.useEffect(() => {
        (async () => {
            let getUserData = null;
            getUserData = await SecureStore.getItemAsync("userData"); 
            setUserData(JSON.parse(getUserData));
        })();
    })

    const insertInquiry = async() => {
        if(subject === '') {
            alert('제목을 입력해주세요.');
            return false;
        }

        if(contents === '') {
            alert('내용을 입력해주세요.');
            return false;
        }

        (async () => {
            await article.insertInquiry(subject, contents, userData.user_no).then(res => {
                if(res.message === 'success') {
                    alert('등록되었습니다.');
                    setSubject('');
                    setContents('');
                }
            })
        })();
    }

return (
    <CommonBackground>
        <CommonContainer>
            <LoginInputContainer>
                <LoginText>제목</LoginText>
                <TextInput placeholder="제목" placeholderTextColor="#ccc" onChangeText={(text)=>setSubject(text)}
                    ref={refSub}    
                    value={subject}
                >
                </TextInput>
                <LoginText>내용</LoginText>
                <TextInput style={{ textAlignVertical: "top", height: 150}} placeholder="내용" placeholderTextColor="#ccc" onChangeText={(text)=>setContents(text)}
                    ref={refCont}
                    value={contents}
                    multiline = {true}
                    numberOfLines = {4}
                    underlineColorAndroid="transparent"
                ></TextInput>
            </LoginInputContainer>

            <RN.TouchableOpacity onPress={() => insertInquiry()}><LoginButtonContainer>문의하기</LoginButtonContainer></RN.TouchableOpacity>
        </CommonContainer>
    </CommonBackground>
)

}
export default Inquiry;