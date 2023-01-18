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

const AnalysisSwingConfirmCard = (props) => {
    
    const [proCard,  setProCard] = React.useState(false);
    const [userImgPath, setUserImgPath] = React.useState(null);
    const [proImgPath, setProImgPath] = React.useState(null);
    const [proPercentage, setProPercentage] = React.useState(0);
    const [data, setData] = React.useState(null);
    const [blur, setBlur]= React.useState(null);
    const [proCardBoxList, setProCardBoxList] = React.useState([]);

    const [bodyComments, setBodyComments] = React.useState(null);
    const [circleComments, setCircleComments] = React.useState(null);
    const [sceneComments, setSceneComments] = React.useState(null);
    const [totalComments, setTotalComments] = React.useState(null);

    const navigation = useNavigation();

    React.useEffect(async() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let userInfo = await SecureStore.getItemAsync("userData"); 
            userInfo = JSON.parse(userInfo);
            if(props.userId) {
            await fetch(`http://223.130.132.180:5008/article/selectProCardBoxList?userNo=${userInfo.user_no}`, { // 50% 이상 프로카드 목록
                method: 'GET'
            })
            .then(res => res.json())
            .then((json) => {
                const proCardBoxReduce = json.reduce((acc, current) => {
                    if(acc.findIndex(({ pro_name }) => pro_name === current.pro_name) === -1) {
                        acc.push(current);
                    }
                    return acc;
                },[]);
                setProCardBoxList(proCardBoxReduce);
            });
        }

        let proImagePath = null;
        let percentage = 0;

        await fetch(`http://223.130.132.180:5008/article/analysisView?userId=${props.userId}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(async(json) => {
                setBodyComments(JSON.parse(json.body_score_comment));
                setCircleComments(JSON.parse(json.circle_score_comment));
                setSceneComments(JSON.parse(json.scene_score_comment));
                setTotalComments(JSON.parse(json.total_score_comment));
                setData(json); 

                // 유저 이미지 세팅                 
                let imgPath = JSON.stringify(json.img_path.replace("/home/dev1/data/screengo_api/", "") );
                imgPath = imgPath.substring(1, imgPath.length -1);
                //imgPath = "/screengoDev/service1/frames" + imgPath; 
                imgPath = "/screengo" + imgPath; 
                imgPath = imgPath.replace(/\\/g, "/").replace(/\"/gi, "");

                // 09번 이미지 체크
                await FileSystem.downloadAsync("http://223.130.132.180:5008" + imgPath + 'frame_09_additional.jpg', FileSystem.cacheDirectory + 'additional.jpg')
                .then(data => {
                    if(data.status == 404) {

                        
                        setUserImgPath("http://223.130.132.180:5008" + imgPath + '/frame_08_back_swing_top.jpg');                            
                    }else {
                        setUserImgPath("http://223.130.132.180:5008" + imgPath + '/frame_09_additional.jpg'); 
                    }
                })
                .catch(error => {
                    console.error(error);
                })
    
                //setUserImgPath("http://223.130.132.180:5008" + imgPath + 'frame_09_additional.jpg');

                const nearestProName = json.nearest_pro_name;
                const nearPercentage = json.near_percentage;
            
                // 프로 이미지 세팅
                
                if(json.nearest_pro_name != undefined || json.near_percentage) {        
    
                    proImagePath = "http://223.130.132.180:5008/screengo/service1/media/videos/ProSnapShot/"
                    proImagePath += nearestProName.replace(/ /gi, '_');
                    proImagePath += "/" + json.type;
                    
                    json.swing_type == "front" ? proImagePath += "/frame_09_additional.jpg" : proImagePath += "/frame_09_additional.jpg";
                            
                    percentage = Math.floor(nearPercentage);

                    setProImgPath(proImagePath);
                    setProPercentage(percentage);
                }
            });
             await fetch("http://223.130.132.180:5008/article/selectProCardBoxStatus", { // 해당 분석 유사도 확인 여부
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'                                    
                },
                body : JSON.stringify({
                    "userId" : props.userId                   
                })
            }).then(res => res.json())
            .then(result => {
                return result.length;   
            })
            .then((resLen) => {
                console.log("resLen", resLen);
                if(resLen*1 < 1) { // 없는 경우 확인하기 알럿 후 데이터 저장, 50이상, 이하 관계없이 새 테이블에 다 저장
                    Alert.alert(
                        "유사도 확인하기", 
                        "AI가 분석한 당신과 가장 유사한 투어프로는 누구일까요?",
                            [
                                { text: "확인하기", onPress: async ()=>{                   
                                    await fetch("http://223.130.132.180:5008/article/confirmProCardBoxList", { 
                                        method : 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'                                    
                                        },
                                        body : JSON.stringify({
                                            "userId" : props.userId,
                                        })
                                    })
                                    .then(res => res.json())
                                    .then(result => {
                                        console.log("confirm", result.insertId);
                                    })                      
                                        if(percentage >= 50) {                                                                 
                                            setBlur(0)             
                                                console.log("percentage >= 50");
                                                let userInfo = await SecureStore.getItemAsync("userData"); 
                                                userInfo = JSON.parse(userInfo);
                                                await fetch(`http://223.130.132.180:5008/article/selectProCardBoxList?userNo=${userInfo.user_no}`, { // 해당 분석의 유사도가 50% 넘는 경우 다시 목록가져와서 셋 해줌
                                                    method : 'GET',
                                                })
                                                .then(res => res.json())
                                                .then((json) => {
                                                    const proCardBoxReduce = json.reduce((acc, current) => {
                                                        if(acc.findIndex(({ pro_name }) => pro_name === current.pro_name) === -1) {
                                                            acc.push(current);
                                                        }
                                                        return acc;
                                                    },[]);
                                                    setProCardBoxList(proCardBoxReduce);
                                                })
                                        }                                  
                                    }
                                }
                            ]
                        );
                    } else {
                        console.log("확인 된 프로카드 블러값 저장");
                        (percentage > 50) ? setBlur(0) : setBlur(40);
                    }
                    
            })  
            .catch((err) => {
                console.log(err);
            });

            // Return the function to unsubscribe from the event so it gets removed on unmount
        });
            
      }, [navigation]);
    
    const goProView = async (proName) => {
    
        let userInfo = await SecureStore.getItemAsync("userData"); 
            userInfo = JSON.parse(userInfo);

        const data = await fetch(`http://223.130.132.180:5008/article/selectProCardDetail?userNo=${userInfo.user_no}&name=${proName}`, { method : "GET" })
        .then(res => res.json())
        .then((json) => {            
            navigation.navigate("AnalysisListProView",  {data: json.proCardDetail[0], userData : userInfo});
        });
    }
    
    if(data) {
        return (    
            <CommonBackground>
                <CommonContainer>
                    <TitMiddle>유사도 분석(프로카드 획득)</TitMiddle>
                    <SwingRearImgBox>
                        <SwingRearImgInner>                    
                            <SwingRearImg>
                                <Image style={{ width: "100%", height : "100%" }} source={userImgPath != null ? {uri : userImgPath} : require('../../images/img-SwingRear01.png')} />
                                <NameTag><Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>Me</Text></NameTag>
                            </SwingRearImg>
                            <View style={{ width: 5 }}/>                        
                            <SwingRearImg>
                                <Image blurRadius={blur ? blur : null} style={{ width: "100%" , height : "100%"}}  source={proImgPath != null? {uri : proImgPath} : require('../../images/img-SwingRear01.png')} />
                                <NameTag><Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>Tour Pro</Text></NameTag>
                            </SwingRearImg>
                        </SwingRearImgInner>
                        <PercentBox><PercentNum><Text  style={{ fontSize: 27, color:"#fff", fontWeight: "700"}}>{proPercentage}</Text><Text style={{ fontSize: 16, color:"#fff", fontWeight: "700"}}>%</Text></PercentNum></PercentBox>
                    </SwingRearImgBox>
                    
                    {
                        proPercentage >= 50  ? 
                        <SwingRearCommentBox  style={{ marginTop: 30,  elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}>
                            <Comment1>축하합니다!</Comment1>
                            <Comment2>{data.nearest_pro_name} 와의{"\n"}스윙 유사도는 {Math.floor(proPercentage)}%입니다.</Comment2>
                            <InfoBtn onPress={()=> {goProView(data.nearest_pro_name)}}><Text style={{ color: "#fff", fontSize: 12, textAlign: 'center' }}>프로정보</Text></InfoBtn>
                        </SwingRearCommentBox>
                        :
                        <SwingRearCommentBox  style={{ marginTop: 30,  elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}>
                            <Comment1>앗! 아쉽습니다.</Comment1>
                            <Comment2>유사율이 50%가 넘는 프로 선수가 없습니다. {"\n"}다음 기회를 노려보세요.</Comment2>
                            {/* <InfoBtn onPress={()=> {goProView(affinity.nearest_pro_name)}}><Text style={{ color: "#fff", fontSize: 12, textAlign: 'center' }}>프로정보</Text></InfoBtn> */}
                        </SwingRearCommentBox>
                    }            
                </CommonContainer>
                {
                <ProCardBox onPress={() => setProCard(!proCard)}  style={{ marginTop: 10,  elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: -5 }, shadowRadius: 10 }}>
                    <ProCardTit><Text style={{color: '#222', fontSize: 16, fontWeight: '700' }}>프로카드 박스</Text><View style={{ width: 7 }}></View><ProCardBadge><Text style={{color: '#fff', fontSize: 12 }}>{proCardBoxList != null ? proCardBoxList.length : 0}명</Text></ProCardBadge></ProCardTit>
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
                                if(idx < 5) {
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

                            {
                                proCardBoxList.length >= 5  ? 
                                    <MoreContainer onPress={()=> {navigation.navigate('ProCardBoxStack')}}>
                                        <MoreText>더보기</MoreText><MorePlus source={require("../../images/more-plus-white.png")}/>
                                    </MoreContainer>                 
                                :
                                null
                            }

                        </ScrollView>
                            :
                            <View/>
                    }
                    <OpenBtn source={require('../../images/ico-OpenBtn.png')}/>
                </ProCardBox>
                }
                <SlideRightBt onPress={()=> {navigation.navigate("AIReport")}}><Image style={{ width: "100%", height: "100%"  }} source={require('../../images/ico-slide-right.png')}/></SlideRightBt>
            </CommonBackground>
        )
    } else {
        return null;
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
export default AnalysisSwingConfirmCard;