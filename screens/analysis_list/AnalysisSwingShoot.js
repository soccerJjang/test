import * as React from 'react';
import * as RN from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av'; 
import styled from 'styled-components';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const AnalysisSwingShoot = (props) => {

    const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
    const [hasAudioPermission, setHasAudioPermission] = React.useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);

    const [camera, setCamera] = React.useState(null);
    const [record, setRecord] = React.useState(undefined);
    const [type, setType] = React.useState(props.route.params);
    const [start, setStart] = React.useState(false);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [timer, setTimer] = React.useState(0);

    const navigation = useNavigation();

    React.useEffect(() => {
        (async () => {

            if (Platform.OS === "android") {
                await RN.PermissionsAndroid.requestMultiple([
                    RN.PermissionsAndroid.PERMISSIONS.CAMERA,
                    RN.PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    RN.PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    RN.PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]).then((result)=>{
                    if (result['android.permission.CAMERA']
                    && result['android.permission.WRITE_EXTERNAL_STORAGE']
                    && result['android.permission.READ_EXTERNAL_STORAGE']
                    && result['android.permission.RECORD_AUDIO']
                    === 'granted') {
                        console.log("모든 권한 획득");
                    } else{
                        console.log("권한거절");
                    }
                })
              
            }else{                
                const cameraStatus = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(cameraStatus.status === 'granted');
    
                const audioStatus = await Camera.requestMicrophonePermissionsAsync();
                setHasAudioPermission(audioStatus.status === 'granted');

                const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
                setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');    
            }
        })();

        //console.log("Initial ParmaTest : ", type);
    }, []);

    React.useEffect(() => {
        let interval = null;
        if (start === true) {
                interval = setInterval(() => {
                    setTimer((time) => time + 9.9)
                }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        }
    },[start]);

    const takeVideo = async () => {
        //console.log("takeVideo ParamTest : ", type);
        setStart(true);
        if(camera) {
            const data = await camera.recordAsync({
                quility: "480p",
                maxDuration:10,
            })
            setRecord(data.uri);
        }
    }

    const stopVideo = async () => {
        setStart(false);
        camera.stopRecording();
    }

    if(record) {
        const saveRecord = () => {
            MediaLibrary.saveToLibraryAsync(record).then(() => {
                setRecord(undefined);
            })
        };

        const sendRecord = async () => {
        
            console.log("send !!");
            let getUserData = await SecureStore.getItemAsync('userData');
                getUserData = JSON.parse(getUserData);

            FileSystem.FileSystemUploadOptions = {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'file'
            };

            const userId = createRandomCode(9 - getUserData.user_no.toString().length) + getUserData.user_no.toString() +   "_" + getDate();

            const server = `http://211.55.64.43:5006/file/video/videoUploadProcess?userNo=${getUserData.user_no}&swingType=${type}&userId=${userId}`;
            const realServer = `http://screengo.iptime.org:5008/file/video/videoUploadProcess?userNo=${getUserData.user_no}&swingType=${type.swingType}&clubType=${type.clubType}&userId=${userId}`;
            const realAWSServer = `http://223.130.132.180:5008/file/video/videoUploadProcess?userNo=${getUserData.user_no}&swingType=${type.swingType}&clubType=${type.clubType}&userId=${userId}`;
            const local  = `http://localhost:5006/file/video/videoUploadProcess?userNo=${getUserData.user_no}&swingType=${type}&userId=${userId}`;
            
            const getUpload = await FileSystem.uploadAsync(realAWSServer, record, FileSystem.FileSystemUploadOptions);
            const result = JSON.parse(getUpload.body);


            let today = new Date();                 
            // 시 getHours()
            let hours = today.getHours();
            // 분 getMinutes()
            let minutes = today.getMinutes();
                minutes < 10 ? minutes = "0" + minutes : minutes = minutes; 
            /// 초 getSeconds()
            let seconds = today.getSeconds();
                seconds < 10 ? seconds = "0" + seconds : seconds = seconds;
            let startTime = `${hours}:${minutes}:${seconds}`;

            getUpload.status === 200 && result.success ?
                navigation.navigate("AnalysisAdmob", { userId : result.userId, swingType : type.swingType, clubType : type.clubType , videoLocation : result.videoLocation, startTime}) : alert("동영상 업로드에 실패하였습니다.");
            // const result = await FileApi.sendFile(formData);
            
        }

        /*
        return (
            <RN.SafeAreaView>
                <Video 
                    ref = {video}
                    style = {styles.video}
                    source = {{
                        uri: record,
                    }}
                    useNativeControls
                    resizeMode='contain'
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                {hasMediaLibraryPermission ? <RN.Button title="Save" onPress={saveRecord}/> : undefined}
                {hasMediaLibraryPermission ? <RN.Button title="Send" onPress={sendRecord}/> : undefined}
            </RN.SafeAreaView>
        )*/

        return(
            <>
            <VideoBackground>
                <VideoBox>
                    <Video 
                        ref = {video}
                        style = {styles.video}
                        source = {{
                            uri: record,
                        }}
                        useNativeControls
                        resizeMode='contain'
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </VideoBox>
            </VideoBackground>
            <VideoBtnBox>
                {true ? 
                <SaveBtn title="Save">
                    <BtnText onPress={saveRecord}>저장</BtnText> 
                </SaveBtn>
                : undefined}            
                {true ? 
                <AppendBtn title="Send" >
                    <BtnText onPress={sendRecord}>보내기</BtnText> 
                </AppendBtn>
                : undefined}
            </VideoBtnBox>
            </>
        )

    }
    
    return (
        <RN.View style={{flex: 5}}>
            <RN.View style={styles.CameraContainer}>
                <Camera
                ref = {ref => setCamera(ref)}
                style = {styles.fixedRatio}
                type = {Camera.Constants.Type.back}
                ratio = {'4:3'} />

                {
                    type.swingType === 'rear' ?
                    <RN.Image style={{position: 'absolute', top: 80, left: 120, }} 
                        source = {require('../../images/rear_line04.png')}/>
                    :
                    <RN.Image style={{position: 'absolute', top: 80, left: '50%', marginLeft: -40 }} 
                    source = {require('../../images/front_line04.png')}/>
                }
{/* 
                <RN.Image style={{position: 'absolute', justifyContent: 'center', top: 80, left: 120, }} 
                source={(type.swingType === 'rear')?require('../../images/rear_line04.png'):require('../../images/front_line04.png')} /> */}
                <NoticeView><NoticeText><Text style={{ color: "#fff", textAlign: "center", fontSize: 12, fontWeight: "600" }}>안전을 위해서 적정거리를 유지하시기 바랍니다.</Text></NoticeText></NoticeView>
            </RN.View>
            <RN.View style = {styles.buttonsView}>
                <RN.View style={{ backgroundColor :"black", borderColor : "black"}}>
                    <RN.Text style={{color : "white", textAlign : "center", marginTop : 20}}>{("0" + Math.floor((timer / 1000) % 60)).slice(-2)} : {("0" + Math.floor((timer / 10) % 100)).slice(-2)}</RN.Text>
                </RN.View>
                <RN.View style = {styles.flashView}>

                    <RN.TouchableOpacity 
                            style = {type.swingType == 'rear' ? styles.flashTouch : styles.flashTouchOff }
                            onPress = {() => {
                                setType({...type, swingType : 'rear'});
                                console.log(type);
                            }}
                            > 
                        <RN.Text style={type.swingType == 'rear' ? {color : '#000000'} : {color : '#FFFFFF'}}>REAR</RN.Text>

                        
                    </RN.TouchableOpacity>


                    <RN.View style={{width: 15}} />

                    <RN.TouchableOpacity 
                        style = {type.swingType == 'front' ? styles.flashTouch : styles.flashTouchOff }
                        onPress = {() => {
                            setType({...type, swingType : 'front'});
                            console.log(type);
                        }}
                    >
                        <RN.Text style={type.swingType == 'front' ? {color : '#000000'} : {color : '#FFFFFF'}}>FRONT</RN.Text>
                    </RN.TouchableOpacity>

                    <RN.View style={{width: 15}} />

                    <RN.TouchableOpacity 
                        style = {type.clubType == 'driver' ? styles.flashTouch02 : styles.flashTouchOff }
                        onPress = {() => {
                            setType({...type, clubType : 'driver'});
                            console.log(type);
                        }}
                    >
                        <RN.Text style={type.clubType == 'driver' ? {color : '#000000'} : {color : '#FFFFFF'}}>DRIVER</RN.Text>
                    </RN.TouchableOpacity>

                    <RN.View style={{width: 15}} />

                    <RN.TouchableOpacity 
                        style = {type.clubType == 'iron' ? styles.flashTouch02 : styles.flashTouchOff }
                        onPress = {() => {
                            setType({...type, clubType : 'iron'});
                            console.log(type);
                        }}
                    >
                        <RN.Text style={type.clubType == 'iron' ? {color : '#000000'} : {color : '#FFFFFF'}}>IRON</RN.Text>
                    </RN.TouchableOpacity>
                </RN.View>



                <RN.View style = {styles.iconView}>
                    <CircleWrap>
                        <CircleLine>
                            {
                                (!start)
                                ? <Circle backgroundColor={'white'} onPress={() => takeVideo()}></Circle>
                                : <Circle backgroundColor={'red'} onPress={() => stopVideo()}></Circle>
                            }
                        </CircleLine>
                    </CircleWrap>
                </RN.View>
            </RN.View>        
        </RN.View>
        
    );
        
}

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
const CircleWrap = styled.View `
    margin: 0 auto;
    border-radius: 50px;
    border: 4px solid white;
`
const CircleLine = styled.View `
    margin: 0 auto;
    border-radius: 50px;
    border: 5px solid black;
`    
const Circle = styled.TouchableOpacity`
    margin: 0 auto;
    padding: 20px;
    width: 65px;
    height: 65px;
    border-radius: 50px;
    background-color: ${(props) => props.backgroundColor} ;
`

const styles = RN.StyleSheet.create({
    CameraContainer: {
        flex: 1,
        position: 'relative',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio:1,
    },
    video: {
        alignSelf:'center',
        width: 350,
        height: 220,
    },
    flashView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
    },
    flashTouch: {
        width: 80,
        height: 32,
        backgroundColor: '#5CEEA7',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flashTouch02: {
        width: 80,
        height: 32,
        backgroundColor: '#42c8f5',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flashTouchOff: {
        width: 80,
        height: 32,
        backgroundColor: '#000000',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsView: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    iconView: {
        marginBottom: 41,
    }
});


// 비디오 부분
 const VideoBackground = styled.View`
    display: flex;
    align-items: center;
    width:100%;
    background-color: #fff;
    padding : 88px 53px;
   
`
 const VideoBox = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width:270px;
    height:350px;
`

 const PlayBtn = styled.Image`
    width:92px;
    height:92px;
`

 const VideoBtnBox = styled.View`
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width:100%;
    height:200px;
    background-color: black;
`

 const SaveBtn = styled.TouchableOpacity`
    display:flex;
    justify-content: center;
    width: 165px;
    height:60px;
    border-radius: 12px;
    background-color: #ffffff;
`

 const AppendBtn = styled.TouchableOpacity`
    display:flex;
    justify-content: center;
    width: 165px;
    height:60px;
    border-radius: 12px;
    background-color: #fff;
    margin-left: 5px;
`

 const BtnText = styled.Text`
    font-size: 16px;
    text-align: center;
    color:#000000;
    font-weight: 700;    
`
const NoticeView = styled.View`
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
`
const NoticeText = styled.View`
    margin: 0 40px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
`

export default AnalysisSwingShoot;