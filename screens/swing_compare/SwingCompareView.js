import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import * as RN from 'react-native';
import styled from "styled-components";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as FileSystem from 'expo-file-system';


const SwingCompareView = () => {

    const [sceneNames, setSceneNames] = React.useState(['/frame_02_address.jpg', 
    '/frame_04_take_away.jpg',  '/frame_06_back_swing.jpg', '/frame_08_back_swing_top.jpg', '/frame_10_down_swing.jpg', '/frame_12_impact.jpg', '/frame_14_release.jpg', '/frame_16_finish.jpg' ]);
    const [userPhotoNames, setUserPhotoNames] = React.useState(['/frame_02_address.jpg', 
    '/frame_04_take_away.jpg',  '/frame_06_back_swing.jpg', '/frame_08_back_swing_top.jpg', '/frame_10_down_swing.jpg', '/frame_12_impact.jpg', '/frame_14_release.jpg', '/frame_16_finish.jpg' ])

    const route = useRoute();
    const [photoPath, setPhotoPath] = React.useState(route.params != null && route.params.proPhotoPath != undefined ? route.params.proPhotoPath : null);

    
    const navigation = useNavigation();

    useEffect(async ()=> {
        
        FileSystem.readDirectoryAsync()
        await FileSystem.downloadAsync(route.params.proPhotoPath + userPhotoNames[0], FileSystem.cacheDirectory + userPhotoNames[0] + '.jpg')
        .then(data => {
            if(data.status == 404) {

                let changePro = route.params.proPhotoPath.split("/");
                    changePro[8] = "Lee_Seung_Hyo";
                    changePro.join("/");

                setPhotoPath(changePro);                
            }
        })
        .catch(error => {
            console.error(error);
        })

    }, [])


    
    return(
        <ImageContainer>
            
            <ImageInner onPress= {async ()=> {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
                navigation.goBack();
            }}>

                <ProContainer>
                {
                    sceneNames.map((item, idx) => {
                                            
                        // if(route.params != null && route.params.proPhotoPath != undefined){                            
                        //     return (
                        //         <ImageBox key={"proImage" + idx}>
                        //         <ImageItem source={{uri : route.params.proPhotoPath + userPhotoNames[idx]}}></ImageItem>                            
                        //         </ImageBox>                                                                                            
                        //     )
                        // }

                        if(photoPath != null && photoPath != undefined){                            
                            return (
                                <ImageBox key={"proImage" + idx}>
                                <ImageItem source={{uri : photoPath + userPhotoNames[idx]}}></ImageItem>                            
                                </ImageBox>                                                                                            
                            )
                        }
                
                    })
                }
                </ProContainer>

                <UserContainer>
                {
                    sceneNames.map((item, idx) => {
                                            
                        if(route.params != null && route.params.userPhotoPath != undefined){
                            console.log(route.params.userPhotoPath);
                            return (
                                <ImageBox key={"userImage" + idx}>
                                <ImageItem source={{uri : route.params.userPhotoPath + userPhotoNames[idx]}} onError={()=> {console.log("error!")}}></ImageItem>                            
                                </ImageBox>               
                                
                            )
                        }
                
                    })
                }
                </UserContainer>
            </ImageInner>
            
        </ImageContainer>
        
    )
};

const ImageContainer = styled.ScrollView`
    width: 100%;
    height: 100%;    
    background: black;
`;
const ImageInner = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`

const UserContainer = styled.View`
    width: 50%;
    height: 100px;
    display: flex;
    flex-direction: column;
`;

const ImageBox = styled.View`
    width: 100%;
    height: 185px;
`

const ProContainer = styled.View`
    width: 50%; 
    height: 100%;
    display: flex;
    flex-direction: column;    
`;

const ImageItem = styled.Image`
    width: 100%;
    height: 100%;
    transform: rotate(90deg);
`;

export default SwingCompareView;