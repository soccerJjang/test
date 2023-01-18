import React from 'react';
import * as RN from 'react-native';
import { Video } from 'expo-av'; 
import * as FileSystem from 'expo-file-system';
import styled from 'styled-components';
import Loading from '../../components/Laoding';

const LessonProRoomVideo = (props) => {
    const videoFilePath = props.route.params.filePath;
    const videoEncodeNm = props.route.params.encodeNm;

    const video = React.useRef(null);
    const [record, setRecord] = React.useState(undefined);
    const [status, setStatus] = React.useState({});


    React.useEffect(() => {
        
        let rec = '';
        (async () => {
            await FileSystem.downloadAsync(`http://211.55.64.43:5008/${videoFilePath}/${videoEncodeNm}`, FileSystem.cacheDirectory + `${videoEncodeNm}`)
            .then(data => {
                rec = data.uri;
                console.log('Finishied downloading to ', data.uri);
            })
            .catch(err => {
                console.error(err);
            })
            rec = await FileSystem.getInfoAsync(rec);
            setRecord(rec.uri);
        })();
    }, [])


    if(record != undefined) {
        return (
            <VideoBackground>
                <VideoBox>{console.log(record,"record")}
                    <Video 
                        ref = {video}
                        style = {{width : "100%" , height : "100%"}}
                        source = {{
                            uri: record,
                        }}
                        useNativeControls
                        resizeMode='contain'
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </VideoBox>
            </VideoBackground>
        )
    } else {
        return(
            <Loading/>
        )
    }

}

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


`
const VideoBox = styled.View`
display: flex;
align-items: center;
justify-content: center;
position: relative;
width:100%;
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

export default LessonProRoomVideo;