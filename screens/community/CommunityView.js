import React, { useState } from 'react';
import * as RN from 'react-native';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import {
    LoginText,
    TextInput,
    LoginButtonContainer,
    LoginInputContainer,     
} from '../../styled-components/login/Login';
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import { article } from '../../api/article';

const CommunityView = (props) => {

    const [articleData, setArticle] = useState(props.route.params);
    const navigation = useNavigation();
    
    React.useEffect(() => {                

        console.log(props.route);
    },[])

    const deleteArticle = async () => {
        await article.deleteCommunity( articleData.article.articleSeq);
        props.navigation.reset({routes: [{name: 'Community'}]});
    };

    const updateArticle = () => {
        navigation.navigate("CommunityWrite", {article : articleData});
    };

    return (
        <CommonBackground>
            <CommonContainer>
                <LoginInputContainer>
                    <LoginText>제목</LoginText>
                    <TextInput placeholder="제목" placeholderTextColor="#ccc" value={articleData.article.articleTitle} editable={false} >
                    </TextInput>
                    <LoginText>작성자</LoginText>
                    <TextInput placeholder="제목" placeholderTextColor="#ccc" value={articleData.article.nickname} editable={false} >
                    </TextInput>
                    <LoginText>내용</LoginText>
                    <TextInput style={{ height: 150}} placeholderTextColor="#ccc"
                        multiline = {true}
                        numberOfLines = {4}
                        value={articleData.article.articleText} 
                        editable={false} 
                    ></TextInput>
                    {
                        articleData.article.nickname == articleData.userData.nickname ? 
                        <ButtonContainer>
                            <ModifyButton onPress={updateArticle}>
                                <ModifyText style={{ color: '#fff' ,fontSize: 16}}>수정하기</ModifyText>
                            </ModifyButton>

                            <DeleteButton 
                                onPress={()=> {                                    
                                    RN.Alert.alert("정말로 삭제하시겠습니까? ", "" , [
                                        { text: "네", onPress: () => deleteArticle() },
                                        { text: "아니오" }
                                    ])    
                                }}
                            >
                                <DeleteText style={{ color: '#666666' ,fontSize: 16}}>삭제하기</DeleteText>
                            </DeleteButton>
                        </ButtonContainer>
                        :
                        null
                    }
                </LoginInputContainer>                
            </CommonContainer>
        </CommonBackground>
    )

}

const ButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ModifyButton = styled.TouchableOpacity`

    display: flex;
    justify-content: center;
    align-items: center;
    width: 49%;
    height: 60px;
    text-align: center;
    background: #000;
    border-radius: 12px;
`;
const ModifyText = styled.Text`

`;

const DeleteButton = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 49%;
    height: 60px;
    text-align: center;
    background: #DADADA;
    border-radius: 12px;
`;
const DeleteText = styled.Text`

`;


export default CommunityView;