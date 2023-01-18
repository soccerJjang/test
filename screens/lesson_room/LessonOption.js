import React, { useEffect, useState } from 'react';
import { View, Alert, Platform} from 'react-native';
import { 
    CommonBackground,
} from '../../styled-components/Common';
import {
    AnalysisSwingWrap,
    SwingNoticeBox,
    BgNotice,
    SwingNoticeTit,
    SwingNoticeTxt,
    AnalysisSwingCon
} from '../../styled-components/analysis_list/AnalysisSwing';
import {
    AnalysisSwingBox,
    SwingTit
}
from '../../styled-components/analysis_list/AnalysisMenu';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import * as VideoThumbnails from 'expo-video-thumbnails';

const AnalysisMenu = (props) => {

    const [type1, setType1] = useState(null)
    const [type2, setType2] = useState(null)
    const [id, setId] = useState(null)
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const v = props.route.params.videoListConst

    const navigation = props.navigation;

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

    const openGallery = async (swingType, clubType) => {
        const userData = await SecureStore.getItemAsync("userData");
        const userNo = JSON.parse(userData).user_no;
        
        const userId = createRandomCode(9 - userNo.toString().length) + userNo.toString() +   "_" + getDate();
        setId(userId)
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
                try {
                    const { uri } = await VideoThumbnails.getThumbnailAsync(
                      `${result.uri}`,
                      {
                        time: 15000,
                      }
                    );
                    setVideo(result)
                    setImage(uri);
                } catch (e) {
                    console.warn(e);
                }
                // setImage(uri);

                /*
                // 임시방편 코드 
                FileSystem.FileSystemUploadOptions = {
                     httpMethod: 'POST',
                     uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                     fieldName: 'file'
                };

                let body = new FormData()
                body.append("file", {uri: result.uri, name: `name.${result.uri.split(".")[1]}`, type: `${result.type}/${result.uri.split(".")[1]}`})
                
                const uploadServer = `http://223.130.132.180:5008/file/video/videoUploadProcess`
                
                const getUpload = await FileSystem.uploadAsync(uploadServer, result.uri, FileSystem.FileSystemUploadOptions);
                const uploadResult = JSON.parse(getUpload.body);
                console.log('uploadResult', uploadResult);
                */

                // getUpload.status === 200 && uploadResult.success ?
                //     props.navigation.navigate("AnalysisAdmob", { userId, swingType, clubType , videoLocation : uploadResult.videoLocation, startTime}) : alert("동영상 업로드에 실패하였습니다.");
            } else {
                RN.Alert.alert('비디오파일만 업로드 가능합니다.');
                // props.route.params.videoListConst[1]([{dd: "asas"},{}])
                // props.route.params.videoListConst[1]([props.route.params.videoListConst[0][0],{dd: "asaskkk"}])
            }
        }
    }

    useEffect(()=>{
        if (image !== null) {
            console.log(props.route.params.num)
            if (props.route.params.num === 0) {
                props.route.params.videoListConst[1]([{
                    thumbnail: image,
                    uri: video?.uri,
                    type1: type1,
                    type2: type2,
                    id: id
                },props.route.params.videoListConst[0][1]])
            } else {
                props.route.params.videoListConst[1]([
                    props.route.params.videoListConst[0][0],{
                        thumbnail: image,
                        uri: video?.uri,
                        type1: type1,
                        type2: type2,
                        id: id
                }])
            }
            
            navigation.pop();
        }
    },[image])

    return (
        <CommonBackground>
            <AnalysisSwingWrap>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisSwingCon onPress={() => {setType1("front"), setType2("drive"), openGallery()}}>
                    <View>
                        <SwingTit>FRONT - Driver</SwingTit>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisSwingCon onPress={() => {setType1("rear"), setType2("drive"), openGallery()}}>
                    <View>
                        <SwingTit>REAR - Driver</SwingTit>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisSwingCon onPress={() => {setType1("front"), setType2("iron"), openGallery()}}>
                    <View>
                        <SwingTit>FRONT - Iron</SwingTit>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisSwingCon onPress={() => {setType1("rear"), setType2("iron"), openGallery()}}>
                {/* <AnalysisSwingCon onPress={() => {AA()}}> */}
                    <View>
                        <SwingTit>REAR - Iron</SwingTit>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>

            </AnalysisSwingWrap>
        </CommonBackground>
    )
}
export default AnalysisMenu;