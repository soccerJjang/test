import React, { useEffect, useRef } from 'react';
import * as RN from 'react-native';
import { View } from 'react-native';
import styled from "styled-components";
import uuid from 'react-native-uuid';
import { CheckBtn, InfoText, Nickname, NicknameBox, TextInput, UpdateButton, InfoSetWrap } from '../../styled-components/lesson_room/LessonProList';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign, Foundation } from '@expo/vector-icons';
import { lessonPro } from '../../api/lessonPro';
import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    PageButtonOn,
    PageBtnText
 } from '../../styled-components/Common';
import io from 'socket.io-client'
import { article } from '../../api/article';
import { lessonRoomApi } from '../../api/lessonRoom';
import { ProImage, ProListBox } from '../../styled-components/pro_swing/ProSortList';
import * as SecureStore from 'expo-secure-store';

const LessonRoomDetail = ( props ) => {
    const socketClient = useRef()
    const [seq, setSeq] = React.useState(props.route.params.seq);
    const [user, setUser] = React.useState(props.route.params.user);
    const [data, setData] = React.useState(props.route.params.data);
    const [lessonData, setLessonData] = React.useState({});
    const [lessonList, setLessonList] = React.useState([]);
    
    const [video, setVideo] = React.useState([]);

    const navigation = props.navigation;

    useEffect(()=> {
        (async () => {
            let lesson = []
            lesson = await lessonRoomApi.selectLesson({userNo: props.route.params.userNo, seq: props.route.params.seq})
            user = await myPageApi.selectProfile({userNo: props.route.params.userNo})
            // await getUserData()
            setLessonData(lesson[0])
            setLessonList(lesson)
            setUser(user)
        })();
        return(()=>{})
    },[])

    const InsertLessonRecommend = async () => {
        await lessonRoomApi.insertLessonRecommend({lessonSeq: props.route.params.seq, userNo: props.route.params.userNo})
        setLessonData({...lessonData, recommendCnt: 1})
    }

    React.useEffect(async() => {
        const proData = props.route.params.data;
        // const videoData = await article.selectProCardVideo(proData.name);
        const videoData = await article.selectProCardVideo('Dustin Johnson');

        setVideo(videoData);
    }, []);

    const goToVideo = (data) => {
        props.navigation.navigate('ProVideo', {video: data});
    }

    return (
        <CommonBackground>
            <CommonContainer4 style={styles.CommonContainer4}>
                <View style={{height: 50, flexDirection: 'row'}}>
                    <TitLarge style={{marginBottom:15}}>{`${props?.route?.params?.index+1}회차 레슨`}</TitLarge>
                    {
                        lessonData?.state ?
                            <OkState><OkStateText>답변완료</OkStateText></OkState>
                        :
                            <WaitState><WaitStateText>답변대기</WaitStateText></WaitState>
                    }
                </View>
                <InfoContainer>
                    <View style={{flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between'}}>
                        <RN.Text>구력</RN.Text>
                        <RN.Text style={{color: 'gray'}}>{ user?.career ? `${user?.career}개월` : "0개월" }</RN.Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between'}}>
                        <RN.Text>나이</RN.Text>
                        <RN.Text style={{color: 'gray'}}>{ user?.birth ? `${user?.birth}살` : "0살" }</RN.Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between'}}>
                        <RN.Text>드라이버 거리</RN.Text>
                        <RN.Text style={{color: 'gray'}}>{ user?.driver_distance ? `${user?.driver_distance}M` : "0M" }</RN.Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between'}}>
                        <RN.Text>아이언 거리</RN.Text>
                        <RN.Text style={{color: 'gray'}}>{ user?.iron_distance ? `${user?.iron_distance}M` : "0M" }</RN.Text>
                    </View>
                </InfoContainer>
                <ImageContainer>
                    {/* {
                        lessonList.map((data, i) => {
                            if (i < 2) {
                                return(
                                    (data.video != "")?
                                        <ProListBox key={uuid.v4() + data} onPress={() => goToVideo(data)}>
                                            <RN.View style={{alignItems: 'stretch'}} >
                                                {
                                                    (data.thumbnail_original_name != null) 
                                                    ? <ProImage source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                                                    : <ProImage source={require('../../images/video_img.png')}></ProImage>
                                                }
                                            </RN.View>
                                        </ProListBox> 
                                    : null
                               )
                            }
                        })
                    } */}
                    {
                        video.map((data, i) => {
                            if (i < 2) {
                                return(
                                    (data.video != "")?
                                        <ProListBox key={uuid.v4() + data} onPress={() => goToVideo(data)}>
                                            <RN.View style={{alignItems: 'stretch'}} >
                                                {
                                                    (data.thumbnail_original_name != null) 
                                                    ? <ProImage source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                                                    : <ProImage source={require('../../images/video_img.png')}></ProImage>
                                                }
                                            </RN.View>
                                        </ProListBox> 
                                    : null
                               )
                            }
                        })
                    }
                    {/* <ImageViewContainer onPress={() => navigation.navigate('LessonRoomVideo', { data: 'Dan Abramov' })}><RN.Image></RN.Image></ImageViewContainer>
                    <ImageViewContainer onPress={() => navigation.navigate('LessonRoomVideo', { data: 'Dan Abramov' })}><RN.Image></RN.Image></ImageViewContainer> */}
                </ImageContainer>
                <View style={{flexDirection:'row'}}>
                    {/* {
                        data.tag.length > 0 ?
                            data.tag.map((data, index)=>{
                                const {} = data
                                return(
                                    <TagContainer key={index}><TagContainerText>{data}</TagContainerText></TagContainer>
                                )
                            })
                        :
                            null
                    } */}
                    {
                        lessonData?.lessonArea?.split(",")?.length === 1 ?
                            <TagContainer><TagContainerText>{lessonData?.lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                        : lessonData?.lessonArea?.split(",")?.length === 2 ?
                            <>
                                <TagContainer><TagContainerText>{lessonData?.lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                <TagContainer><TagContainerText>{lessonData?.lessonArea.split(",")[1]}</TagContainerText></TagContainer>
                            </>
                        :
                            null
                    }
                </View>
                <AboutContainer nestedScrollEnabled={true}>
                    <RN.Text>{lessonData?.lectureComment}</RN.Text>
                </AboutContainer>
                <View style={{height: 50, marginTop: 25}}>
                    <TitLarge style={{marginBottom:15}}>프로의 코칭</TitLarge>
                </View>
                <ProsTextContainer nestedScrollEnabled={true}>
                    <RN.Text>{lessonData?.proComment}</RN.Text>
                </ProsTextContainer>
                <ImageContainer>
                    {/* {
                        (data.thumbnail_original_name != null) 
                        ? <ProImage source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                        : <ProImage source={require('../../images/video_img.png')}></ProImage>
                    } */}
                    {
                        video.map((data, i) => {
                            if (i < 2) {
                                return(
                                    (data.video != "")?
                                        <ProListBox key={uuid.v4() + data} onPress={() => goToVideo(data)}>
                                            <RN.View style={{alignItems: 'stretch'}} >
                                                {
                                                    (data.thumbnail_original_name != null) 
                                                    ? <ProImage source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                                                    : <ProImage source={require('../../images/video_img.png')}></ProImage>
                                                }
                                            </RN.View>
                                        </ProListBox> 
                                    : null
                               )
                            }
                        })
                    }
                    {/* <ImageViewContainer onPress={() => navigation.navigate('LessonRoomVideo', { data: 'Dan Abramov' })}><RN.Image></RN.Image></ImageViewContainer>
                    <ImageViewContainer onPress={() => navigation.navigate('LessonRoomVideo', { data: 'Dan Abramov' })}><RN.Image></RN.Image></ImageViewContainer> */}
                </ImageContainer>
                <View style={{height: 50, marginTop: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TitLarge style={{marginBottom:15}}>레슨 추천하기</TitLarge>
                    {
                        lessonData?.recommendCnt === 1 ?
                            <RN.TouchableOpacity onPress={()=>{InsertLessonRecommend()}}><Foundation style={{top: 5}} name="heart" size={20} color="red" /></RN.TouchableOpacity>
                        :
                            <RN.TouchableOpacity onPress={()=>{InsertLessonRecommend()}}><Foundation style={{top: 5}} name="heart" size={20} color="#DADADA" /></RN.TouchableOpacity>
                    }
                </View>
                
                <View style={{backgroundColor: 'white', height: 85, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <PageButtonOn style={ lessonData?.state ? [styles.pageButtonOn, styles.pageButtonOn1] : [styles.pageButtonOn, styles.pageButtonOn1, styles.pageButtonW100]} 
                        onPress={()=>{navigation.pop()}}><PageBtnText style={ styles.pageBtnText }>목록가기</PageBtnText>
                    </PageButtonOn>
                    {
                        lessonData?.state && 
                            <PageButtonOn style={styles.pageButtonOn} onPress={ () => navigation.navigate('LessonRoomChat', { proNum: lessonData?.proSeq, userNum: lessonData?.userNo }) }><PageBtnText>프로와 채팅하기</PageBtnText></PageButtonOn>
                        
                    }
                    {/* <PageButtonOn style={styles.pageButtonOn} onPress={ () => navigation.navigate('LessonRoomChat', { proNum: '1', userNum: "3" }) }><PageBtnText>프로와 채팅하기</PageBtnText></PageButtonOn> */}
                </View>
                <CommonContainer4BottomScale />
            </CommonContainer4>
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
    pageButtonOn: {left: 0, right: 0, width: '48.5%', position: 'relative', height: 60, bottom: 0},
    pageButtonOn1: {backgroundColor: '#DADADA'},
    pageButtonW100: {width: '100%'},
    pageBtnText: {fontStyle: 'normal', fontWeight: "400", fontSize: 16, lineHeight: 18, color: '#000000'}
  });
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
    marginTop: 5px;
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
    marginTop: 5px;
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

const InfoContainer = styled.View`
    height: 152px;
    marginTop: 10px;
    paddingTop: 20px;
    paddingHorizontal: 20px;
    background: #F5F5F5;
    border-radius: 12px;
`

const ImageContainer = styled.View`
    height: 150px;
    marginTop: 25px;
    border-radius: 12px;
    flexDirection: row;
    justifyContent: space-between;
`

const ImageViewContainer = styled.TouchableOpacity`
    height: 150px;
    width: 47%;
    border-radius: 12px;
    background: #F5F5F5;
`

const TagContainer = styled.View`
    height: 22px;
    marginRight: 10px;
    marginTop: -5px;
    padding: 0px 10px;
    background: #E63312;
    border-radius: 3px;
    justifyContent: center;
`
    
const TagContainerText = styled.Text`
    color: #ffffff
`
    
const AboutContainer = styled.ScrollView`    
    height: 138px;
    marginTop: 15px;
    paddingHorizontal: 10px;
    paddingVertical: 15px;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
`

const ProsTextContainer = styled.ScrollView`
    height: 138px;
    marginTop: 15px;
    paddingHorizontal: 10px;
    paddingVertical: 15px;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
`

const CommonContainer4BottomScale = styled.View`
    height: 60px;
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

export default LessonRoomDetail;