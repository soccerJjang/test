import React from 'react';
import * as RN from 'react-native';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import {
    LoginText,
    TextInput,
    LoginButtonContainer,
    LoginInputContainer,     
} from '../../styled-components/login/Login';
import { article } from '../../api/article';
import * as SecureStore from 'expo-secure-store';
import { sub } from 'react-native-reanimated';
import { useRoute } from '@react-navigation/native';

const CommunityWrite = (props) => {

    const route = useRoute();
    const [beforeArticle, setBeforeArticle] = React.useState(route.params != null ? route.params.article : null);

    const refSub = React.useRef();
    const refCont = React.useRef();

    const [subject, setSubject] = React.useState(beforeArticle != null && beforeArticle.article != undefined ? beforeArticle.article.articleTitle : "");
    const [contents, setContents] = React.useState(beforeArticle != null && beforeArticle.article != undefined ? beforeArticle.article.articleText : "");

    const [userData, setUserData] = React.useState();

    React.useEffect(() => {
        (async () => {
            let getUserData = null;
            getUserData = await SecureStore.getItemAsync("userData"); 
            setUserData(JSON.parse(getUserData));

        })();

        console.log(route.params);
    }, [])

    const insertCommunity = async () => {
 
        if(subject === '' ||  subject == undefined) {
            alert('제목을 입력해주세요.');
            return false;
        }

        if(contents === '' || contents == undefined) {
            alert('내용을 입력해주세요.');
            return false;
        }
        
        await article.insertCommunity(subject, contents, userData.user_no);
        alert("작성 완료했습니다.")
        props.navigation.reset({routes: [{name: 'Community'}]});
    }

    const updateCommunity = async () => {

        console.log("subect : ", subject);
        console.log("contents : ", contents);

        if(subject === '') {
            alert('제목을 입력해주세요.');
            return false;
        }

        if(contents === '') {
            alert('내용을 입력해주세요.');
            return false;
        }
        
        await article.updateCommunity(subject, contents, beforeArticle.article.articleSeq);
        alert("수정 완료했습니다.")
        props.navigation.reset({routes: [{name: 'Community'}]});
    }

return (
    <CommonBackground>
        <CommonContainer>
            <LoginInputContainer>
                <LoginText>제목</LoginText>
                <TextInput 
                    placeholder="제목" 
                    placeholderTextColor="#ccc" 
                    onChangeText={(text)=>setSubject(text)} 
                    defaultValue={ beforeArticle != null && beforeArticle.article != undefined ? beforeArticle.article.articleTitle : "" }
                    ref={refSub}    
                >
                </TextInput>
                <LoginText>내용</LoginText>
                <TextInput 
                    style={{ height: 150}} 
                    placeholder="내용" 
                    placeholderTextColor="#ccc" 
                    onChangeText={(text)=>setContents(text)}
                    ref={refCont}
                    multiline = {true}
                    numberOfLines = {4}
                    underlineColorAndroid="transparent"
                    defaultValue={ beforeArticle != null && beforeArticle.article != undefined ? beforeArticle.article.articleText : "" }
                >                    
                </TextInput>
            </LoginInputContainer>
            {
                beforeArticle == null ?
                <RN.TouchableOpacity onPress={() => insertCommunity()}><LoginButtonContainer>작성하기</LoginButtonContainer></RN.TouchableOpacity>
                :
                <RN.TouchableOpacity onPress={() => updateCommunity()}><LoginButtonContainer>수정하기</LoginButtonContainer></RN.TouchableOpacity>
            }
            
        </CommonContainer>
    </CommonBackground>
)

}
export default CommunityWrite;