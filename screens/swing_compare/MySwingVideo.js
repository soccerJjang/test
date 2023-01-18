import React from 'react';
import * as RN from 'react-native';
import { Video } from 'expo-av'; 
import * as FileSystem from 'expo-file-system';
import styled from 'styled-components';

const MySwingVideo = (props) => {

    

    const video = React.useRef(null);
    const [record, setRecord] = React.useState(undefined);
    const [status, setStatus] = React.useState({});


    React.useEffect(() => {

        let id = props.route.params.id;
        let defaultVideoUri = "http://223.130.132.180:5008/screengo/service1/media/videos/" + id + ".mp4";
        let moviePath = props.route.params.moviePath;

        if(moviePath != null) {
            moviePath = moviePath.replace(/\"/g, '');
            moviePath = moviePath.replace("/home/dev1/data/screengo_api/", "http://223.130.132.180:5008/screengo/");
            defaultVideoUri = moviePath;
        }
        
        let rec = '';
        (async () => {
            await FileSystem.downloadAsync(defaultVideoUri, FileSystem.cacheDirectory + "video.mp4")
            .then(data => {

                rec = data.uri;
                
                console.log('Finishied downloading to ', data.uri)
            })
            .catch(err => {
                console.error(err);
            })
            rec = await FileSystem.getInfoAsync(rec);
            setRecord(rec.uri);
            
        })();
    }, [])


    return (
        <VideoBackground>
            <VideoBox>
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
}


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

export default MySwingVideo;