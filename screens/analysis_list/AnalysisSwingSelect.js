import React from 'react';
import * as RN from 'react-native';
import * as CM from '../../styled-components/Common';
import * as ST from '../../styled-components/analysis_list/AnalysisSwing';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import styled from "styled-components";
import Config from 'react-native-config';


const AnalysisSwingSelect = (props) => {
    const BASE_URL = 'http://screengo.iptime.org';
    const DEV_URL = 'http://211.55.64.43:5006';
    const LOCAL_URL = 'http://localhost:5006';


    const video = React.useRef(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);
    const [shadow, setShadow] = React.useState({});
    const [userData, setUserData] = React.useState({});

    React.useEffect(() => {
        (async () => {
            await SecureStore.getItemAsync('userData')
            .then(data => JSON.parse(data))
            .then(parseData => setUserData(parseData));
        })();
        
        if(RN.Platform.OS === 'ios') {
            setShadow(
                { 
                    shadowColor: "#000", 
                    shadowOpacity: 0.1, 
                    shadowOffset: { width: 0, height: 5 }, 
                    shadowRadius: 10 
                   } 
           )
       } else {
           setShadow(
               {
                   elevation: 15
               }
           )
       }
    }, []);

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

                // 임시방편 코드 
                FileSystem.FileSystemUploadOptions = {
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: 'file'
                };

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
                
                const server = `http://211.55.64.43:5006/file/video/videoUploadProcess?userNo=${userNo}`;
                const local  = `http://localhost:5006/file/video/videoUploadProcess?userNo=${userNo}`;
                const realServer = `http://screengo.iptime.org:5008/file/video/videoUploadProcess?userId=${userId}&userNo=${userNo}&swingType=${swingType}&clubType=${clubType}`
                const realAWSServer = `http://223.130.132.180:5008/file/video/videoUploadProcess?userId=${userId}&userNo=${userNo}&swingType=${swingType}&clubType=${clubType}&startTime=${startTime}`
                
                const getUpload = await FileSystem.uploadAsync(realAWSServer, result.uri, FileSystem.FileSystemUploadOptions);
                const uploadResult = JSON.parse(getUpload.body);

                getUpload.status === 200 && uploadResult.success ?
                    props.navigation.navigate("AnalysisAdmob", { userId, swingType, clubType , videoLocation : uploadResult.videoLocation, startTime}) : alert("동영상 업로드에 실패하였습니다.");
            } else {
                RN.Alert.alert('비디오파일만 업로드 가능합니다.');
            }

        }

    }
    
    return (
        <CM.CommonBackground>
            <ST.AnalysisSwingWrap>
                <AnalysisSwingBox
                    style={shadow}
                >
                    <ST.AnalysisSwingCon
                        onPress = {() => { 
                            RN.Alert.alert(

                                "핸드폰을 세로로 세워서 촬영한 영상만 업로드해주세요!",
                                "",
                                [
                                {
                                    text: "확인",
                                    onPress: () => openGallery('front', 'driver'),
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
                            }}
                    >
                        <RN.View>
                            <SwingTit>Front - Driver</SwingTit>
                        </RN.View>
                        <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                    </ST.AnalysisSwingCon>
                </AnalysisSwingBox>

                <AnalysisSwingBox
                    style={shadow}
                >
                <ST.AnalysisSwingCon
                    onPress = {() => { 
                        RN.Alert.alert(

                            "핸드폰을 세로로 세워서 촬영한 영상만 업로드해주세요!",
                            "",
                            [
                            {
                                text: "확인",
                                onPress: () => openGallery('rear', 'driver'),
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
                      
                    }}
                >
                        <RN.View>
                            <SwingTit>Rear - Driver</SwingTit>
                        </RN.View>
                        <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                    </ST.AnalysisSwingCon>
                </AnalysisSwingBox>


                <AnalysisSwingBox
                    style={shadow}
                >
                <ST.AnalysisSwingCon
                    onPress = {() => { 
                        RN.Alert.alert(

                            "핸드폰을 세로로 세워서 촬영한 영상만 업로드해주세요!",
                            "",
                            [
                            {
                                text: "확인",
                                onPress: () => openGallery('front', 'iron') ,
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
                    }}
                >
                        <RN.View>
                            <SwingTit>Front - Iron</SwingTit>
                        </RN.View>
                        <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                    </ST.AnalysisSwingCon>
                </AnalysisSwingBox>
                <AnalysisSwingBox
                    style={shadow}
                >
                <ST.AnalysisSwingCon
                    onPress = {() => { 
                        
                        RN.Alert.alert(

                            "핸드폰을 세로로 세워서 촬영한 영상만 업로드해주세요!",
                            "",
                            [
                            {
                                text: "확인",
                                onPress: () => openGallery('rear', 'iron'),
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
                    }}
                >
                        <RN.View>
                            <SwingTit>Rear - Iron</SwingTit>
                        </RN.View>
                        <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                    </ST.AnalysisSwingCon>
                </AnalysisSwingBox>
            </ST.AnalysisSwingWrap>
        </CM.CommonBackground>
    )

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


const AnalysisSwingBox = styled.View`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    padding: 32px 20px;
    border: 1px solid #EEEEEE;
    border-radius: 12px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.5);
    background: #fff;   
`

const SwingTit = styled.Text `
    font-size: 18px;
    color: #1a1d1e;
    font-weight: 600;
`
export default AnalysisSwingSelect;