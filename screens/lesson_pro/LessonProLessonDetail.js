import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from "styled-components";
import uuid from 'react-native-uuid';

import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    CommonBoxWrap,
    LayerBox,
    LayerConBox,
    DimBox,
    CenterText,
    LayerGreenBt,
    FontSize16,
    TxtSmallBlue,
    CheckBtn,
    Description
 } from '../../styled-components/Common';
 import { 
    MyInfo, 
    MyInfoList, 
    MyInfoTitle, 
    MyInfoValue, 
} from '../../styled-components/my_page/MyPage';
import { DetailCloseBtn } from '../../styled-components/analysis_list/AnalysisSwingRear';
import { AntDesign } from '@expo/vector-icons';
import { ProImage, ProListBox } from '../../styled-components/pro_swing/ProSortList';
import { article } from '../../api/article';
import { lessonPro } from '../../api/lessonPro';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import * as VideoThumbnails from 'expo-video-thumbnails';

const LessonDetail = (props) => {
    
    const [data,setData] = useState(props.route.params.data)
    const [youtube, setYouTube] = React.useState("");
    const [video, setVideo] = React.useState([]);
    const [uploadVideo, setUploadVideo] = React.useState({});
    const [thumbnail, setThumbnail] = React.useState({});
    const [uploadImage, setUploadImage] = React.useState({});
    const [complete, setComplete] = React.useState(false);

    const navigation = props.navigation
    

    React.useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {

            // getUserData();
            // 레슨 신청자 userNo은 data에 있음 api만든 후 활용해서 구력이랑 채우면됨

        });

        const videoData = await article.selectProCardVideo('Dustin Johnson');
        setVideo(videoData);
    
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
        (async () => {
            const midiaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(midiaLibraryStatus.status === 'granted');
        })();
    }, []);

    function createRandomCode(n) {
        let str = '';
        for (let i = 0; i < n; i++) {
            str += Math.floor(Math.random() * 10);
        }
        return str;
    }
    function getDate() {
        // 날짜 설정
        let today = new Date();
    
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
    
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
    
        return year + month + day + hours + minutes + seconds;
    };

    const goToVideo = (data) => {
        props.navigation.navigate('LessonProVideo', {video: data});
    }

    const openGallery = async ({state}) => {
        const userData = await SecureStore.getItemAsync("userData");
        const userNo = JSON.parse(userData).user_no;
        
        const userId = createRandomCode(9 - userNo.toString().length) + userNo.toString() +   "_" + getDate();
        // setId(userId)
        console.log(userId);


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result,"result")

        if(!result.cancelled) {
            if(result.type === "video") {
                if (state === "video") {
                    try {
                        const { uri } = await VideoThumbnails.getThumbnailAsync(
                          `${result.uri}`,
                          {
                            time: 15000,
                          }
                        );
                        setUploadVideo(result)
                        setThumbnail(uri);
                    } catch (e) {
                        console.warn(e);
                    }
                } else {
                    alert("비디오만 업로드 가능합니다.")
                }
            } else {
                if (state === "image") {
                    setUploadImage(result)
                } else {
                    alert("이미지만 업로드 가능합니다.")
                }
            }
        }
    }

    const refCont = React.useRef();
    const [contents, setContents] = React.useState();

    const UpdateLesson = async () => {
        const body = {
            "seq": data.seq,
            "status": 1,
            "lectureComment": data.lectureComment,
            "lessonArea": data.lessonArea,
        }
        await lessonPro.updateLesson(body)
        navigation.pop()
    }

    return (
        <>
            <CommonBackground>
                <CommonContainer4>
                    <CommonBoxWrap flexStart>
                        <TitLarge>1회차 레슨</TitLarge>
                        {/* <IconText bgColor={"#000"}>{data?.status === 0? '답변대기':'답변완료'}</IconText> */}
                        {
                            data?.state ?
                                <OkState><OkStateText>답변완료</OkStateText></OkState>
                            :
                                <WaitState><WaitStateText>답변대기</WaitStateText></WaitState>
                        }
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
                    <ImageContainer>
                        {
                            video.map((data, i) => {
                                if (i < 2) {
                                    return(
                                        (data.video != "")?
                                            <ProListBox key={uuid.v4() + data} onPress={() => goToVideo(data)}>
                                                <View style={{alignItems: 'stretch'}} >
                                                    {
                                                        (data.thumbnail_original_name != null) 
                                                        ? <ProImage source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                                                        : <ProImage source={require('../../images/video_img.png')}></ProImage>
                                                    }
                                                </View>
                                            </ProListBox> 
                                        : null
                                )
                                }
                            })
                        }
                    </ImageContainer>
                    {/* <CommonBoxWrap>
                        <ProImage source={require('../../images/img-SortList.png')} />
                        <ProImage source={require('../../images/img-SortList.png')} />
                    </CommonBoxWrap> */}
                    <View style={{flexDirection:'row'}}>
                        {
                            data?.lessonArea?.split(",")?.length === 1 ?
                                <TagContainer><TagContainerText>{data?.lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                            : data?.lessonArea?.split(",")?.length === 2 ?
                                <>
                                    <TagContainer><TagContainerText>{data?.lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                    <TagContainer><TagContainerText>{data?.lessonArea.split(",")[1]}</TagContainerText></TagContainer>
                                </>
                            :
                                null
                        }
                    </View>
                    {/* <CommonBoxWrap flexStart style={{marginTop:10, marginBottom:15}}>
                        <Hashtag>테이크 어웨이</Hashtag>
                        <Hashtag>그립잡기</Hashtag>
                    </CommonBoxWrap> */}
                    <AboutContainer nestedScrollEnabled={true}>
                        <Text>{data?.lectureComment}</Text>
                    </AboutContainer>
                    {/* <FontSize16 style={{marginBottom:40, lineHeight:22}}>레슨에 대해서 추가적으로 궁금한 사항을 등록한 부분에 대한 내용이 보여지게 됨</FontSize16> */}
                    <TitLarge style={{marginTop: 10}}>영상 및 이미지 데이터 등록</TitLarge>
                    <InfoText>영상 업로드</InfoText>
                    <TouchableOpacity onPress={()=>{openGallery({state: "video"})}} style={{width: '100%', marginBottom:24, height: 40}}>
                        {
                            uploadVideo?.uri?
                                <CheckBtn>{uploadVideo.uri}</CheckBtn>
                            :
                                <CheckBtn blueBtn>찾아보기</CheckBtn>
                        }
                    </TouchableOpacity>        
                    <InfoText>이미지 업로드</InfoText>
                    <TouchableOpacity onPress={()=>{openGallery({state: "image"})}} style={{width: '100%', marginBottom:24}}>
                        {
                            uploadImage?.uri?
                                <CheckBtn>{uploadImage.uri}</CheckBtn>
                            :
                                <CheckBtn blueBtn>찾아보기</CheckBtn>
                        }
                    </TouchableOpacity>
                    <InfoText>유튜브 링크</InfoText>
                    <TextInput editable={true} style={{marginBottom: 15}} onChangeText={(text)=>setYouTube(text)}></TextInput>
                    <Description>※ 최대 2개까지만 업데이트 가능합니다.</Description>
                    <TitLarge style={{marginTop: 40, marginBottom: 15}}>레슨 관련 텍스트 입력</TitLarge>
                    <TextInput style={{ textAlignVertical: "top", height: 150, marginBottom: 15}} placeholder="내용" placeholderTextColor="#ccc" onChangeText={(text)=>setContents(text)}
                        ref={refCont}
                        value={contents}
                        multiline = {true}
                        numberOfLines = {4}
                        underlineColorAndroid="transparent"
                    ></TextInput>
                    <VideoBtnBox>
                        <SaveBtn>
                            <BtnText onPress={()=>{navigation.pop()}} style={{color : "#666"}}>취소</BtnText>                 
                        </SaveBtn>
                        <AppendBtn>
                            <BtnText onPress={()=>setComplete(true)}>레슨 등록</BtnText>                 
                        </AppendBtn>
                    </VideoBtnBox>
                </CommonContainer4>
            </CommonBackground>
            {
                complete?
                    <DimBox> 
                        <LayerBox>
                            <LayerConBox style={{ marginTop: 15 }}><CenterText>등록을 완료 하시겠습니까?{'\n'}
                                등록 된 내용은 관리자 승인 후{'\n'}
                                사용자에게 노출됩니다.</CenterText></LayerConBox>
                            <LayerGreenBt onPress={()=>UpdateLesson()}><FontSize16 style={{ fontWeight:"400" }}>신청</FontSize16></LayerGreenBt>
                            <DetailCloseBtn><AntDesign onPress={() => {setComplete(false)}} name="close" size={24} color="#000" />닫기</DetailCloseBtn>
                        </LayerBox>   
                    </DimBox>
                :
                    null
            }
        </>
    )
};

// const ProImage = styled.Image`
//     width: 160px;
//     height: 150px;
//     border-radius: 12px;
// `
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
const OkState = styled.View`
    width: 65px;
    height: 20px;
    left: 10px;
    marginTop: 0px;
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
    marginTop: 0px;
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
const ImageContainer = styled.View`
    height: 150px;
    marginTop: 25px;
    border-radius: 12px;
    flexDirection: row;
    justifyContent: space-between;
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

export default LessonDetail;

