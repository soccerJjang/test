import React from 'react';
import { View, Text, Platform, TouchableOpacity} from 'react-native';
import { 
    CommonBackground,
} from '../styled-components/Common';
import styled from "styled-components/native";

import { 
    AnalysisSwingRearContainer,
    TextView,
    TextLeft,
    ScoreText,
    RankText,
    ProCardBox,
    OpenBtn,
    ProCardTit,
    ProCardBadge,
    ProCardCon,
    ShotListBox,
    ShotList,
    ShotListName,
    ShotListImg,
    ShotListChk,
    BoxShadow
} from '../styled-components/analysis_list/AnalysisSwingRear';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MoreContainer, MorePlus, MoreText, ScoreIcon } from '../styled-components/analysis_list/AnalysisList';
import { IcoStar } from '../styled-components/analysis_draw/AnalysisDrawing';
import { ScrollView } from 'react-native-gesture-handler';
import { article } from '../api/article';
import { procard } from '../api/procard';
import Loading from './Laoding';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';

const MainTotalView = (props) => {

    const route = useRoute();
    const [data, setData] = React.useState();
    const [proCardBoxList, setProCardBoxList] = React.useState([]);
    const [userImgPath, setUserImgPath] = React.useState(null);
    const [proCard,  setProCard] = React.useState(false);

    const [bodyComments, setBodyComments] = React.useState(null);
    const [circleComments, setCircleComments] = React.useState(null);
    const [sceneComments, setSceneComments] = React.useState(null);
    const [totalComments, setTotalComments] = React.useState(null);

    const navigation = useNavigation();


    React.useEffect(async() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let userData = await SecureStore.getItemAsync('userData');
            userData = JSON.parse(userData);
            let userId = props.userId;
            
            if(userId) {
                const resultData = await article.analysisView(userId)
                .then(async(json) => {
                    setBodyComments(JSON.parse(json.body_score_comment));
                    setCircleComments(JSON.parse(json.circle_score_comment));
                    setSceneComments(JSON.parse(json.scene_score_comment));
                    setTotalComments(JSON.parse(json.total_score_comment));
                    setData(json); 

                    // 이미지 경로 수정 
                    let imgPath = json.img_path.replace("/home/dev1/data/screengo_api/", "");
                    imgPath = imgPath.substring(1, imgPath.length -1);
                    //imgPath = "/screengoDev/service1/frames" + imgPath; 
                    imgPath = "/screengo/" + imgPath; 
                    imgPath = imgPath.replace(/\\/g, "/").replace(/\"/gi, "");


                    // 09번 이미지 체크
                    await FileSystem.downloadAsync("http://223.130.132.180:5008" + imgPath + '/frame_09_additional.jpg', FileSystem.cacheDirectory + 'additional.jpg')
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
                })
            }
            
            if(userData) {
                const resultData = await procard.selectProCardBoxList(userData.user_no)
                .then(res => {
                    const proCardBoxReduce = res.reduce((acc, current) => {
                        if(acc.findIndex(({ pro_name }) => pro_name === current.pro_name) === -1) {
                            acc.push(current);
                        }
                        return acc;
                    },[]);
                    setProCardBoxList(proCardBoxReduce);
                })
            }
            return unsubscribe;
        });
    }, []);

    const dateFormat = (date) => {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
    
        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
    
        return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }

    return (data && totalComments && bodyComments)?( 
     (
        <>
        <CommonBackground>
                <AnalysisSwingRearContainer style={{ marginBottom: 30 }} showsVerticalScrollIndicator={false}>
                    <TextView>
                        <TextLeft style={{ fontWeight: '600' }}>
                            {data != null ? totalComments[2] : null}{"\n"}
                            {data != null ? totalComments[3] : null}
                        </TextLeft>
                        <View>
                            <ScoreText>
                                <ScoreTit>                                    
                                    {data != null && data.type.indexOf("F") >= 0 ? "Front" : "Rear"}
                                    {data != null && data.type.indexOf("D") >= 0 ? "  Driver" : "  Iron"}
                                </ScoreTit>
                                <View style={{ width: 6 }}/>
                                {totalComments[1]}점
                            </ScoreText>
                            {/* <RankText>상위0.01%</RankText> */}
                            {/* <RankText></RankText> */}
                            <View style={{ height: 7 }}/>
                            <ScoreDate>{dateFormat(new Date(data.date))}</ScoreDate>
                        </View>
                    </TextView>
                    
                    <ImageBox style={{marginBottom: 20 }}>
                        <Image source={userImgPath != null ?  {uri : userImgPath} : null} style={{width:"100%"}}/>
                    </ImageBox>
                    
                    <ConTit>신체부위 평가</ConTit>
                     {
                        Object.entries(bodyComments).map( (body, index) => {
                            var bodyName ="";
                            switch(body[0]) {
                                case "HEAD" : bodyName ="머리"; break;
                                case "SHOULDER" : bodyName ="어깨"; break;
                                case "PELVIS" : bodyName ="골반"; break;
                                case "SPINE" : bodyName ="척추"; break;
                                case "ARM" : bodyName ="팔"; break;
                                case "LEG" : bodyName ="다리"; break;                                 
                            }                                                                            
                            return (
                                <BoxShadow key={body[0] + index } style={{ marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 16, background: '#fff', elevation: 5, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 }, shadowRadius: 20 }}>
                                    <CommentBox>
                                        <CommentHead>
                                            <CommentTit>{bodyName}</CommentTit>
                                            <CommentScore>
                                            <ScoreIcon>
                                                {
                                                    [1,2,3].map( (item, idx) => {
                                                        if(item <= body[1][2]){
                                                            return <IcoStar key={item + "_" +idx}  source={require('../images/ico-stars-yellow.png')}/>            
                                                        }else{                                    
                                                            return  <IcoStar key={item + "_" +idx} source={require('../images/ico-stars-gray.png')}/>            
                                                        }
                                                    })
                                                }    
                                            </ScoreIcon>
                                            </CommentScore>
                                        </CommentHead>
                                        <CommentText>
                                        {body[1][1]}
                                        </CommentText>
                                    </CommentBox>
                                </BoxShadow>  
                                
                            )
                        })                        
                     } 
                     
                    {/* <PageButtonOnBlue  style={{marginTop:20}} onPress={()=> {navigation.navigate("AnalysisSwingDetailSwipe")}}><ButtonText>상세보기</ButtonText></PageButtonOnBlue> */}
                    <View style={{height:100}}></View>
                    </AnalysisSwingRearContainer>
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
                        (proCardBoxList.length > 0) ?
                            proCardBoxList.map((item, idx) => {
                                if(idx < 5) {
                                    return(
                                        <ShotListBox 
                                            key={"SimilarPro" + idx} 
                                            onPress={()=> navigation.replace("AnalysisSwingRearProCard", {proInfo : item , proCardBoxList, data : data})}
                                        >
                                            <ShotList>
                                                <ShotListImg source={{uri : "http://223.130.132.180:5009/upload/" + item.pro_photo_path}} />                            
                                            </ShotList>
                                            <ShotListName>{item.pro_name}</ShotListName>                
                                        </ShotListBox>
                                    )                                
                                }
                                
                            }) : null 
                        }
                        {
                            [1,2,3,4,5].map((item,idx)=> {
                                let count = 5 - proCardBoxList.length;                                
                                if(count >= item) {
                                    return(
                                        <ShotListBox key={"SimilarPro" + item}>
                                            <ShotList>
                                                <ShotListImg source={require('../images/img-shot02.png')}/>
                                            </ShotList>
                                            <ShotListName></ShotListName>
                                        </ShotListBox>            
                                    )
                                }else {
                   
                                }
                            })                            
                        }                
                        {
                            proCardBoxList.length >= 5  ? 
                                <MoreContainer onPress={()=> {navigation.navigate('ProCardBoxStack')}}>
                                    <MoreText>더보기</MoreText><MorePlus source={require("../images/more-plus-white.png")}/>
                                </MoreContainer>                 
                            :
                            null
                        }

                            </ScrollView>
                        :
                        <View/>
                        }
                        <OpenBtn style={{ width: 30, height: 30 }} source={require('../images/ico-OpenBtn.png')}/>
                    </ProCardBox>
                    {/* <SlideLeftBt><Image style={{ width: '100%' }} source={require('../images/ico-slide-left.png')}/></SlideLeftBt> */}
                    <SlideRightBt onPress={()=> {navigation.navigate("AnalysisSwingDetailSwipe")}}><Image style={{ width: '100%' }} source={require('../images/ico-slide-right.png')}/></SlideRightBt>
            </CommonBackground>
        
        </>
    )): <Loading/>
}



const ImageBox = styled.View`
    position : relative;
    margin: 0 20px;
    overflow: hidden;
`

const Image = styled.Image`
    flex: 1;
    align-items: center;
    width: 350px;
    height: 533px;
    border-radius: 16px;
    overflow: hidden;
`
const ConTit = styled.Text`
    padding: 0 20px;
    font-size: 20px;
    font-weight: 400;
    color: #1A1D1E;
`
const CommentBox = styled.View` 
    padding: 20px 20px 20px 20px;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
`
const CommentHead = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
`
const CommentTit = styled.Text`
    font-size: 16px;
    font-weight: 700;
`
const CommentScore = styled.View  `
    
`
const CommentText = styled.Text  `
    font-size: 12px;
    color: #6A6A6A;
    font-weight: 400;
`
const PageButtonBlue = styled.Text`
    position: absolute;
    bottom: 92px;
    left: 20px;
    /*width: 100%;*/
    right: 20px;
    padding: 20px 0;
    text-align: center;
    border-radius: 12px;
    background: #171C61;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`
const PageButtonOnBlue = styled.TouchableOpacity `
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    height:60px;
    margin: 40px 20px 20px 20px;
    text-align: center;
    border-radius: 12px;
    background: #171C61;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    color: #FFFFFF;
    font-weight: 600;
    font-size: 16px;
`
const ButtonText = styled.Text`
    color:#fff;
    text-align: center;
`
const ScoreTit = styled.Text`
    color: #1A1D1E;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -1px;
`
const ScoreDate = styled.Text`
    color: #1A1D1E;
    font-size: 14px;
    letter-spacing: -1px;
`
const SlideLeftBt = styled.TouchableOpacity`
    position: absolute;
    top: 50%;
    left: 10px;
    width: 34px;
    height: 34px;
    margin-top: -17px;
    z-index: 99999;
`
const SlideRightBt = styled.TouchableOpacity`
    position: absolute;
    top: 50%;
    right: 10px;
    width: 34px;
    height: 34px;
    margin-top: -17px;
    z-index: 99999;
`



export default MainTotalView;