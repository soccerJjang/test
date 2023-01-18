import * as React from 'react';
import * as RN from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av'; 
import styled from 'styled-components';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

const CameraTest = (props) => {
    const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
    const [hasAudioPermission, setHasAudioPermission] = React.useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);

    const [camera, setCamera] = React.useState(null);
    const [record, setRecord] = React.useState(undefined);
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [start, setStart] = React.useState(false);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [upload, setUpload] = React.useState(undefined);

    

    React.useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasAudioPermission(audioStatus.status === 'granted');

            const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');

        })();
    }, []);

    React.useEffect(() => {
        console.log(camera);
    }, [camera]);

    const takeVideo = async () => {
        console.log("takeVideo");
        setStart(true);
        if(camera) {
            const data = await camera.recordAsync({
                maxDuration:10
            })
            setRecord(data.uri);
        }
    }

    if(record) {
        console.log(record);
        const saveRecord = () => {
            MediaLibrary.saveToLibraryAsync(record).then(() => {
                setRecord(undefined);
            })
        };

        const sendRecord = () => {
            
            (async () => {
                

                const userData = await SecureStore.getItemAsync("userData"); 
                const userNo = JSON.parse(userData).user_no;
                

                FileSystem.FileSystemUploadOptions = {
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: 'file'
                };
              
                const server = `http://211.55.64.43:5006/file/uploadTest?userNo=${userNo}`;

                const getUpload = await FileSystem.uploadAsync(server, record, FileSystem.FileSystemUploadOptions);
                setUpload(getUpload);
                // const result = await FileApi.sendFile(formData);
            })();
        }

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
        )
    }

    const stopVideo = async () => {
        console.log("stopVideo");
        camera.stopRecording();
        setStart(false);
    }

    if(hasCameraPermission === null || hasAudioPermission === null) {
        return <RN.View />;
    }

    if(hasCameraPermission === false || hasAudioPermission === false) {
        return <RN.Text>No access to camera</RN.Text>
    }

    return (
        <RN.View style={{flex: 5}}>
            <RN.View style={styles.CameraContainer}>
                <Camera
                ref = {ref => setCamera(ref)}
                style = {styles.fixedRatio}
                type = {type}
                ratio = {'4:3'} />
            </RN.View>
            <RN.View style = {styles.buttonsView}>
                <RN.View style = {styles.flashView}>
                    <RN.TouchableOpacity 
                        style = {styles.flashTouch}
                        onPress = {() => {
                            setType( Camera.Constants.Type.back);
                        }}
                    >
                        <RN.Text>REAR</RN.Text>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity 
                        style = {styles.flashTouch}
                        onPress = {() => {
                            setType(Camera.Constants.Type.front);
                        }}
                    >
                        <RN.Text>FRONT</RN.Text>
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
        flex: 1
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


export default CameraTest;

