import React, { useMemo } from 'react';
import * as RN from 'react-native';
import * as ST from '../../styled-components/analysis_list/AnalysisSwing';
import { View } from 'react-native';
import styled from "styled-components";
import uuid from 'react-native-uuid';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { CheckBtn, InfoText, Nickname, NicknameBox, TextInput, UpdateButton, InfoSetWrap } from '../../styled-components/lesson_room/LessonProList';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign, Foundation } from '@expo/vector-icons';
import { lessonPro } from '../../api/lessonPro';
import { lessonRoomApi } from '../../api/lessonRoom';
import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    PageButtonOn,
    PageBtnText,
    TitMiddle
 } from '../../styled-components/Common';
import { article } from '../../api/article';
import { ProImage, ProListBox } from '../../styled-components/pro_swing/ProSortList';

const LessonRoomRegist = ( props ) => {   
    const [user, setUser] = React.useState(props.route.params.user);
    const [lessonType, setLessonType] = React.useState("전체");
    const [selectedLessonType, setSelectedLessonType] = React.useState([""]);

    const [lessonTypeList, setLessonTypeList] = React.useState([{name: "슬라이스", state: false}, {name: "훅", state: false}, {name: "그립잡기", state: false}, {name: "어드레스", state: false} , {name: "테이크 어웨이", state: false}, {name: "백스윙", state: false}, {name: "임팩트", state: false}, {name: "피니쉬", state: false}, {name: "스윙템포", state: false}, {name: "비거리", state: false}, {name: "모름", state: false}]);
    const [lessonTypeListChange, setLessonTypeListChange] = React.useState(false);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);

    const [aboutText, setAboutText] = React.useState(false);

    const [videoList, setVideoList] = React.useState([{},{}]);
    const videoListConst = [videoList, setVideoList]
    const [video, setVideo] = React.useState([]);
    const [proSelect, setProSelect] = React.useState(false);


    React.useEffect(async() => {
        const proData = props.route.params.data;
        // const videoData = await article.selectProCardVideo(proData.name);
        const videoData = await article.selectProCardVideo('Dustin Johnson');

        setVideo(videoData);
    }, []);

    const goToVideo = (data) => {
        props.navigation.navigate('ProVideo', {video: data});
    }

    const navigation = props.navigation;
    
    let lessonTypeCounter = 0
    const lessonTypeContainer = lessonTypeList.map((data, index)=>{
        const {name, state} = data
        if (state) {
            lessonTypeCounter+=1
        }
        for (let compData of selectedLessonType) {
            return(
                <LessonTypeContainer
                    style={{
                        backgroundColor: state ? "#E63312" : '#DADADA',
                        left: index%3 === 0 ? "0%" : index%3 === 1 ? "34%" : "68%",
                        top: Math.floor(index/3)*45
                    }}
                    onPress={()=>{
                        if (lessonTypeCounter >= 2 && state === false) {
                            alert("2개까지만 선택 가능합니다.")
                        } else {
                            lessonTypeList.splice(index,1,{name, state: !state})
                            setLessonTypeListChange(!lessonTypeListChange)
                        }
                    }}
                ><RN.Text style={{color: state ? "#FFFFFF" : '#000000'}}>{name}</RN.Text></LessonTypeContainer>
            )
        }
    })
    const lessonTypeMemo = useMemo(()=> lessonTypeContainer,[lessonTypeListChange])

    const ProSearch = () => {
        //setProSelect(true)
        videoList.map((data)=>{
            const {id, uri, type1, type2} = data
            const golfSocket = new WebSocket("ws://223.130.132.180:9996");
            golfSocket.onopen = () => {
                console.log("scoket connected !");
                const sendData = {
                    "id": id,
                    "file-name": uri,
                    "swing-type": type1, 
                    "club-type": type2
                }
                console.log(sendData);
                golfSocket.send(JSON.stringify(sendData));
            };
              
            golfSocket.onmessage = (e) => {
    
                console.log("socketOnMessage !", e.data);
                
                // a message was received
    
                // console.log("socket message!");
                // console.log(e.data);
                
                if(e.data.includes("Success")){
                    // 소켓 성공에 따른 데이터 활용 코드 작성
                };                     
                                                                                        
            };
              
            golfSocket.onerror = (e) => {
                // an error occurred
    
                console.log("scoket error !");
                console.log(e.message);
            };
              
            golfSocket.onclose = (e) => {
                // connection closed
                console.log("scoket onclose !");
                console.log(e.code, e.reason);
            };
        })
    }

    const LessonReg = async ({regType}) => {
        // 포인트 총량 api 를 이용하여 포인트 비교하기
        const point = 0
        let type
        if (videoList[0]?.type1 === 'front' && videoList[0]?.type2 === 'drive') {
            type = "FD"
        } else if (videoList[0]?.type1 === 'front' && videoList[0]?.type2 === 'iron') {
            type = "FI"
        } else if (videoList[0]?.type1 === 'rear' && videoList[0]?.type2 === 'drive') {
            type = "RD"
        } else if (videoList[0]?.type1 === 'rear' && videoList[0]?.type2 === 'iron') {
            type = "RI"
        }
        let lessonTypeText = ""
        lessonTypeList.map((data)=>{
            const { name, state } = data
            if (state === true) {
                if (lessonTypeText === "") {
                    lessonTypeText = name
                } else {
                    lessonTypeText = lessonTypeText+","+name
                }
            }
        })

        
        if (regType === 1) {
            if (point < 15000) {
                RN.Alert.alert(

                        "보유중인 포인트가 부족합니다.",
                        "",
                        [
                        {
                            text: "충전하기",
                            onPress: () => navigation.navigate('BuyPoints'),
                            style: "cancel",
                        },
                        ],
                        {
                        cancelable: true,
                        onDismiss: () =>
                            Alert.alert(
                            "This alert was dismissed by tapping outside of the alert dialog."
                            ),
                        }
                    )
            } else {
                const body = {
                    "proSeq": 18,
                    "userNo": user.user_no,
                    "status": 0,
                    "type": type,
                    "lectureComment": aboutText? aboutText : "",
                    "lessonArea": lessonTypeText,
                    "lessonFlag": 0
                }
                const result = await lessonRoomApi.regLesson(body)
                if (result.message === "success") {
                    RN.Alert.alert(

                        "레슨 요청이 완료 되었습니다. 피드백은 2일 정도 소요 됩니다.",
                        "",
                        [
                        {
                            text: "확인",
                            onPress: () => navigation.pop(),
                            style: "cancel",
                        },
                        ],
                        {
                        cancelable: true,
                        onDismiss: () =>
                            Alert.alert(
                            "This alert was dismissed by tapping outside of the alert dialog."
                            ),
                        }
                    )
                }
            }
        } else {
            if (point < 20000) {
                // 포인트 구매하기로 이동
                navigation.navigate('BuyPoints')
            } else {
                const body = {
                    "proSeq": 18,
                    "userNo": user.user_no,
                    "status": 0,
                    "type": type,
                    "lectureComment": aboutText? aboutText : "",
                    "lessonArea": lessonTypeText,
                    "lessonFlag": 1
                }
                const result = await lessonRoomApi.regLesson(body)
                if (result.message === "success") {
                    RN.Alert.alert(

                        "레슨 요청이 완료 되었습니다. 피드백은 1시간 이내 피드백 드리겠습니다.",
                        "",
                        [
                        {
                            text: "확인",
                            onPress: () => navigation.pop(),
                            style: "cancel",
                        },
                        ],
                        {
                        cancelable: true,
                        onDismiss: () =>
                            Alert.alert(
                            "This alert was dismissed by tapping outside of the alert dialog."
                            ),
                        }
                    )
                }
            }
        }
    }
    
    return (
        <CommonBackground>
            <CommonContainer4 style={styles.CommonContainer4}>
                <View style={{height: 50}}>
                    <TitLarge style={{marginBottom:15}}>온라인 레슨</TitLarge>
                </View>
                <View style={{height: 40, marginTop: 10}}>
                    <TitMiddle style={{marginBottom:15}}>스윙영상 업로드</TitMiddle>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    {
                        videoList.map((data, index) => {
                            return(
                                <ProListBox key={uuid.v4()} style={{}} 
                                        onPress = {() => {navigation.navigate('LessonOption', { data: 'Dan Abramov', videoListConst: videoListConst, num: index })}}
                                    >
                                        <RN.View style={{alignItems: 'stretch'}} >
                                            {
                                                (videoList?.thumbnail != null) 
                                                ? <ProImage source={{uri : data?.thumbnail}}></ProImage>
                                                // ? <ProImage source={{uri : `http://223.130.132.180:5009/upload/${videoList?.thumbnail}`}}></ProImage>
                                                : <ProImage source={require('../../images/base_thumbnail.png')}></ProImage>
                                            }
                                        </RN.View>
                                </ProListBox>
                            )
                        })
                    }
                </View>
                {/* <ImageContainer>
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
                </ImageContainer> */}
                <View style={{height: 40, marginTop: 20}}>
                    <TitMiddle style={{marginBottom:15}}>·레슨이 필요한 영역을 선택해주세요.(필수)</TitMiddle>
                </View>
                <View style={{width: '100%', height: Math.floor(lessonTypeList.length/3+1)*35+Math.floor(lessonTypeList.length/3)*10}}>
                    { lessonTypeMemo }
                </View>
                <View style={{height: 40, marginTop: 20}}>
                    <TitMiddle>추가로 알아야 할 사항</TitMiddle>
                </View>
                <AboutContainer>
                    <AboutContainerTextInput scrollEnabled={true} multiline={true}
                        onTextInput={(e)=>{setAboutText(e)}}
                        placeholder={`추가로 궁금한 사항에 대해서 자세히 작성해주세요.

예) 오른손에 힘이 너무 들어가서 임팩트가 잘 맞지 않아 고민입니다.`}
                    />
                </AboutContainer>
                <View style={{height: 40, marginTop: 20}}>
                    <TitMiddle>프로 선택하기</TitMiddle>
                </View>
                <ImageContainer>
                    {
                        video.map((data, index) => {
                            if (index < 2) {
                                return(
                                    (data.video != "")?
                                        <ProListBox key={uuid.v4() + data} onPress={() => {
                                            // 프로선택 로직추가
                                        }}>
                                            <RN.View style={{alignItems: 'stretch'}} >
                                                {
                                                    (data.thumbnail_original_name != null) 
                                                    ? <ProImage style={{width: 100, height: 100, alignSelf: index === 0? 'flex-end': 'flex-start', borderRadius: 100}} source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                                                    : <ProImage style={{width: 100, height: 100, alignSelf: index === 0? 'flex-end': 'flex-start', borderRadius: 100}} source={require('../../images/video_img.png')}></ProImage>
                                                }
                                                <View style={{width: 100, height: 100, alignSelf: index === 0? 'flex-end': 'flex-start', alignItems: 'center', marginTop: 10}}>
                                                    <RN.Text style={{fontWeight: 'bold'}}>A 프로</RN.Text>
                                                    <RN.Text style={{color: 'gray'}}>추천횟수: 100회</RN.Text>
                                                </View>
                                            </RN.View>
                                        </ProListBox> 
                                    : null
                               )
                            }
                        })
                    }
                </ImageContainer>
                <PageButtonOn style={{height: 52, position: 'relative', left: 0, bottom: 0, paddingTop: 15, backgroundColor: '#171C61', borderRadius: 6, marginTop: 10}} onPress={() => ProSearch()}><PageBtnText>프로찾기</PageBtnText></PageButtonOn>
               
                <View style={{height: 40, marginTop: 20}}>
                    <TitMiddle>레슨 선택하기</TitMiddle>
                </View>
                <RN.TouchableOpacity style={{height: 120, position: 'relative', left: 0, bottom: 0, paddingTop: 0, backgroundColor: '#FFFFFF', borderRadius: 12, marginTop: 10, borderWidth: 1, borderColor: '#EEEEEE', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onPress={()=>LessonReg({regType: 1})}>
                    <View style={{paddingTop: 0}}>
                        <RN.Text style={{color: '#000000', fontSize: 20,fontWeight: '700'}}>일반레슨: 15,000 포인트</RN.Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <RN.Text style={{color: '#000000', fontSize: 14}}>(신청 후 2일 이내 답변을 받아보실 수 있습니다.)</RN.Text>
                    </View>
                </RN.TouchableOpacity>
                <RN.TouchableOpacity style={{height: 120, position: 'relative', left: 0, bottom: 0, paddingTop: 0, backgroundColor: '#5CEEA7', borderRadius: 12, marginTop: 10, borderWidth: 1, borderColor: '#EEEEEE', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onPress={()=>LessonReg({regType: 2})}>
                    <View style={{paddingTop: 0}}>
                        <RN.Text style={{color: '#000000', fontSize: 20,fontWeight: '700'}}>긴급레슨: 20,000 포인트</RN.Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <RN.Text style={{color: '#000000', fontSize: 14}}>(근무시간 1시간 이내 답변을 받아보실 수 있습니다.)</RN.Text>
                    </View>
                </RN.TouchableOpacity>
                
                <CommonContainer4BottomScale />
            </CommonContainer4>
            {
                proSelect ?
                    <>
                        <RN.TouchableOpacity style={{position: 'absolute', height: "100%", width: '100%', backgroundColor: 'gray', opacity: 0.5}} onPress={()=>setProSelect(false)} />
                        <View style={{position: 'absolute', marginTop: 30, width: "90%", height: 566, left: '5%', paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: '#403b4b', backgroundColor: '#FFFFFF'}}>
                            <View style={{height: 40, marginTop: 20}}>
                                <TitMiddle style={{fontSize: 22}}>프로 선택하기</TitMiddle>
                            </View>
                            <View style={{height: 40, marginTop: 0}}>
                                <TitMiddle style={{fontSize: 18}}>·유사도 맞춤 추천 프로</TitMiddle>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {
                                    video.map((data, index) => {
                                        if (index < 2) {
                                            return(
                                                (data.video != "")?
                                                    <ProListBox key={uuid.v4() + data} onPress={() => {
                                                        // 프로선택 로직추가
                                                    }}>
                                                        <RN.View style={{}} >
                                                            {
                                                                (data.thumbnail_original_name != null) 
                                                                ? <ProImage style={{width: 100, height: 100, alignSelf: 'center', borderRadius: 100}} source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                                                                : <ProImage style={{width: 100, height: 100, alignSelf: 'center', borderRadius: 100}} source={require('../../images/video_img.png')}></ProImage>
                                                            }
                                                            <View style={{width: 100, alignSelf: 'center', alignItems: 'center', marginTop: 10}}>
                                                                <RN.Text style={{fontWeight: 'bold'}}>A 프로</RN.Text>
                                                            </View>
                                                            <View style={{alignSelf: 'center', alignItems: 'flex-start', marginTop: 0}}>
                                                                <RN.Text style={{color: 'gray'}}>등      급: 프로</RN.Text>
                                                                <RN.Text style={{color: 'gray'}}>레슨횟수: 104회</RN.Text>
                                                                <RN.Text style={{color: 'gray'}}>추천횟수: 78회</RN.Text>
                                                            </View>
                                                        </RN.View>
                                                    </ProListBox> 
                                                : null
                                        )
                                        }
                                    })
                                }
                            </View>
                            <RN.ScrollView style={{height: 90}}>
                                {
                                    video.map((data, index) => {
                                        return(
                                            (data.video != "")?
                                                <ProListBox style={{}} key={uuid.v4() + data} onPress={() => {
                                                    // 프로선택 로직추가
                                                }}>
                                                    <RN.View style={{flexDirection: 'row'}} >
                                                        {
                                                            (data.thumbnail_original_name != null) 
                                                            ?
                                                                <>
                                                                    <ProImage style={{width: 80, height: 90, alignSelf: 'center', borderRadius: 10}} source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                                                                    <View style={{marginLeft: 20, justifyContent: 'center'}}>
                                                                        <View style={{width: 120, alignSelf: 'center', alignItems: 'flex-start', marginTop: 0}}>
                                                                            <RN.Text style={{fontWeight: 'bold'}}>A 프로(남)</RN.Text>
                                                                        </View>
                                                                        <View style={{width: 120, alignSelf: 'center', alignItems: 'flex-start', marginTop: 0}}>
                                                                            <RN.Text style={{color: 'gray'}}>등      급: 프로</RN.Text>
                                                                            <RN.Text style={{color: 'gray'}}>레슨횟수: 104회</RN.Text>
                                                                            <RN.Text style={{color: 'gray'}}>추천횟수: 78회</RN.Text>
                                                                        </View>
                                                                    </View>
                                                                </>
                                                            : <ProImage style={{width: 100, height: 100, alignSelf: 'center', borderRadius: 10}} source={require('../../images/video_img.png')}></ProImage>
                                                        }
                                                        
                                                    </RN.View>
                                                </ProListBox> 
                                            : null
                                        )
                                    })
                                }
                            </RN.ScrollView>
                            <PageButtonOn style={{height: 52, position: 'relative', left: 0, bottom: 0, marginVertical: 15, marginHorizontal: 45, paddingTop: 15, backgroundColor: '#171C61', borderRadius: 6, marginTop: 10}} onPress={() => setProSelect(false)}><PageBtnText>선택하기</PageBtnText></PageButtonOn>
                        </View>
                    </>
                :
                    null
            }
            {/* <CommonContainer4 style={styles.CommonContainer4}>

            </CommonContainer4> */}
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
    marginTop: 0px;
    border-radius: 12px;
    flexDirection: row;
    justifyContent: space-between;
`

const LessonTypeContainer = styled.TouchableOpacity`
    height: 35px;
    width: 32%;
    border-radius: 5px;
    position: absolute;
    justifyContent: center;
    alignItems: center;
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
    marginTop: 15px;
    padding: 4px 10px;
    background: #E63312;
    border-radius: 3px;
`
    
const TagContainerText = styled.Text`
    color: #ffffff
`
    
const AboutContainer = styled.View`    
    height: 138px;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
`

const AboutContainerTextInput = styled.TextInput`    
    borderLeftWidth: 10px;
    borderRightWidth: 10px;
    borderTopWidth: 10px;
    paddingHorizontal: 10px;
    paddingVertical: 5px;
    border: 1px solid #FFFFFF;
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

export default LessonRoomRegist;