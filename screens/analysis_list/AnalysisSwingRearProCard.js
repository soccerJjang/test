import React from 'react';
import { View, Text, Image, ScrollView, Alert, } from 'react-native';
import styled from "styled-components";
import { 
    CommonBackground,
    CommonContainer,
    TitMiddle,
} from '../../styled-components/Common';
import { 
    SwingRearImgBox,
    SwingRearImgInner,
    SwingRearImg,
    PercentBox,
    PercentNum,
    ProCardBox,
    ProCardTit,
    ProCardBadge,    
    ShotListBox,
    ShotList,    
    ShotListName,
    ShotListImg,
    OpenBtn,
    ShotListChk,    
} from './../../styled-components/analysis_list/AnalysisSwingRear';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { migrateAlbumIfNeededAsync } from 'expo-media-library';
import * as SecureStore from 'expo-secure-store';
import { MoreContainer, MorePlus, MoreText } from '../../styled-components/analysis_list/AnalysisList';
import * as FileSystem from 'expo-file-system';
import { procard } from '../../api/procard';

const AnalysisSwingRearProCard = (props) => {
    const route = useRoute();

    const [proCard,  setProCard] = React.useState(false);
    const [proCardBoxList, setProCardBoxList] = React.useState(route.params.proCardBoxList);    
    const [proInfo, setProInfo] = React.useState(route.params.proInfo);
    const [userImgPath, setUserImgPath] = React.useState(null);
    const [proImgPath, setProImgPath] = React.useState(null);
    const [data, setData] = React.useState(route.params.data);
    const [blur, setBlur]= React.useState(0)

    const navigation = useNavigation();
    console.log(proInfo);
    React.useEffect( async ()=> {
        

        console.log("hihihihihihi");
        // 유저 이미지 세팅                 
        let imgPath = JSON.stringify(route.params.proInfo.user_photo_path.replace("/home/dev1/data/screengo_api/", "") );
        imgPath = imgPath.substring(1, imgPath.length -1);
        //imgPath = "/screengoDev/service1/frames" + imgPath; 
        imgPath = "/screengo/" + imgPath; 
        imgPath = imgPath.replace(/\\/g, "/").replace(/\"/gi, "");        


        // 09번 이미지 체크
        await FileSystem.downloadAsync("http://223.130.132.180:5008" + imgPath + 'frame_09_additional.jpg', FileSystem.cacheDirectory + 'additional.jpg')
        .then(data => {
            console.log(data)
            if(data.status == 404) {
                
                setUserImgPath("http://223.130.132.180:5008" + imgPath + 'frame_08_back_swing_top.jpg');
                
            }else {
                setUserImgPath("http://223.130.132.180:5008" + imgPath + 'frame_09_additional.jpg');
            }

            console.log(userImgPath);
        })
        .catch(error => {
            console.error(error);
        })
        
        //setUserImgPath("http://223.130.132.180:5008" + imgPath + 'frame_09_additional.jpg');

        imgPath = "http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/";
        data != null ? imgPath += route.params.proInfo.pro_name.replace(/ /g, "_") : "";
        data != null ? imgPath += "/"  + route.params.proInfo.type  + "/frame_09_additional.jpg" : "";






        
        setProImgPath(imgPath);
      
    }, []);
    

    const goProView = async (proName) => {
    
        let userInfo = await SecureStore.getItemAsync("userData"); 
            userInfo = JSON.parse(userInfo);
        await procard.selectProCardDetail(userInfo.user_no, proName)
        .then((json) => {            
            console.log(json.proCardDetail[0]);
            navigation.navigate("AnalysisListProView",  {data: json.proCardDetail[0], userData : userInfo});
        });
    }


    if(userImgPath != null && proImgPath != null) {

        return (    
            <CommonBackground>
                <CommonContainer>
                    <TitMiddle>유사도 분석(프로카드 획득)</TitMiddle>
                    <SwingRearImgBox>
                        <SwingRearImgInner>                    
                            <SwingRearImg>
                                <Image style={{ width: "100%", height : "100%" }} source={route.params != null && userImgPath != null ? {uri : userImgPath} : require('../../images/img-SwingRear01.png')} />
                                <NameTag><Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>Me</Text></NameTag>
                            </SwingRearImg>
                            <View style={{ width: 5 }}/>                        
                            <SwingRearImg>
                                <Image blurRadius={blur} style={{ width: "100%" , height : "100%"}}  source={route.params != null && proImgPath != null ? {uri : proImgPath} : require('../../images/img-SwingRear01.png')} />
                                <NameTag><Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>Tour Pro</Text></NameTag>
                            </SwingRearImg>
                        </SwingRearImgInner>
                        <PercentBox><PercentNum><Text  style={{ fontSize: 27, color:"#fff", fontWeight: "700"}}>{Math.floor(proInfo.pro_percentage)}</Text><Text style={{ fontSize: 16, color:"#fff", fontWeight: "700"}}>%</Text></PercentNum></PercentBox>
                    </SwingRearImgBox>
    
                    {
                        blur != 40 ? 
                        <SwingRearCommentBox  style={{ marginTop: 30,  elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}>
                            <Comment1>축하합니다!</Comment1>
                            <Comment2>{route.params.proInfo.pro_name} 와의{"\n"}스윙 유사도는 {Math.floor(route.params.proInfo.pro_percentage)}%입니다.</Comment2>
                            <InfoBtn onPress={()=> {goProView(route.params.proInfo.pro_name)}}><Text style={{ color: "#fff", fontSize: 12, textAlign: 'center' }}>프로정보</Text></InfoBtn>
                        </SwingRearCommentBox>
                        :
                        null
                    }            
                </CommonContainer>
                <ProCardBox onPress={() => setProCard(!proCard)}  style={{ marginTop: 10,  elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: -5 }, shadowRadius: 10 }}>
                    <ProCardTit><Text style={{color: '#222', fontSize: 16, fontWeight: '700' }}>프로카드 박스</Text><View style={{ width: 7 }}></View><ProCardBadge><Text style={{color: '#fff', fontSize: 12 }}>{proCardBoxList != null  ? proCardBoxList.length : 0}명</Text></ProCardBadge></ProCardTit>
                    {
                        (proCard)?
                            <ScrollView
                            horizontal={true} 
                            style={{margin :20}}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{justifyContent: "center", alignItems : "flex-start"}}
                            >
                            {
                             proCardBoxList.map((item, idx) => {                            
                                

                                if(proInfo.pro_name == item.pro_name) {
                                    return(
                                        <ShotListBox 
                                        key={"SimilarPro" + item} 
                                        onPress={()=> navigation.replace("AnalysisSwingRearProCard", {proInfo : item , proCardBoxList, data})}
                                        >
                                            <ShotList>
                                                <ShotListImg source={{uri : "http://223.130.132.180:5009/upload/" + item.pro_photo_path}} />                            
                                                <ShotListChk><Feather name="check" size={24} color="#fff"/></ShotListChk>
                                            </ShotList>                                    
                                            <ShotListName>{item.pro_name}</ShotListName>                
                                        </ShotListBox>

                                    )
                                }else {
                                    return(
                                        <ShotListBox 
                                            key={"SimilarPro" + idx} 
                                            onPress={()=> navigation.replace("AnalysisSwingRearProCard", {proInfo : item , proCardBoxList, data})}
                                        >
                                            <ShotList>
                                                <ShotListImg source={{uri : "http://223.130.132.180:5009/upload/" + item.pro_photo_path}} />                            
                                            </ShotList>
                                            <ShotListName>{item.pro_name}</ShotListName>                
                                        </ShotListBox>
                                    )    

                                }
                        
                             })   
                            }
                            {
                                [1,2,3,4,5].map((item,idx)=> {
                                    let count = 5 - proCardBoxList.length;                                
                                    if(count >= item) {
                                        return(
                                            <ShotListBox key={"SimilarPro" + item}>
                                                <ShotList>
                                                    <ShotListImg source={require('../../images/img-shot02.png')}/>
                                                </ShotList>
                                                <ShotListName></ShotListName>
                                            </ShotListBox>            
                                        )
                                    }
                                })                            
                            }            

                            <MoreContainer>
                                <MoreText>더보기</MoreText><MorePlus source={require("../../images/more-plus.png")}/>
                            </MoreContainer>                                            
                        </ScrollView>
                            :
                            <View/>
                    }
                    <OpenBtn source={require('../../images/ico-OpenBtn.png')}/>
                </ProCardBox>
    
            </CommonBackground>
        )

    }else {
        return(null)
    }
    

}

const NameTag = styled.View`
    position: absolute;
    top: 22px;
    left: 50%;
    width: 87px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -43px;
    text-align: center;
    background: rgba(255, 93, 2, 0.7);
    border-radius: 50px;
    border: 1px solid #fff;
`
const SwingRearCommentBox = styled.View`
    margin-bottom: 150px;
    padding: 23px 20px 20px 20px;
    border-radius: 20px;
    background: #fff;
    display: flex;
`
const Comment1 = styled.Text`
    margin-bottom: 17px;
    font-size: 16px;
    font-weight: 700;
    color: #1A1D1E;
`
const Comment2 = styled.Text`
    margin-bottom: 17px;
    font-size: 14px;
    color: #000;
    font-weight: 300;
`
const InfoBtn = styled.TouchableOpacity`
    width: 81px;
    padding: 5px 0;
    background: #000;
    border-radius: 50px;

`
export default AnalysisSwingRearProCard;