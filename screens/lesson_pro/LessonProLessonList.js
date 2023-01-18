import React, { useEffect } from 'react';
import * as RN from 'react-native';
import { View, ImageBackground } from 'react-native';
import styled from "styled-components";
import { CheckBtn, InfoText, Nickname, NicknameBox, TextInput, UpdateButton, InfoSetWrap } from '../../styled-components/lesson_room/LessonProList';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { lessonPro } from '../../api/lessonPro';
import { lessonRoomApi } from '../../api/lessonRoom';
import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    PageButtonOn,
    PageBtnText,
    CommonBoxWrap,
    LayerBox,
    LayerConBoxScroll,
    DimBox,
    LayerBlueBt,
    FontSize16
 } from '../../styled-components/Common';
// import { ProImage } from '../../styled-components/pro_swing/ProSortList';

const LessonRoomList = ( props ) => {   
    const [user, setUser] = React.useState(props.route.params.user);
    const [lessonType, setLessonType] = React.useState("전체");
    const [lessonList, setLessonList] = React.useState([{key: "1", title:"1", state:true, img:'!', tag:["a","b"]},{key: "2", title:"1", state:false, img:'!', tag:["a","b"]},{key: "3", title:"1", state:true, img:'!', tag:["a","b"]}]);

    const [lessonProData, setLessonProData] = React.useState([]);
    const [lessonProProfile, setLessonProProfile] = React.useState({});
    const [lessonProProfileDetail, setLessonProProfileDetail] = React.useState(false);
    const [proSeq, setProSeq] = React.useState(props.route.params.proSeq);
    const [userNo, setUserNo] = React.useState(props.route.params.userNo);
    // const [lessonProList, setLessonProList] = React.useState(null);
    
    let lessonTypeList = ["전체", "슬라이스", "훅", "그립잡기", "어드레스" , "테이크 어웨이", "백스윙", "임팩트", "피니쉬", "스윙템포", "비거리", "모름"];

    const navigation = props.navigation;

    useEffect(async ()=> {
        let proDataList = await lessonPro.selectLessonProDetail({proSeq: proSeq});
        console.log(proDataList);
        proDataList.map((data)=> {
            if (data.fileType === "profilePhoto") {
                setLessonProProfile(data)
            }
        })
        setLessonProData(proDataList)

        let list = []
        list = await lessonRoomApi.selectLessonListPro({proSeq: proSeq})
        console.log(list,"list")
        setLessonList(list)
        // setLessonProList(proList);

    },[])

    
    return (
        <CommonBackground>

            <CommonContainer4 style={styles.CommonContainer4}>
            <TitLarge style={{marginBottom:15}}>레슨 프로</TitLarge>
            <RN.View>
                <CommonBoxWrap flexStart>
                    {
                        lessonProProfile?.proName ?
                            <ProImage source={{uri : `http://223.130.132.180:5009/${lessonProProfile.filePath}`}} />
                        :
                            <ProImage source={require('../../images/img-SortList.png')} />
                    }
                    <View>
                        <PeoText>{lessonProData[0]?.proName} 프로 ({lessonProData[0]?.gender[0]})</PeoText>
                        <PeoText><SpaceText>등</SpaceText>급 : 프로</PeoText>
                        <PeoText>레슨횟수 : {lessonProData[0]?.lessonCnt ? lessonProData[0]?.lessonCnt : 0}회</PeoText>
                        <PeoText>추천횟수 : {lessonProData[0]?.recommndCnt ? lessonProData[0]?.recommndCnt : 0}회</PeoText>
                    </View>
                </CommonBoxWrap>
                <LayerBlueBt style={styles.layerBlueBt} onPress={()=>{
                    setLessonProProfileDetail(true)
                }}><FontSize16 style={{ fontWeight: "400", color:"#fff" }}>프로정보 자세히 보기</FontSize16></LayerBlueBt>
            </RN.View>
                {
                    lessonList ?
                        lessonList.map((data)=>{
                            const {key, title, state, img, tag, lessonArea} = data
                            return(
                                <LessonListBtnContainer key={key}
                                    onPress={()=>
                                        navigation.navigate("LessonProLessonDetail", { data: data })
                                    }
                                >
                                    <View style={{flexDirection:'row'}}>
                                        <Title>{title}</Title>
                                        {
                                            state ?
                                                <OkState><OkStateText>답변완료</OkStateText></OkState>
                                            :
                                                <WaitState><WaitStateText>답변대기</WaitStateText></WaitState>
                                        }
                                    </View>
                                    <ImageContainer>

                                    </ImageContainer>
                                    <View style={{flexDirection:'row', marginLeft: 20}}>
                                        {
                                            lessonArea?.split(",")?.length === 1 ?
                                                <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                            : lessonArea?.split(",")?.length === 2 ?
                                                <>
                                                    <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                    <TagContainer><TagContainerText>{lessonArea.split(",")[1]}</TagContainerText></TagContainer>
                                                </>
                                            :
                                                null
                                        }
                                    </View>
                                </LessonListBtnContainer>
                            )
                        })
                    :
                        null
                }
                <CommonContainer4BottomScale />
            </CommonContainer4>
            {
                lessonProProfileDetail?
                    <>
                        <DimBox>
                            <LayerBox>
                                {
                                    lessonProProfile?.filePath ?
                                        <ProImage3 source={{uri : `http://223.130.132.180:5009/${lessonProProfile.filePath}`}} />
                                    :
                                        <ProImage3 source={require('../../images/img-SortList.png')} />
                                }
                                <LayerConBoxScroll>
                                    <CommonBoxWrap flexStart style={{flexWrap:"wrap", alignItems:"flex-start"}}>
                                        <DtText>&middot; 추천수</DtText>
                                        <DdText>100회</DdText>
                                        <DtText>&middot; 이름</DtText>
                                        <DdText>{lessonProData[0]?.proName} ({lessonProData[0]?.gender[0]})</DdText>
                                        <DtText>&middot; 신청등급</DtText>
                                        <DdText>프로</DdText>
                                        <DtText>&middot; 레슨경력</DtText>
                                        <DdText>{lessonProData[0]?.lessonPeriod}</DdText>
                                        <DtText>&middot; 수상경력</DtText>
                                        <DdText>{lessonProData[0]?.awardsCareer}</DdText>
                                        <DtText>&middot; 강점</DtText>
                                        <DdText>{lessonProData[0]?.strengthPoint01}, {lessonProData[0]?.strengthPoint02}</DdText>
                                        <DtText>&middot; 활동지역</DtText>
                                        <DdText>{lessonProData[0]?.activityArea ? lessonProData[0]?.activityArea : ""}</DdText>
                                        <DtText>&middot; 인스타그램</DtText>
                                        <DdText>{lessonProData[0]?.instagramLink ? lessonProData[0]?.instagramLink : ""}</DdText>
                                        <DtText>&middot; 인스타그램</DtText>
                                        <DdText>{lessonProData[0]?.instagramLink ? lessonProData[0]?.instagramLink : ""}</DdText>
                                        <DtText>&middot; 활동사진</DtText>
                                        <CommonBoxWrap2>
                                            {
                                                lessonList.map((data)=>{
                                                    if (data.fileType === "activityPhotos") {
                                                        const activityPhoto = data.filePath;
                                                        {
                                                            activityPhoto ?
                                                                <ProImage source={{uri : `http://223.130.132.180:5009/${activityPhoto}`}} />
                                                            :
                                                                <ProImage source={require('../../images/img-SortList.png')} />
                                                        }
                                                    }
                                                })
                                            }
                                        </CommonBoxWrap2>
                                        <DtText>&middot; 정면 동영상</DtText>
                                        <CommonBoxWrap2 style={{marginBottom: 45}}>
                                            {
                                                lessonList.map((data)=>{
                                                    if (data.fileType === "movies") {
                                                        const movies = data.filePath;
                                                        {
                                                            movies ?
                                                                                
                                                                <Positionbt>
                                                                    <ProImage4 source={{uri : `http://223.130.132.180:5009/${movies}`}} />
                                                                    <ProImageArrow><ImageBackground source={require('../../images/arrowimg.png')} style={{width:22,height:23}}/></ProImageArrow>
                                                                </Positionbt>
                                                            :
                                                                <ProImage source={require('../../images/img-SortList.png')} />
                                                        }
                                                    }
                                                })
                                            }
                                        </CommonBoxWrap2>
                                        {/*
                                        <CommonBoxWrap2 style={{marginBottom: 45}}>
                                            <Positionbt>
                                                <ProImage4 source={require('../../images/img-SortList.png')} />
                                                <ProImageArrow><ImageBackground source={require('../../images/arrowimg.png')} style={{width:22,height:23}}/></ProImageArrow>
                                            </Positionbt>
                                            <Positionbt>
                                                <ProImage4 source={require('../../images/img-SortList.png')} />
                                                <ProImageArrow><ImageBackground source={require('../../images/arrowimg.png')} style={{width:22,height:25}}/></ProImageArrow>
                                            </Positionbt>
                                        </CommonBoxWrap2>
                                        */}
                                    </CommonBoxWrap>

                                </LayerConBoxScroll>
                                <LayerBlueBt onPress={()=>setLessonProProfileDetail(false)}><FontSize16 style={{ fontWeight: "400", color:"#fff" }}>닫기</FontSize16></LayerBlueBt>
                            </LayerBox>  
                        </DimBox>
                    </>
                :
                    null
            }

            {/* <View style={{backgroundColor: 'white', height: 85}}>
                <PageButtonOn onPress={()=>navigation.navigate("LessonRoomRegist")}><PageBtnText>레슨 신청하기</PageBtnText></PageButtonOn>                          
            </View> */}
        </CommonBackground>      
    )
}

const styles = RN.StyleSheet.create({ // picker Style(selectBox)
    // CommonContainer4: {
    //     paddingTop: 100,
    //     zIndex: 0
    // },
    dropdown1BtnStyle: {
      width: '100%',
      height: 52,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#EBEBEB',
      marginBottom: 40
    },
    dropdown1BtnTxtStyle: {color: '#666666', textAlign: 'left', fontWeight: "400"},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF',borderRadius: 8},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    layerBlueBt: {width: '100%', marginTop: 20, marginBottom: 20},
  });

const ShadowBoxView = styled.TouchableOpacity`
  position:relative;
  margin: 0 0 20px;
  padding: 15px 20px;
  border: 1px solid #EEEEEE;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: #fff;
  z-index: -9999;
  elevation : 0;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
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
const ProImage = styled.Image`
  width: 85px;
  height: 85px;
  marginTop: 2px;
  marginRight: 20px;
  border-radius: 50px;
`
const ProImage2 = styled.Image`
    width: 100%;
    height: 150px;
    margin: 15px 0 10px;
    marginRight: 12px;
    border-radius: 12px;
`
const ProImage3 = styled.Image`
    width: 81px;
    height: 85px;
    margin: 0 auto;
    border-radius: 50px;
`
const ProImage4 = styled.Image`
    width: 102px;
    height: 90px;
    margin-top: 6px;
    margin-bottom: 3px;
    border-radius: 12px;
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
const DtText = styled.Text`
    width: 80px;
    font-size: 14px;
    font-weight: 700;
    line-height: 25px;
    color: #222;
`
const DdText = styled.Text`
    width: 215px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    color: #222;
`
const PeoText = styled.Text`
    font-size: 14px;
    line-height: 22px;
    color: #222;
    font-weight: 400;
`
const SpaceText = styled.Text`
    letter-spacing: 24px;
`

const CommonContainer4TopScale = styled.View`
    position: absolute;
    width: 100%;
    height: 75px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    backgroundColor: #FFFFFF;
    zIndex: 1;
`

const SelectDropdownContainer = styled.View`
    position: absolute;
    width: 100%;
    top: 20px;
    paddingHorizontal: 20px;
    zIndex: 2;
`
const Title = styled.Text`
    height: 20px;
    marginLeft: 20px;
    marginTop: 15px;

    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
`
const OkState = styled.View`
    width: 65px;
    height: 20px;
    left: 10px;
    marginTop: 15px;
    background: #000000;
    borderRadius: 50px;
    justifyContent: center;
    alignItems: center
`

const OkStateText = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
`

const WaitState = styled.View`
    width: 65px;
    height: 20px;
    left: 10px;
    marginTop: 15px;
    background: #B0B0B0;
    borderRadius: 50px;
    justifyContent: center;
    alignItems: center
`

const WaitStateText = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
`

const ImageContainer = styled.Image`
    
    height: 150px;
    marginHorizontal: 20px;
    marginTop: 15px;
    border-radius: 12px;
    background: #d0d0d0
`

const TagContainer = styled.View`
    
    height: 22px;
    marginRight: 10px;
    marginTop: 15px;
    padding: 4px 10px;
    background: #E63312;
    border-radius: 3px;
`

const TagContainerText = styled.Text`
    color: #ffffff
`

const CommonContainer4BottomScale = styled.View`
    height: 100px;
`

const LessonListBtnContainer = styled.TouchableOpacity`
    width: 100%;
    height: 252px;
    marginBottom: 20px;
    
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
`
const ProImageArrow = styled.View`
    position: absolute;
    top: 6px;
    left: 0;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 90px;
    border-radius: 12px;
    background: rgba(0,0,0,.4);
    overflow: hidden;
`
// const CheckBtn = styled.Text`
//     width: 100%
//     height: 60px;
//     padding-top: 21px;
//     border-radius: 12px;
//     margin: 20px 0;
//     overflow: hidden;
//     fontWeight: 400;
//     font-size: 16px;
//     color: #fff;
//     backgroundColor: #171C61;
//     text-align: center;
// `
const Positionbt = styled.TouchableOpacity`
    position: relative;
    margin-top: 2px;
`
const CommonBoxWrap2 = styled.View`
    width: 215px;
    flexWrap: wrap;
    flexDirection: row;
    justifyContent: space-between;
    alignItems: stretch;
`

export default LessonRoomList;