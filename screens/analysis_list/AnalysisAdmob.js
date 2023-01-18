import * as React from "react";
import * as RN from 'react-native';
import { Video } from "expo-av";
import * as FileSystem from 'expo-file-system';
import styled from "styled-components";
import Loading from "../../components/Laoding";
import { article } from "../../api/article";
import { set } from "react-native-reanimated";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const AnalysisAdmob = ({navigation, route}) => {

    const [recordList, setRecordList] = React.useState(null);
    const [record, setRecord] = React.useState(null);
    const [didJustFinish, setDidJustFinish] = React.useState(false);
    const [firstTime, setFirstTime] = React.useState(true);
    const [randomCount, setRandomCount] = React.useState(0);

    const [video1, setVideo1] = React.useState(true);
    const [video2, setVideo2] = React.useState(false);
    const [video3, setVideo3] = React.useState(false);

    const admobVideo = React.useRef();
    const admobVideo2 = React.useRef();
    const admobVideo3 = React.useRef();

    React.useEffect(() => {
        if(record == null) { // 광고영상 가져오기
            const LOCAL_URL = 'http://localhost:5006';
            const DEV_URL = 'http://211.55.64.43:5006';
            const AWS_URL = 'http://223.130.132.180:5009/file/file/getAdmobVideoPath';
            
            //const server = `${DEV_URL}/file/file/admobVideoDownload?test=27`;
            (async () => { 


                //const downloadLink = await article.getAdmobVideoPath();
                const downloadLink = await article.getAdmobVideoPathList();
                setRecordList(downloadLink);

                console.log("광고영상 다운로드");
                console.log(downloadLink);

                

    
                

                
                /*
                let newDownloadLink = new Array();
                downloadLink.map((item, i) => {
                    newDownloadLink.push(`http://223.130.132.180:5009/upload/${item.FILE_PATH}/${item.NEW_FILE_NM}`);
                });
                console.log(newDownloadLink);            
                */


                setRecord(downloadLink);                                
            })();
        } 
    }, []);

    function recordRandomCount() {
        if(recordList) {
            return Math.floor(Math.random() * ((recordList.length -1) - 0 + 1)) + 0;
        }
    }
    // 진행바
    const layout = RN.useWindowDimensions();
    const counter = React.useRef(new RN.Animated.Value(0)).current;
    const [count, setCount] = React.useState(0);
    const [analysis, setAnalysis] = React.useState(false);
    const [finished, setFinished] = React.useState(false);

      const load = count => {
        RN.Animated.timing(counter, {
          toValue: count,
          // 애니메이션 주기 (퍼센트가 추가되는 시간(setInterval 주기)과 동일하게 맞춰주세요)
          duration: 500,
          useNativeDriver: false
        }).start();
      };
    
      const width = counter.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
      });


      // 분석로직 
      const finishedAnalysis = async () => {
            
        let result = null;

        // 분석 결과 가져오기
        let selectUrlDev = `http://211.55.64.43:5006/article/selectAnalysisOne?userId=${route.params.userId}`;
        let selectUrlLocal = `http://localhost:5008/article/selectAnalysisOne?userId=${route.params.userId}`;
        let selectUrlReal = `http://screengo.iptime.org:5008/article/selectAnalysisOne?userId=${route.params.userId}`;
        let selectUrlAWSReal = `http://223.130.132.180:5008/article/selectAnalysisOne?userId=${route.params.userId}`;
        
    
        await fetch(selectUrlAWSReal, {method: 'GET'})
        .then(res => {                                    
            return res.json();
        })
        .then((json)=> {
            if(json.length > 0) {
                result = json[0];  
                
                let today = new Date();                 
                // 시 getHours()
                let hours = today.getHours();
                // 분 getMinutes()
                let minutes = today.getMinutes();
                    minutes < 10 ? minutes = "0" + minutes : minutes = minutes; 
                /// 초 getSeconds()
                let seconds = today.getSeconds();
                    seconds < 10 ? seconds = "0" + seconds : seconds = seconds;

                let miliSeconds = today.getMilliseconds();
                let endTime = `${hours}:${minutes}:${seconds} / ${miliSeconds}`;
                
                console.log(endTime);
                RN.Alert.alert(
                    "분석 완료",
                    ""
                    ,
                    [
                    {
                        text: "이동하기",
                        onPress: () => navigation.reset({routes: [{name: 'AnalysisSwingTab', params: {userId : route.params.userId} }]}),
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
                );          
                                
            }else {                                            
                RN.Alert.alert(
                    "분석 실패",
                    "동영상을 다시 업로드해주세요.",
                    [
                    {
                        text: "이동하기",
                        onPress: () => navigation.reset({routes: [{name: 'AnalysisSwing'}]}),
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
                );                                            
            }
        });
      }
    
    if(record != null) {
        return (
            <Container>
                <VideoContainer>
                    {record != null ?   
                        <>
                        <Video 
                            ref = {admobVideo}
                            style={video1 ? {width : "100%", height :"100%"} : {width : 0, height :0, display :'none'}}
                            source = {{
                                uri: record[0],
                            }}
                            // useNativeControls 사용자가 동영상 컨트롤 안되도록 
                            resizeMode='contain'                
                            isLooping={false} // 반복
                            shouldPlay={true} // autoplay
                            onLoad={ async (status) => { // 비디오 시작될 때                 
                                
                                let testVideo = '/home/dev1/data/screengo_api/service1/media/videos/M_01_r_d.mp4'
                                let realVideo = route.params.videoLocation
                                let realVideoExtension = realVideo.substring(realVideo.lastIndexOf('.') + 1);
    
                                /* 전체 변환으로 변경
                                // MOV 파일이라면 변환작업 처리 
                                if(realVideoExtension == 'MOV' || realVideoExtension == 'mov' ) {                                
                                */

                                const userId = realVideo.substring(realVideo.lastIndexOf("/") + 1 , realVideo.lastIndexOf("."));
                                const filePath = realVideo.substring(0, realVideo.lastIndexOf("/"));

                                console.log(userId);
                                console.log(filePath);

                                const convertAPI = `http://223.130.132.180:5009/videoUploadProcess/convert.do?userId=${userId}&filePath=${filePath}`;
                                
                                await fetch(convertAPI)
                                .then((response) => {
                                    console.log("변환처리 시작");
                                    console.log(response);
                                    realVideo =  filePath + "/" + userId + ".mp4";
                                });
                                /*   
                                } */
                                if(status.isLoaded) {    
                                    console.log("로드완료");
                                    // 소켓통신
                                    const golfSocket = new WebSocket("ws://223.130.132.180:9990");
                                    golfSocket.onopen = () => {
                                        console.log("scoket connected !");
                                        console.log(route.params.videoLocation);
                                        const sendData = {
                                            "id": route.params.userId,
                                            "file-name": realVideo,
                                            "swing-type": route.params.swingType, 
                                            "club-type": route.params.clubType 
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


                                            // 분석 상태 업데이트 쳐주기
                                            let updateUrlDev = `http://211.55.64.43:5006/article/updateAnalysis?userId=${route.params.userId}`;
                                            let updateUrlLocal = `http://localhost:5006/article/updateAnalysis?userId=${route.params.userId}`;
                                            let updateUrlReal = `http://screengo.iptime.org:5008/article/updateAnalysis?userId=${route.params.userId}`;
                                            let updateUrlAWSReal = `http://223.130.132.180:5008/article/updateAnalysis?userId=${route.params.userId}`;
                                                                                    
                                            new Promise((resolve, rejection) => {
                                                fetch(updateUrlAWSReal, {method: 'GET'})
                                                .then(res => {                            
                                                    return res.json();
                                                })
                                                .then(json => {
                                                    console.log("SuccessResult");
                                                    
                                                    if(json.success) {                                                        
                                                        setAnalysis(true);
                                                    }                                            
                                                    return json;
                                                })
                                            });
    
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
                                        setFinished(true);
                                        finishedAnalysis();
                                      };                                                                                        
                                }                                          
                            }}
                            onPlaybackStatusUpdate={ //영상 상태 업뎃될때마다
                                async (status) => {       
                                    
                                    if(status.didJustFinish) { // 영상 끝나면
                                        setVideo1(false);
                                        setVideo2(true);                                                                                
                                    }
                                    if(status.isLoaded && count <= 100 && !finished && firstTime){ // 영상 진행 중 (진행 Bar) 
                                        const {playableDurationMillis , progressUpdateIntervalMillis, positionMillis } = status; 
                                        let per = Math.floor(positionMillis / playableDurationMillis * 100);
                                            if(per <100) {
                                                setCount(per);
                                                    load(per);
                                            }   
                                                                  
                                    }
                                }
                            }                     
                        />       
                                     
                        {                            

                            video2 ?
                            <Video
                            ref = {admobVideo2}
                            style={video2 ? {width: "100%", height: "100%"}: {display:'none'}}
                            source = {{
                                uri: record[recordRandomCount()],
                            }}                
                            resizeMode='contain'                        
                            shouldPlay={true}   
                            isLooping={false} // 반복                     
                            onPlaybackStatusUpdate={ 
                                async(status) => {
                                    if(status.didJustFinish) { // 영상 끝나면
                                        setVideo2(false)
                                        setVideo3(true);
                                    }
                                }
                            }
                            >
                            </Video>
                            :
                            null
                            
                        }
                        

                        {
                            video3 ?
                            <Video
                            ref = {admobVideo}
                            style={video3 ? {width: '100%', height : '100%'}: null}
                            source = {{
                                uri: record[recordRandomCount()],
                            }}                            
                            shouldPlay={true}   
                            isLooping={true} // 반복          
                            resizeMode='contain'          
                            onPlaybackStatusUpdate={ 
                                async(status) => {
                                    if(status.didJustFinish) { // 영상 끝나면
                                        //setVideo3(false);
                                    }
                                }
                            }
                            >
                            </Video>
                            :
                            null
                        
                        }
                        </>                  
                        :
                        null
                    }
                </VideoContainer>            
                <ProgressText01>{Math.floor(count)}%</ProgressText01>
                <ProgressBarBlock width={layout.width}>
                    <RN.Animated.View
                        style={{ backgroundColor: "#5CEEA7", borderRadius: count, width}}
                    />
                </ProgressBarBlock>
                <ProgressText02>영상이 업로드 중에 있습니다. 조금만 기다려 주세요.</ProgressText02>
            </Container>
    
        );

    }else {
        return(
            <Loading/>
        )
    }
    
}

export default AnalysisAdmob;

const Container = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: black;
`;

const VideoContainer = styled.View`
    position: relative;
    width: 100%;
    height: 85%;
`

const ProgressText01 = styled.Text`
    color:#FFFFFF;
    font-weight: 700;
    font-size: 14px;
    width: 100%;
    text-align: center;
    padding-bottom: 5px;
`;

const ProgressText02 = styled.Text`
    color:#FFFFFF;
    font-weight: 400;
    font-size: 14px;
    width: 100%;
    text-align: center;
    padding-top: 8px;
`;

const ProgressBarBlock = styled.View`
  height: 8px;
  flex-direction: row;
  width: 100%;
  background-color: #eeeeee;
  border-radius: 10px;
`;