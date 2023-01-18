import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from "styled-components";

import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    CommonBoxWrap
 } from '../../styled-components/Common';
 import { 
    MyInfo, 
    MyInfoList, 
    MyInfoTitle, 
    MyInfoValue, 
} from '../../styled-components/my_page/MyPage';
import { DetailCloseBtn } from './../../styled-components/analysis_list/AnalysisSwingRear';
import { AntDesign } from '@expo/vector-icons';

const LessonDetail = ({navigation}) => {

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

            getUserData();

        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    

    const [user, setUser] = React.useState(null);

    const getUserData = async() => {
        let userData = null;
        userData = await SecureStore.getItemAsync("userData"); 
        
        if(userData) {
            userData = JSON.parse(userData);
            setUser(userData);
        }else {
            navigation.navigate("Login");
        }
        console.log(user);
    };

    React.useEffect(() => {
        //getUserData();
    },[])

    const refCont = React.useRef();
    const [contents, setContents] = React.useState();

    return (
        <CommonBackground>
            <CommonContainer4>
                <CommonBoxWrap flexStart>
                    <TitLarge>1회차 레슨</TitLarge>
                    <IconText bgColor={"#000"}>답변완료</IconText>
                </CommonBoxWrap>
                <MyInfo style={{marginTop: 15}}>
                    <MyInfoList>
                        <MyInfoTitle>구력</MyInfoTitle>
                        <MyInfoValue>
                        {user != null && user.career != null && user.career != "null" ? user.career  : "정보없음"}                                    
                        </MyInfoValue>
                    </MyInfoList>
                    <MyInfoList>
                        <MyInfoTitle>나이</MyInfoTitle>
                        <MyInfoValue> 
                            30살                
                        </MyInfoValue>
                    </MyInfoList>
                    <MyInfoList>
                        <MyInfoTitle>드라이버 거리</MyInfoTitle>
                        <MyInfoValue>
                        {user != null && user.driver_distance != null && user.driver_distance != "null" ? user.driver_distance  : "정보없음"}                                    
                        </MyInfoValue>
                    </MyInfoList>
                    <MyInfoList>
                        <MyInfoTitle>아이언 거리</MyInfoTitle>
                        <MyInfoValue>
                            100M                                    
                        </MyInfoValue>
                    </MyInfoList>
                </MyInfo>
                <CommonBoxWrap>
                    <ProImage source={require('../../images/img-SortList.png')} />
                    <ProImage source={require('../../images/img-SortList.png')} />
                </CommonBoxWrap>
                <CommonBoxWrap flexStart style={{marginTop:10, marginBottom:15}}>
                    <Hashtag>테이크 어웨이</Hashtag>
                    <Hashtag>그립잡기</Hashtag>
                </CommonBoxWrap>
                <TextInput style={{ textAlignVertical: "top", height: 150, marginBottom: 25}} placeholder="내용" placeholderTextColor="#ccc" onChangeText={(text)=>setContents(text)}
                    ref={refCont}
                    value={contents}
                    multiline = {true}
                    numberOfLines = {4}
                    underlineColorAndroid="transparent"
                ></TextInput>

                <CommonBoxWrap flexStart>
                    <TitLarge>프로의 코칭</TitLarge>
                </CommonBoxWrap>
                <CommonBoxWrap>
                    <ProImage source={require('../../images/img-SortList.png')} />
                    <ProImage source={require('../../images/img-SortList.png')} />
                </CommonBoxWrap>
                <TextInput style={{ textAlignVertical: "top", height: 150, marginTop: 15, marginBottom: 25}} placeholder="내용" placeholderTextColor="#ccc" onChangeText={(text)=>setContents(text)}
                    ref={refCont}
                    value={contents}
                    multiline = {true}
                    numberOfLines = {4}
                    underlineColorAndroid="transparent"
                ></TextInput>
                
                <CommonBoxWrap style={{marginBottom: 15}}>
                    <TitLarge>레슨 추천하기</TitLarge>
                    <TouchableOpacity>
                        {/* 추천 버튼 클릭 : recomm_on.png */}
                        <RecommImage source={require('../../images/recomm_off.png')} />
                    </TouchableOpacity>
                </CommonBoxWrap>
                
                <VideoBtnBox>
                    <SaveBtn>
                        <BtnText onPress={()=>{}} style={{color : "#666"}}>목록가기</BtnText>                 
                    </SaveBtn>
                    <AppendBtn>
                        <BtnText>프로와 채팅하기</BtnText>                 
                    </AppendBtn>
                </VideoBtnBox>
            </CommonContainer4>
        </CommonBackground>
    )
};

const ProImage = styled.Image`
    width: 160px;
    height: 150px;
    border-radius: 12px;
`
const IconText = styled.Text`
    height: 22px;
    margin-left: 10px;
    padding: 5px 10px 0;
    font-size: 12px;
    color: #fff;
    background: ${props => props.bgColor || '#B0B0B0'};
    border-radius: 11px;
    overflow: hidden;
`
const Hashtag = styled.Text`
    height: 22px;
    margin: 5px 10px 0 0;
    padding: 5px 10px 0;
    font-size: 12px;
    color: #fff;
    background: #E63312;
    border-radius: 3px;
    overflow: hidden;
`
const CommonBoxWrap2 = styled(CommonBoxWrap)`
    marginVertical: 15px;
`
const TextInput = styled.TextInput`
    position: relative;
    width: 100%;
    height: 52px;
    margin-bottom: 40px;
    padding: 14px 18px;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
`
const VideoBtnBox = styled.View`
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: flex-start;
    padding: 0 20px;
    width:100%;
    height:120px;
`
const SaveBtn = styled.TouchableOpacity`
    display:flex;
    justify-content: center;
    width: 165px;
    height:60px;
    border-radius: 12px;
    background-color: #DADADA;
`
const AppendBtn = styled.TouchableOpacity`
    display:flex;
    justify-content: center;
    width: 165px;
    height:60px;
    border-radius: 12px;
    background-color: #000;
    margin-left: 5px;
`
const BtnText = styled.Text`
    font-size: 16px;
    text-align: center;
    color:#fff;
    font-weight: 700;    
`
const InfoText = styled.Text`
    margin-top: 15px;
    margin-bottom: 9px;
    font-size: 14px;
    font-weight: 600;
    color: #1E1E1E;
`
const RecommImage = styled.Image`
    width: 20px;
    height: 17px;
`

export default LessonDetail;

