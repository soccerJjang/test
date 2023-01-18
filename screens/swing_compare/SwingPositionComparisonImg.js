import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import { 
    CommonBackground,
    CommonContainer,
} from '../../styled-components/Common';
import { 
    ComparisonImgBox,
    ComparisonImgInner,
    ComparisonImg
} from '../../styled-components/analysis_list/AnalysisSwingRear';
import { SettingButton } from '../../styled-components/my_page/Setting';
import Swiper from 'react-native-swiper';
import Loading from '../../components/Laoding';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { DrawingButtonBox, DrawingCircle, DrawingImg } from '../../styled-components/analysis_draw/rear/Address';
import { article } from '../../api/article';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const SwingPositionComparisonImg = (props) => {
    const [detailInfo, setDetailInfo] = React.useState(props.route.params);
    const [proPhotoPath, setProPhotoPath] = React.useState(null);
    const [userPhotoPath, setUserPhotoPath] = React.useState(null);
    const [sceneNames, setSceneNames] = React.useState(['/frame_02_address.jpg', 
    '/frame_04_take_away.jpg',  '/frame_06_back_swing.jpg', '/frame_08_back_swing_top.jpg', '/frame_10_down_swing.jpg', '/frame_12_impact.jpg', '/frame_14_release.jpg', '/frame_16_finish.jpg' ]);
    const [userPhotoNames, setUserPhotoNames] = React.useState(['/frame_02_address.jpg', 
    '/frame_04_take_away.jpg',  '/frame_06_back_swing.jpg', '/frame_08_back_swing_top.jpg', '/frame_10_down_swing.jpg', '/frame_12_impact.jpg', '/frame_14_release.jpg', '/frame_16_finish.jpg' ])
    const [proCard,  setProCard] = React.useState(false);

    const [proList, setProList] = React.useState(null);
    const [selectedProName, setSelectedProName] = React.useState(null);
    const navigation = useNavigation();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);
    
    const viewRef = React.useRef();

    React.useEffect(async()=> {
        
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        let proName = detailInfo.data.nearest_pro_name;
        let percentage = detailInfo.data.near_percentage;

        console.log("Test!!");
        console.log("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + "Lee_Seung_Hyo" + "/" + detailInfo.data.type);

        if(detailInfo.mode == 'default') {
            detailInfo.data.swing_type == "front" ? 
            setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + 'Lee_Seung_Hyo' + "/" + detailInfo.data.type) :
            setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + 'Lee_Seung_Hyo' + "/" + detailInfo.data.type);

            setSelectedProName("Lee Seung Hyo");
            setUserPhotoPath("http://223.130.132.180:5008/screengo/" + detailInfo.data.img_path.substring(detailInfo.data.img_path.indexOf("service1")).replace(/\"/gi, ''));

            console.log("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + 'Lee_Seung_Hyo' + "/" + detailInfo.data.type);

        }else if(detailInfo.mode == 'pro') {

            await FileSystem.downloadAsync("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/" + detailInfo.data.type + sceneNames[0], FileSystem.cacheDirectory + userPhotoNames[0] + '.jpg')
            .then(data => {
                if(data.status == 404) {
                    
                    //setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/FI" );
                    setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + "Lee_Seung_Hyo" + "/" + detailInfo.data.type);
                }else{
                    setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/" + detailInfo.data.type);
                }
            })
            .catch(error => {
                console.error(error);
            })

            /*
            detailInfo.data.swing_type == "front" ? 
            setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/" + detailInfo.data.type) :
            setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/" + detailInfo.data.type);
            */

            setSelectedProName(proName);
            setUserPhotoPath("http://223.130.132.180:5008/screengo/" + detailInfo.data.img_path.substring(detailInfo.data.img_path.indexOf("service1")).replace(/\"/gi, ''));

            let proListData = new Array();
            
            Object.entries(JSON.parse(detailInfo.data.comparison)).map((item, idx) => {
                proListData.push(item[0]);
            });
            setProList(proListData);
        }

        Alert.alert("이미지 터치 시 파노라마 버전으로 확인 가능합니다");     

        console.log("width : " , Dimensions.get('window').width);
        console.log("height : " , Dimensions.get('window').height);

        console.log("test : " , Dimensions.get('window').height - (Dimensions.get('window').height * 0.8));
        console.log("test : " , Dimensions.get('window').height * 0.8);
        
        
    }, []);


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);            
        });
    }, [navigation]);


    const changePro = async (proName) => {

        await FileSystem.downloadAsync("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/" + detailInfo.data.type + sceneNames[0], FileSystem.cacheDirectory + userPhotoNames[0] + '.jpg')
        .then(data => {
            
            if(data.status == 404) {
                //setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/FI" );
                setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + "Lee_Seung_Hyo" + "/" + detailInfo.data.type);
                
            }else{
                setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/" + detailInfo.data.type);
            }

        })
        .catch(error => {
            console.error(error);
        })

        /*
        detailInfo.data.swing_type == "front" ? 
        setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/" + detailInfo.data.type) :
        setProPhotoPath("http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/" + proName.replace(/ /gi, "_") + "/" + detailInfo.data.type);
        */
        setSelectedProName(proName);
    }


    const setPanorama = () => {
        navigation.navigate("SwingCompareView", {userPhotoPath, proPhotoPath});        
    }

    const goToCompareAnalysis = () => {
        navigation.navigate("SwingCompareAnalysis", {selectedProName : selectedProName, detailInfo : detailInfo, proPhotoPath : proPhotoPath, userPhotoPath: userPhotoPath}); 
    }
    

    const goShare = async(type) => {

        const midiaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
        setHasMediaLibraryPermission(midiaLibraryStatus.status === 'granted');

        let userFilePath = userPhotoPath.replace('http://223.130.132.180:5008/screengo/', '/home/dev1/data/screengo_api/');
        userFilePath += "/";        
        let proFilePath = proPhotoPath.replace('http://223.130.132.180:5008/screengo/', '/home/dev1/data/screengo_api/');
                proFilePath += "/";

        const fileType = type == 'me' ? 'mergedImage1.jpg' : 'mergedImage2.jpg';      

        const result = await article.convertImage(userFilePath, proFilePath);
                
        if(result){
            let image = '';
            await FileSystem.downloadAsync(`${userPhotoPath}/${fileType}`, FileSystem.cacheDirectory + fileType)
            .then(data => {
                image = data.uri;
                console.log('Finishied all downloading to ', data.uri);
            })
            .catch(error => {
                console.error(error);
            })
            image = await FileSystem.getInfoAsync(image);
                        
            await Sharing.shareAsync(image.uri);            
        } 
    }

    const goDownload = async (type) => {

        const midiaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
        setHasMediaLibraryPermission(midiaLibraryStatus.status === 'granted');
        

        let userFilePath = userPhotoPath.replace('http://223.130.132.180:5008/screengo/', '/home/dev1/data/screengo_api/');
              userFilePath += "/";        
        let proFilePath = proPhotoPath.replace('http://223.130.132.180:5008/screengo/', '/home/dev1/data/screengo_api/');
              proFilePath += "/";

        const fileType = type == 'me' ? 'mergedImage1.jpg' : 'mergedImage2.jpg';      

        const result = await article.convertImage(userFilePath, proFilePath);
                
        if(result){
            let image = '';
            await FileSystem.downloadAsync(`${userPhotoPath}/${fileType}`, FileSystem.cacheDirectory + fileType)
            .then(data => {
                image = data.uri;
                console.log('Finishied all downloading to ', data.uri);
            })
            .catch(error => {
                console.error(error);
            })
            image = await FileSystem.getInfoAsync(image);
            await MediaLibrary.saveToLibraryAsync(image.uri);
            Alert.alert("저장 완료되었습니다.");
        }        
    }


    if(userPhotoPath != null && proPhotoPath != null) {
        return (    
            <CommonBackground>
                <CommonContainer 
                    ref={viewRef}
                    onContentSizeChange={() => {
                        viewRef.current?.scrollTo({ y: detailInfo.mode == 'default' ? 270 : 320, animated: false })
                        
                      }}
                >
                <View style={{width:'100%', height: 'auto', display:'flex',alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                    
                    <DrawingButtonBox style={{display:"flex", flexDirection : "row", justifyContent : "space-between", alignItems : 'center'}}>
                            <Text style={{marginBottom: 10}}>{detailInfo.mode == 'default' ? '가장 표준적인 프로선수 영상입니다': 'Tour Pro 영상은 계속 업로드 예정' }</Text>
                            <View style={{display:"flex", flexDirection : 'row', marginBottom: 10}}>
                            <DrawingCircle style={{marginRight:16}} onPress={()=> {
                                Alert.alert(
                                    "공유 하시겠습니까?",
                                    "",

                                    Platform.OS == 'android' ? 
                                    [
                                        {
                                            text: "취소",
                                            onPress: () => console.log("Cancel Pressed"),                
                                        },
                                        { text: "본인 파노라마", onPress: () => goShare("me") },
                                        { text: "프로 파노라마", onPress: () => goShare("pro") },                
                                    ]            
                                    :
                                    [

                                        { text: "본인 파노라마", onPress: () => goShare("me") },
                                        { text: "프로 파노라마", onPress: () => goShare("pro") },                
                                    {
                                        text: "취소",
                                        onPress: () => console.log("Cancel Pressed"),                
                                    },
                                    
                                    ]
                                )
                            }}>
                                <DrawingImg source={require("../../images/ico-share.png")}></DrawingImg>
                            </DrawingCircle>
    
                            <DrawingCircle onPress={()=>{
                                Alert.alert(
                                    "다운 받으시겠습니까?",
                                    "",

                                    Platform.OS == 'android' ? 
                                    [
                                        {
                                            text: "취소",
                                            onPress: () => console.log("Cancel Pressed"),                
                                        },
                                        { text: "본인 파노라마", onPress: () => goDownload("me") },
                                        { text: "프로 파노라마", onPress: () => goDownload("pro") },                
                                    ]            
                                    :
                                    [

                                        { text: "본인 파노라마", onPress: () => goDownload("me") },
                                        { text: "프로 파노라마", onPress: () => goDownload("pro") },                
                                    {
                                        text: "취소",
                                        onPress: () => console.log("Cancel Pressed"),                
                                    },
                                    
                                    ]
                                )
                            }}>
                                <DrawingImg source={require("../../images/ico-download.png")}></DrawingImg>
                            </DrawingCircle>                                
                            </View>
                        </DrawingButtonBox>

                    {
                        proList != null ?
                            <SelectDropdown
                                data={proList}
                                onSelect={(selectedItem, index) => {                                            
                                    changePro(selectedItem);
                                }}
                                defaultValue={selectedProName}
                                defaultButtonText={selectedProName}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                renderDropdownIcon={isOpened => {                                                            
                                    return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} color={'#444'} size={13} />;
                                }}
                                dropdownIconPosition={'right'}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                            />
                            :
                            <Text style={{fontSize: 24}}>이승효 프로</Text>
                    }
                   
                   <TouchableOpacity onPress={goToCompareAnalysis}>
                    <SettingButton style={{backgroundColor: '#171C61', color: '#FFFFFF'}}>유사도 분석하기</SettingButton>
                   </TouchableOpacity>
                    <ComparisonImgBox
                        width={()=> {
                            return Dimensions.get('window').height < Dimensions.get('window').width ? 
                                (Dimensions.get('window').height * 0.80) 
                                :
                                (Dimensions.get('window').width * 0.80) 
                        }}                                                                    
                    >
                        <ComparisonImgInner>
                            <Swiper
                                autoplay={true}
                                showsPagination={true}
                                autoplayTimeout={3.0}
                                loop={true}
                            >    
                                {
                                    sceneNames.map((item, idx) => {
                                        
                                        if(proPhotoPath != null && userPhotoPath != null) {
                                            return (
                                                <TouchableOpacity key={"compareImage" + idx} 
                                                    onPress={ async () => {
                                                                                                                                                                    
                                                        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);                                                                                                            
                                                        setPanorama()
                                                    }}
                                                >
                                                    <ComparisonImgInner>
                                                        <ComparisonImg>
                                                        <Image style={{ width: "100%", height: "100%" }} source={{uri : userPhotoPath + userPhotoNames[idx]}} />
                                                        </ComparisonImg>
                                                        <View style={{ width: 5 }}/>
                                                        <ComparisonImg>
                                                            <Image style={{ width: "100%", height: "100%" }} source={{uri : proPhotoPath + item}} />
                                                        </ComparisonImg>
                                                    </ComparisonImgInner>
                                                </TouchableOpacity>
                                            )
    
                                        }else {
    
    
                                        }
    
                                    })
                                }              
                                                                      
                            </Swiper>
                            
                        </ComparisonImgInner>                    
                        


                        
                    </ComparisonImgBox>
                    <View style={{ height: 100 }}/>
                    </View>
                    </View>
                </CommonContainer>
            </CommonBackground>
        )

    }else {
        return(
            <Loading/>
        )
    }
    
}


const styles = StyleSheet.create({ // picker Style(selectBox)
    dropdown1BtnStyle: {
      width: '100%',
      height: 52,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#EBEBEB',
      marginBottom: 20
    },
    dropdown1BtnTxtStyle: {color: '#666666', textAlign: 'left', fontWeight: "400"},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF',borderRadius: 8},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default SwingPositionComparisonImg;