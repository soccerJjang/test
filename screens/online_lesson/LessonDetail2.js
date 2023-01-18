import React from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import styled from "styled-components";

import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    CommonBoxWrap,
    TitMiddle,
    CheckBtn,
    CheckBtnW,
    CheckBtnWBox
 } from '../../styled-components/Common';

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
        <>
            <CommonBackground>
                <CommonContainer4>
                    <TitLarge>온라인 레슨</TitLarge>
                    <TitMiddleMg style={{marginTop: 25}}>스윙영상 업로드</TitMiddleMg>
                    <CommonBoxWrap>
                        <Positionbt>
                            <ProImage source={require('../../images/img-SortList.png')} />
                            <ProImageDel><ImageBackground source={require('../../images/del_btn.png')} style={{width:16,height:16}}/></ProImageDel>
                        </Positionbt>
                        <Positionbt>
                            <ProImage source={require('../../images/img-SortList.png')} />
                            <ProImageDel><ImageBackground source={require('../../images/del_btn.png')} style={{width:16,height:16}}/></ProImageDel>
                        </Positionbt>
                    </CommonBoxWrap>
                    <TitMiddleMg style={{marginBottom:5}}>&middot; 레슨이 필요한 영역을 선택해주세요.(필수)</TitMiddleMg>
                    <CommonBoxWrap2>
                        <Hashtag>슬라이드</Hashtag>
                        <Hashtag>훅</Hashtag>
                        <Hashtag choice>그립잡기</Hashtag>
                        <Hashtag>어드레스</Hashtag>
                        <Hashtag choice>테이크 어웨이</Hashtag>
                        <Hashtag>백스윙</Hashtag>
                        <Hashtag>임팩트</Hashtag>
                        <Hashtag>피니쉬</Hashtag>
                        <Hashtag>스윙템포</Hashtag>
                        <Hashtag>비거리</Hashtag>
                        <Hashtag>모름</Hashtag>
                    </CommonBoxWrap2>
                    <TitMiddleMg>추가로 알아야 할 사항</TitMiddleMg>
                    <TextInput 
                        style={{ textAlignVertical: "top", height: 150,}} 
                        placeholder="추가로 궁금한 사항에 대해서 자세히 작성해주세요.&#10;예) 오른손에 힘이 너무 들어가서 임팩트가 잘 맞지 않아 고민입니다."
                        placeholderTextColor="#ccc" onChangeText={(text)=>setContents(text)}
                        ref={refCont}
                        value={contents}
                        multiline = {true}
                        // numberOfLines = {4}
                        underlineColorAndroid="transparent"
                    ></TextInput>
                    <TitMiddleMg>프로 선택하기</TitMiddleMg>
                    <CommonBoxWrap>
                        <ProChoice>
                            <ProChoiceImage source={require('../../images/img-SortList.png')} />
                            <ProChoiceText name>강소율 프로</ProChoiceText>
                            <ProChoiceText>추천횟수 : 100회</ProChoiceText>
                        </ProChoice>
                        <ProChoice>
                            <ProChoiceImage source={require('../../images/img-SortList.png')} />
                            <ProChoiceText name>권민경 프로</ProChoiceText>
                            <ProChoiceText>추천횟수 : 100회</ProChoiceText>
                        </ProChoice>
                    </CommonBoxWrap>
                    <TouchableOpacity onPress={()=>{}} style={{width: '100%', position: 'relative'}}>
                        <CheckBtn blueBtn>프로찾기</CheckBtn>
                        <ProImageMore><ImageBackground source={require('../../images/more_btn.png')} style={{width:24,height:24}}/></ProImageMore>
                    </TouchableOpacity> 
                    <CheckBtnWBox onPress={()=>{}} >
                        <CheckBtnW>가나다 프로</CheckBtnW>
                        <ProImageMore><ImageBackground source={require('../../images/del_btn2.png')} style={{width:24,height:24}}/></ProImageMore>
                    </CheckBtnWBox>
                    <TitMiddleMg>레슨 선택하기</TitMiddleMg>
                    <ProListContainer>
                        <ShadowBoxView>
                            <LessonText lessontit>일반레슨 : 15,000 포인트</LessonText>
                            <LessonText>(신청 후 2일 이내 답변을 받아보실 수 있습니다.)</LessonText>
                            <ProImageArrow><ImageBackground source={require('../../images/arrow_bg.png')} style={{width:24,height:24}}/></ProImageArrow>
                        </ShadowBoxView>
                        <ShadowBoxView green>
                            <LessonText lessontit>긴급레슨 : 20,000 포인트</LessonText>
                            <LessonText>(근무시간 1시간 이내 답변을 받아보실 수 있습니다.)</LessonText>
                            <ProImageArrow><ImageBackground source={require('../../images/arrow_bg.png')} style={{width:24,height:24}}/></ProImageArrow>
                        </ShadowBoxView>
                    </ProListContainer>
                </CommonContainer4>
            </CommonBackground>
            {/* <DimBox> 
                <LayerBox>
                    <LayerConBox style={{ marginTop: 15 }}><CenterText>보유 중인 포인트가 부족합니다.{'\n'}
                        레슨을 위해 충전을 해주시기 바랍니다.</CenterText></LayerConBox>
                    <LayerBlueBt><FontSize16 style={{ fontWeight:"400", color: "#fff" }}>포인트 충전</FontSize16></LayerBlueBt>
                    <DetailCloseBtn><AntDesign onPress={() => {}} name="close" size={24} color="#000" />닫기</DetailCloseBtn>
                </LayerBox>   
            </DimBox> */}
        </>
    )
};

const ProImage = styled.Image`
    width: 160px;
    height: 150px;
    border-radius: 12px;
`
const TextInput = styled.TextInput`
    position: relative;
    width: 100%;
    height: 52px;
    padding: 14px 18px;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
`
const Positionbt = styled.View`
    position: relative;
`
const ProImageDel = styled.TouchableOpacity`
    position: absolute;
    top: 5px;
    right: 5px;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    overflow: hidden;
`
const TitMiddleMg = styled(TitMiddle)`
    margin: 25px 0 15px;
`
const CommonBoxWrap2 = styled.View`
    flexWrap: wrap;
    flexDirection: row;
    justifyContent: flex-start;
    alignItems: stretch;
    margin-left: -10px;
`
const Hashtag = styled.Text`
    width: 105px;
    height: 35px;
    line-height: 35px;
    margin: 10px 0 0 10px;
    font-size: 12px;
    color: ${props => props.choice ? '#fff' : '#222'};
    text-align: center;
    background: ${props => props.choice ? '#E63312' : '#DADADA'};
    border-radius: 5px;
    overflow: hidden;
`
const ProChoice = styled.View`
    width: 50%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 15px;
`
const ProChoiceImage = styled.Image`
    width: 107px;
    height: 107px;
    margin-bottom: 10px;
    border-radius: 50px;
`
const ProChoiceText = styled.Text`
    width: 100%;
    font-size: 14px;
    line-height: 20px;
    font-weight: ${props => props.name ? '700' : '400'};
    color: ${props => props.name ? '#000' : '#777'};
    text-align: center;
`
const ProImageMore = styled.View`
    position: absolute;
    top: 16px
    right: 14px;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    overflow: hidden;
`
const ProListContainer = styled.View`
    paddingBottom: 50px;
`
const ShadowBoxView = styled.TouchableOpacity`
    position:relative;
    margin: 0 0 15px;
    padding: 32px 20px;
    border: 1px solid #EEEEEE;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background: ${props => props.green ? '#5CEEA7' : '#fff'};
    z-index: -9999;
    elevation : 0;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
`
const LessonText = styled.Text`
    font-size: ${props => props.lessontit ? '20px' : '12px'};
    line-height: ${props => props.lessontit ? '32px' : '14px'};
    font-weight: ${props => props.lessontit ? '700' : '400'};
    margin-bottom: ${props => props.lessontit ? '10px' : '0'};
    color: #222;
`
const ProImageArrow = styled.View`
    position: absolute;
    top: 48px
    right: 10px;
    width: 24px;
    height: 24px;
    overflow: hidden;
`

export default LessonDetail;

