import React, { useEffect, useState } from 'react';
import {
    CommonThreeDepthContainer,
} from '../styled-components/Common';
import {
    AddressContainer,
    AddressImageView,
    AddressImage,    
    DrawingButtonBox,
    DrawingCircle,
    DrawingImg,
    DrawingCircleEdit,
} from '../styled-components/analysis_draw/rear/Address';
import PhotoEditor from '@baronha/react-native-photo-editor';
import { Alert, Image, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import Config from 'react-native-config';
import Loading from './Laoding';


const DrawingView = (props) => {

    const [loadedImage, setLoadedImage] = useState();
    const [photo, setPhoto] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);

    const data = props.data.params;
    
    
    const type = props.data.type;
    const idx = props.data.idx * 2 < 10 ? "0" + props.data.idx * 2 : props.data.idx * 2;
    const jpg = 'frame_'+idx+'_'+type+".jpg";

    React.useEffect(() => {

        let imgPath = JSON.stringify(data.img_path.replace("/home/dev1/data/screengo_api/", "") + jpg);
        imgPath = imgPath.substring(1, imgPath.length -1);
        //imgPath = "/screengoDev/service1/frames" + imgPath; 
        imgPath = "/screengo" + imgPath; 
        imgPath = imgPath.replace(/\\/g, "/").replace(/\"/gi, "");

        let all = '';
        (async () => {
            const midiaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(midiaLibraryStatus.status === 'granted');

            console.log("http://223.130.132.180:5008" + imgPath);
            
            /*
            await FileSystem.downloadAsync("http://223.130.132.180:5008" + imgPath, FileSystem.cacheDirectory + type + '.jpg')
            .then(data => {
                all = data.uri;
                console.log('Finishied all downloading to ', data.uri);
            })
            .catch(error => {
                console.error(error);
            })
            all = await FileSystem.getInfoAsync(all);
            */
            //setLoadedImage(all.uri);
            setLoadedImage("http://223.130.132.180:5008" + imgPath);
        })();
    }, [])


    const stickers = [];
    const onEdit = async () => {

        
        console.log(loadedImage);
        try {
            const path = await PhotoEditor.open({
                path: loadedImage,
                // path: photo.path,
                stickers,
            });
            setPhoto({
                ...photo,
                path,
            });

        } catch (e) {
            console.log('e', e);
        }

    };

    const onSave = async() => {
        if(photo == null){
            let all = '';
            await FileSystem.downloadAsync(loadedImage, FileSystem.cacheDirectory + type + '.jpg')
            .then(data => {
                all = data.uri;
                console.log('Finishied all downloading to ', data.uri);
            })
            .catch(error => {
                console.error(error);
            })
            all = await FileSystem.getInfoAsync(all);
            await MediaLibrary.saveToLibraryAsync(all.uri);
        }else {
            await MediaLibrary.saveToLibraryAsync(photo.path);
        }

        Alert.alert("저장되었습니다.");
         
    }

    const onShare = async() => {

        let shareUri = '';
        console.log(loadedImage);
        if(photo !== null) {
            shareUri = photo.path;
        } else {
            let all = '';
            await FileSystem.downloadAsync(loadedImage, FileSystem.cacheDirectory + type + '.jpg')
            .then(data => {
                all = data.uri;
                console.log('Finishied all downloading to ', data.uri);
            })
            .catch(error => {
                console.error(error);
            })
            all = await FileSystem.getInfoAsync(all);
            shareUri = all.uri;   
        }
        Sharing.shareAsync(shareUri);
    };


    if(loadedImage != null ) {
        return (
                <CommonThreeDepthContainer>
                    <AddressContainer>
                        <AddressImageView>
                            <AddressImage 
                                source={photo == null ? {uri : loadedImage} : {uri : photo.path}}
                            />
                                                                
                        </AddressImageView>

                        <DrawingButtonBox>
                            <DrawingCircle style={{marginRight:16}} onPress={onShare}>
                                <DrawingImg source={require("../images/ico-share.png")}></DrawingImg>
                            </DrawingCircle>
    
                            <DrawingCircle onPress={onSave}>
                                <DrawingImg source={require("../images/ico-download.png")}></DrawingImg>
                            </DrawingCircle>
    
                            <DrawingCircleEdit onPress={onEdit}>
                                <DrawingImg source={require("../images/ico-pencil.png")}></DrawingImg>    
                            </DrawingCircleEdit> 
                        </DrawingButtonBox>
    
                        {/* 
                            편집 기능 작업 
                            <AddressButtonView>
                                <AddressAntDesignView>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>          
                                        <AntDesignView>
                                            <AntDesign name="link" size={20} color="black" />
                                        </AntDesignView>
                                        <AntDesignView>
                                            <AntDesign name="download" size={20} color="black" />
                                        </AntDesignView>
                                    </View>
                                    <AntDesignDownloadView>
                                        <AntDesign name="download" size={20} color="white" />
                                    </AntDesignDownloadView>
                                </AddressAntDesignView>
                            </AddressButtonView>
                         */}
                    </AddressContainer>
                </CommonThreeDepthContainer>
        )

    }else {
        return (
            <Loading/>
        )
    }
}
export default DrawingView;