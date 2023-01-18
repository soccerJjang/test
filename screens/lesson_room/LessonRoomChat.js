import React, { useEffect, useRef } from 'react';
import * as RN from 'react-native';
import { View, Text } from 'react-native';
import styled from "styled-components";
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
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { useAnimatedRef } from 'react-native-reanimated';
import { chatApi } from '../../api/chat';

const LessonRoomDetail = ( props ) => {
    const socketClient = useRef()
    const [user, setUser] = React.useState(props.route.params.user);
    const [data, setData] = React.useState({});
    const [proNum, setProNum] = React.useState(props.route.params.proNum);
    const [userNum, setUserNum] = React.useState(props.route.params.userNum);
    const [chatNum, setChatNum] = React.useState(1);
    const [dayChange, setDayChange] = React.useState([]);
    const [text, setText] = React.useState("");
    let chat = []
    const [serverMessages, setServerMessages] = React.useState([]);
    const scrollViewRef = useAnimatedRef()
    const [scrollState, setScrollState] = React.useState(false)

    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);

    const navigation = props.navigation;

    useEffect(()=> {
        (async () => {
            chat = await chatApi.selectChatList({roomSeq: `${proNum}_${userNum}`, pageNo: chatNum})
            setChatNum(chatNum+1)
            let count = 0
            chat = chat.sort( (a, b) => {
                return a.seq - b.seq;
            })
            let dateComp = new Date(0)
            let dateList = []
            chat.forEach((data, index) => {
                const date = new Date(data.sendDt)
                if ((dateComp?.getDate() === date.getDate()) && (dateComp?.getMonth() === date.getMonth()) && (dateComp?.getFullYear() === date.getFullYear())) {
                } else {
                    dateComp = date
                    dateList.push(index)
                }
            })
            setDayChange(dateList)
            setServerMessages(chat)
        })();
        (async () => {
            proData = await lessonPro.selectLessonProDetail({proSeq: proNum})
            props.route.params.title(proData[0].proName)
        })();
        // props.route.params.title("이름")
        SocketFunc()
        return(()=>{
            props.route.params.title("")
            socketClient.current.close()
            socketClient.current = null
        })
    },[])

    const SocketFunc = () => {
        
        socketClient.current = io("http://211.55.64.43:5010");

        socketClient.current.on("connect", () => {
            console.log('connected')
        });

        socketClient.current.on("disconnect", () => {
            console.log('disconnected')
        });
        
        socketClient.current.emit('join', `${proNum}_${userNum}`);

        socketClient.current.on("msg", (sendID, msg) => {
            const today = new Date()
            const hour = today.getHours()+1
            const minute = today.getMinutes()
            if (socketClient.current?.id === sendID) {
                console.log(msg,"mytext")
                chat.push({hour, minute, userNO: userNum, proNo: 0, message: msg})
            } else {
                console.log(msg,"gottext")
                chat.push({hour, minute, userNO: 0, proNo: proNum, message: msg})
            }
            // socket에서 시간을 주지 않아서 socket값으로는 오늘을 체크 못함 하려면 timer써야하는데 너무 가라임
            // let dateComp = new Date(0)
            // let dateList = []
            // chat.forEach((data, index) => {
            //     const date = new Date(data.sendDt)
            //     console.log(dateComp,"dateComp")
            //     console.log(date,"date")
            //     if ((dateComp?.getDate() === date.getDate()) && (dateComp?.getMonth() === date.getMonth()) && (dateComp?.getFullYear() === date.getFullYear())) {
            //     } else {
            //         dateComp = date
            //         dateList.push(index)
            //     }
            // })
            // setDayChange(dateList)

            setServerMessages([...chat])
        });
    }
    
    const SocketSendFunc = () => {
        socketClient.current.emit('msg', { roomSeq: `${proNum}_${userNum}`, msg: text, userNo: userNum, proNo: 0 });
    }
    useEffect(()=>{
        if (!scrollState) {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
    },[serverMessages])

    const _OnScrollEndDrag = (e) => {
        const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
        if ((contentSize.height - (contentOffset.y + layoutMeasurement.height)) < 5) {
            setScrollState(false)
        } else {
            setScrollState(true)
        }
    }
    const _OnMomentumScrollEnd = (e) => {
        const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
        if (contentOffset.y === 0) {
            (async () => {
                let chatlist = await chatApi.selectChatList({roomSeq: `${proNum}_${userNum}`, pageNo: chatNum})
                setChatNum(chatNum+1)
                chatlist = chatlist.concat(serverMessages)
                chatlist = chatlist.sort( (a, b) => {
                    return a.seq - b.seq;
                })

                let dateComp = new Date(0)
                let dateList = []
                chatlist.forEach((data, index) => {
                    const date = new Date(data.sendDt)
                    if ((dateComp?.getDate() === date.getDate()) && (dateComp?.getMonth() === date.getMonth()) && (dateComp?.getFullYear() === date.getFullYear())) {
                    } else {
                        dateComp = date
                        dateList.push(index)
                    }
                })
                setDayChange(dateList)

                setServerMessages([...chatlist])
                chat = chatlist
                socketClient.current.close()
                socketClient.current = null
                SocketFunc()
            })()
        }
        if ((contentSize.height - (contentOffset.y + layoutMeasurement.height)) < 5) {
            setScrollState(false)
        }
    }

    React.useEffect(() => {
        (async () => {
            const midiaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(midiaLibraryStatus.status === 'granted');
        })();
    }, []);

    const openGallery = async (swingType, clubType) => {
        const userData = await SecureStore.getItemAsync("userData");
        const userNo = JSON.parse(userData).user_no;
        
        const userId = createRandomCode(9 - userNo.toString().length) + userNo.toString() +   "_" + getDate();
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

                // let realVideo = route.params.videoLocation
                // const userId = realVideo.substring(realVideo.lastIndexOf("/") + 1 , realVideo.lastIndexOf("."));
                // const filePath = realVideo.substring(0, realVideo.lastIndexOf("/"));

                // console.log(userId);
                // console.log(filePath);

                // const convertAPI = `http://223.130.132.180:5009/videoUploadProcess/convert.do?userId=${userId}&filePath=${filePath}`;
                
                // await fetch(convertAPI)
                // .then((response) => {
                //     console.log("변환처리 시작");
                //     console.log(response);
                //     realVideo =  filePath + "/" + userId + ".mp4";
                // });
                
                let body = new FormData()
                body.append("file", {uri: result.uri, name: `name.${result.uri.split(".")[1]}`, type: `${result.type}/${result.uri.split(".")[1]}`})
                body.append("roomSeq", `${proNum}_${userNum}`)
                body.append("userNo", userNum)
                body.append("proNo", 0)
                const uploadResult = await chatApi.chatUpload(body)
                console.log(uploadResult,"uploadResult")

                (async () => {
                    let chatlist = await chatApi.selectChatList({roomSeq: `${proNum}_${userNum}`, pageNo: chatNum})
                    setChatNum(chatNum+1)
                    chatlist = chatlist.concat(serverMessages)
                    chatlist = chatlist.sort( (a, b) => {
                        return a.seq - b.seq;
                    })
    
                    let dateComp = new Date(0)
                    let dateList = []
                    chatlist.forEach((data, index) => {
                        const date = new Date(data.sendDt)
                        if ((dateComp?.getDate() === date.getDate()) && (dateComp?.getMonth() === date.getMonth()) && (dateComp?.getFullYear() === date.getFullYear())) {
                        } else {
                            dateComp = date
                            dateList.push(index)
                        }
                    })
                    setDayChange(dateList)
    
                    setServerMessages([...chatlist])
                    chat = chatlist
                    socketClient.current.close()
                    socketClient.current = null
                    SocketFunc()
                })()

                // SocketFunc()
                // getUpload.status === 200 && uploadResult.success ?
                //     props.navigation.navigate("AnalysisAdmob", { userId, swingType, clubType , videoLocation : uploadResult.videoLocation, startTime}) : alert("동영상 업로드에 실패하였습니다.");
            } else {
                RN.Alert.alert('비디오파일만 업로드 가능합니다.');
            }

        }

    }
    
    return (
        <CommonBackground style={{backgroundColor: 'white'}}>
            <RN.SafeAreaView style={{height: '100%'}}>
                <RN.ScrollView
                    ref={scrollViewRef}
                    onScrollEndDrag={_OnScrollEndDrag}
                    onMomentumScrollEnd={_OnMomentumScrollEnd}
                >
                    <RN.SafeAreaView style={{backgroundColor: 'yellow'}}>
                        {
                            serverMessages.map((data, idx, arr)=>{
                                const {message, hour, minute, proNo, userNO, sendDt, seq, filePath, encodeNm} = data
                                const date = new Date(sendDt)
                                const today = new Date()
                                const week = ['일','월','화','수','목','금','토']
                                return(
                                    <>
                                        {
                                            message?
                                                <>
                                                    {dayChange.map((data) => {
                                                        if (data === idx) {
                                                            return (
                                                                <View style={{marginTop: 10, marginBottom: 31}}>
                                                                    <View style={{height: 18, flexDirection: 'row', alignItems: 'center'}}>
                                                                        <View style={{flex: 1, height: 1, backgroundColor: '#EBEBEB', marginHorizontal: 20}} />
                                                                        <Text style={{fontSize: 12, color: '#444444'}}>
                                                                            {
                                                                                ((today.getFullYear() === date.getFullYear()) && (today.getMonth() === date.getMonth()) && (today.getDate() === date.getDate())) ?
                                                                                    `오늘`
                                                                                :
                                                                                `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 (${week[date.getDay()]})`
                                                                            }
                                                                        </Text>
                                                                        <View style={{flex: 1, height: 1, backgroundColor: '#EBEBEB', marginHorizontal: 20}} />
                                                                    </View>
                                                                </View>
                                                            )
                                                        }
                                                    })}
                                                    <View key={idx} style={{
                                                        alignItems: 
                                                            proNo === 0 ?
                                                                'flex-end'
                                                            :
                                                                'flex-start',
                                                        marginHorizontal: 20, paddingBottom: (arr.length === idx+1) ? 2 : 12}}>
                                                        <View style={[{
                                                            backgroundColor:
                                                                proNo === 0 ?
                                                                    '#EDF4FF'
                                                                :
                                                                    '#F3F2F2', 
                                                            paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15, maxWidth: '70%'},
                                                            proNo === 0 ?
                                                                {borderBottomRightRadius: 0}
                                                            :
                                                                {borderBottomLeftRadius: 0}
                                                            ]}>
                                                            <Text>{message}</Text>
                                                        </View>
                                                        <Text style={{fontSize: 12, color: 'gray'}}>
                                                            {
                                                                sendDt ?
                                                                    date.getHours() > 12 ?
                                                                        date.getMinutes() > 9 ?
                                                                            `오후 ${date.getHours()-12}:${date.getMinutes()}`
                                                                        :
                                                                            `오후 ${date.getHours()-12}:${"0"+date.getMinutes()}`
                                                                    :
                                                                        date.getMinutes() > 9 ?
                                                                            `오전 ${date.getHours()}:${date.getMinutes()}`
                                                                        :
                                                                            `오전 ${date.getHours()}:${"0"+date.getMinutes()}`
                                                                : 
                                                                    hour > 12 ?
                                                                        minute > 9 ?
                                                                            `오후 ${hour-12}:${minute}`
                                                                        :
                                                                            `오후 ${hour-12}:${"0"+minute}`
                                                                    :
                                                                        minute > 9 ?
                                                                            `오전 ${hour}:${minute}`
                                                                        :
                                                                            `오전 ${hour}:${"0"+minute}`
                                                            }
                                                        </Text>
                                                    </View>
                                                </>
                                            :
                                                <>
                                                    {dayChange.map((data) => {
                                                        if (data === idx) {
                                                            return (
                                                                <View style={{marginTop: 10, marginBottom: 31}}>
                                                                    <View style={{height: 18, flexDirection: 'row', alignItems: 'center'}}>
                                                                        <View style={{flex: 1, height: 1, backgroundColor: '#EBEBEB', marginHorizontal: 20}} />
                                                                        <Text style={{fontSize: 12, color: '#444444'}}>
                                                                            {
                                                                                ((today.getFullYear() === date.getFullYear()) && (today.getMonth() === date.getMonth()) && (today.getDate() === date.getDate())) ?
                                                                                    `오늘`
                                                                                :
                                                                                `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 (${week[date.getDay()]})`
                                                                            }
                                                                        </Text>
                                                                        <View style={{flex: 1, height: 1, backgroundColor: '#EBEBEB', marginHorizontal: 20}} />
                                                                    </View>
                                                                </View>
                                                            )
                                                        }
                                                    })}
                                                    <View key={idx} style={{
                                                        alignItems: 
                                                            proNo === 0 ?
                                                                'flex-end'
                                                            :
                                                                'flex-start',
                                                        marginHorizontal: 20, paddingBottom: (arr.length === idx+1) ? 2 : 12}}>
                                                        <View style={[{
                                                            backgroundColor:
                                                                proNo === 0 ?
                                                                    '#EDF4FF'
                                                                :
                                                                    '#F3F2F2', 
                                                            paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15, maxWidth: '70%'},
                                                            proNo === 0 ?
                                                                {borderBottomRightRadius: 0}
                                                            :
                                                                {borderBottomLeftRadius: 0}
                                                            ]}>
                                                            <ImageContainer>
                                                                <ImageViewContainer onPress={() => navigation.navigate('LessonRoomVideo', { filePath: `${filePath}`, encodeNm: `${encodeNm}` })}><RN.Image></RN.Image></ImageViewContainer>
                                                            </ImageContainer>
                                                        </View>
                                                        <Text style={{fontSize: 12, color: 'gray'}}>
                                                            {
                                                                sendDt ?
                                                                    date.getHours() > 12 ?
                                                                        date.getMinutes() > 9 ?
                                                                            `오후 ${date.getHours()-12}:${date.getMinutes()}`
                                                                        :
                                                                            `오후 ${date.getHours()-12}:${"0"+date.getMinutes()}`
                                                                    :
                                                                        date.getMinutes() > 9 ?
                                                                            `오전 ${date.getHours()}:${date.getMinutes()}`
                                                                        :
                                                                            `오전 ${date.getHours()}:${"0"+date.getMinutes()}`
                                                                : 
                                                                    hour > 12 ?
                                                                        minute > 9 ?
                                                                            `오후 ${hour-12}:${minute}`
                                                                        :
                                                                            `오후 ${hour-12}:${"0"+minute}`
                                                                    :
                                                                        minute > 9 ?
                                                                            `오전 ${hour}:${minute}`
                                                                        :
                                                                            `오전 ${hour}:${"0"+minute}`
                                                            }
                                                        </Text>
                                                    </View>
                                                </>
                                                // <View>
                                                //     <ImageContainer>
                                                //         <ImageViewContainer onPress={() => navigation.navigate('LessonRoomVideo', { filePath: `${filePath}`, encodeNm: `${encodeNm}` })}><RN.Image></RN.Image></ImageViewContainer>
                                                //     </ImageContainer>
                                                // </View>
                                        }
                                    </>
                                )
                            })
                        }
                    </RN.SafeAreaView>
                </RN.ScrollView>
                <RN.View style={{height: 82}}>
                    <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
                        <View style={{width: RN.Dimensions.get('screen').width - 98, height: 48, marginRight: 10, flexDirection: 'row'}}>
                            <TextInput
                                style={{height: 48, borderRadius: 15, borderColor: '#EBEBEB', paddingRight: 40}}
                                onChangeText={setText}
                                value={text}
                            />
                            {text === ""? null:<RN.TouchableOpacity onPress={()=>{SocketSendFunc()}} style={{width: 40, height: 48, right: 40, justifyContent: 'center', alignItems: 'center'}}><Foundation name="check" size={18} color="blue" /></RN.TouchableOpacity>}
                        </View>
                        <RN.TouchableOpacity onPress={()=>{openGallery()}} style={{width: 48, height: 48, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 15, borderColor: '#EBEBEB'}}>
                            <RN.Text style={styles.pageBtnText}>+</RN.Text>
                        </RN.TouchableOpacity>
                    </View>
                </RN.View>
            </RN.SafeAreaView>
                {/* <ImageContainer>
                    <ImageViewContainer onPress={() => navigation.navigate('LessonRoomVideo', { data: 'Dan Abramov' })}><RN.Image></RN.Image></ImageViewContainer>
                </ImageContainer> */}
        </CommonBackground>      
    )


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
    pageBtnText: {fontStyle: 'normal', fontWeight: "400", fontSize: 16, color: '#000000'}
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
    marginTop: 15px;
    padding: 4px 10px;
    background: #E63312;
    border-radius: 3px;
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