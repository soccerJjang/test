import React from 'react';
import * as RN from 'react-native';
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
import { procard } from '../../api/procard';
import { Feather } from '@expo/vector-icons';
import { migrateAlbumIfNeededAsync } from 'expo-media-library';
import * as SecureStore from 'expo-secure-store';
import { MoreContainer, MorePlus, MoreText } from '../../styled-components/analysis_list/AnalysisList';
import { proc } from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';

const ProCardBoxView = (props) => {
    const [viewData, setViewData] = React.useState(null);
    const [proCardBoxList, setProCardBoxList] = React.useState(null);
    const [blur, setBlur]= React.useState(40)
    const [proCard, setProCard] = React.useState(false);
    const [userImagePath, setUserImgPath] = React.useState(null);

    const navigation = useNavigation();

    React.useEffect(async ()=> {
        const proInfo = props.route.params.proInfo;
        const getProCardBoxList = props.route.params.proCardBoxList;

        // 09번 이미지 체크
        await FileSystem.downloadAsync(`http://223.130.132.180:5008${proInfo.user_photo_path.replace(`/home/dev1/data/screengo_api`, `/screengo`).replace(/\\/g, "/").replace(/\"/gi, "")}/frame_09_additional.jpg`, FileSystem.cacheDirectory + 'additional.jpg')
        .then(data => {
            if(data.status == 404) {

                
                setUserImgPath(`http://223.130.132.180:5008${proInfo.user_photo_path.replace(`/home/dev1/data/screengo_api`, `/screengo`).replace(/\\/g, "/").replace(/\"/gi, "")}/frame_08_back_swing_top.jpg`);                            
            }else {
                setUserImgPath(`http://223.130.132.180:5008${proInfo.user_photo_path.replace(`/home/dev1/data/screengo_api`, `/screengo`).replace(/\\/g, "/").replace(/\"/gi, "")}/frame_09_additional.jpg`); 
            }
        })
        .catch(error => {
            console.error(error);
        })

        setViewData(proInfo);    
        setProCardBoxList(getProCardBoxList);
    }, []);
    
    
    const goProView = async (proName) => {
    
        let userInfo = await SecureStore.getItemAsync("userData"); 
            userInfo = JSON.parse(userInfo);
            const resultData = await procard.selectProCardDetail(userInfo.user_no, proName)
            .then(res => {
                navigation.navigate("ProView", { data: res.proCardDetail[0], userData : userInfo})
            });
    }
    
    if(viewData) {
        return (    
            <CommonBackground>
                <CommonContainer>
                    <TitMiddle>유사도 분석(프로카드 획득)</TitMiddle>
                    <SwingRearImgBox>
                        <SwingRearImgInner>                    
                            <SwingRearImg>
                                <RN.Image style={{ width: "100%", height : "100%" }} source={viewData.user_photo_path != null && userImagePath != null ? {uri : userImagePath} : require('../../images/img-SwingRear01.png')} />
                                <NameTag><RN.Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>Me</RN.Text></NameTag>
                            </SwingRearImg>
                            <RN.View style={{ width: 5 }}/>                        
                            <SwingRearImg>
                                <RN.Image style={{ width: "100%" , height : "100%"}}  source={viewData.pro_photo_path != null? {uri : `http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/${viewData.pro_name.replace(" ", "_")}/${viewData.type}/frame_09_additional.jpg`} : require('../../images/img-SwingRear01.png')} />
                                <NameTag><RN.Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>Tour Pro</RN.Text></NameTag>
                            </SwingRearImg>
                        </SwingRearImgInner>
                        <PercentBox><PercentNum><RN.Text  style={{ fontSize: 27, color:"#fff", fontWeight: "700"}}>{Math.floor(viewData.pro_percentage)}</RN.Text><RN.Text style={{ fontSize: 16, color:"#fff", fontWeight: "700"}}>%</RN.Text></PercentNum></PercentBox>
                    </SwingRearImgBox>
                    <SwingRearCommentBox  style={{ marginTop: 30,  elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}>
                        <Comment1>축하합니다!</Comment1>
                        <Comment2>{viewData.pro_name} 와의{"\n"}스윙 유사도는 {Math.floor(viewData.pro_percentage)}%입니다.</Comment2>
                        <InfoBtn onPress={()=> {goProView(viewData.pro_name)}}><RN.Text style={{ color: "#fff", fontSize: 12, textAlign: 'center' }}>프로정보</RN.Text></InfoBtn>
                    </SwingRearCommentBox>
                </CommonContainer>
    
                <ProCardBox onPress={() => setProCard(!proCard)}  style={{ marginTop: 10,  elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: -5 }, shadowRadius: 10 }}>
                    <ProCardTit><RN.Text style={{color: '#222', fontSize: 16, fontWeight: '700' }}>프로카드 박스</RN.Text><RN.View style={{ width: 7 }}></RN.View><ProCardBadge><RN.Text style={{color: '#fff', fontSize: 12 }}>{proCardBoxList != null ? proCardBoxList.length : 0}명</RN.Text></ProCardBadge></ProCardTit>
                    {
                        (proCard)?
                            <RN.ScrollView
                            horizontal={true} 
                            style={{margin :20}}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{justifyContent: "center", alignItems : "flex-start"}}
                            >
                            {
                                proCardBoxList.map((item, idx) => {
                                    return(
                                        <ShotListBox 
                                            key={"SimilarPro" + idx} 
                                            onPress={()=> navigation.replace("ProCardBoxView", {proInfo : item , proCardBoxList, proCardBoxList})}
                                        >
                                            <ShotList>
                                                <ShotListImg source={{uri : "http://223.130.132.180:5009/upload/" + item.pro_photo_path}} />                            
                                            </ShotList>
                                            <ShotListName>{item.pro_name}</ShotListName>                
                                        </ShotListBox>
                                    )                            
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
 
                        {
                            proCardBoxList.length == 5  ?                             
                                <MoreContainer onPress={()=> {navigation.navigate('ProCardBoxStack')}}>
                                    <MoreText>더보기</MoreText><MorePlus source={require("../../images/more-plus.png")}/>
                                </MoreContainer>                 
                            :
                            null
                        }      
                        </RN.ScrollView>
                            :
                            <RN.View/>
                    }
                    <OpenBtn source={require('../../images/ico-OpenBtn.png')}/>
                </ProCardBox>
            </CommonBackground>
        )
    } else {
        return (
            <></>
        )
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
const SlideRightBt = styled.TouchableOpacity`
    position: absolute;
    top: 45%;
    right: 10px;
    width: 34px;
    height: 34px;
    margin-top: -17px;
    z-index: 99999;
`

export default ProCardBoxView;