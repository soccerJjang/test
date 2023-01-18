import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Share, Text, View } from "react-native";
import styled from "styled-components";
import { DetailCloseBtn, OpenBtn, ProCardBadge, ProCardBox, ProCardTit, RearDetailBox, RearDetailButton, RearDetailText, RearDetailTit, ShotList, ShotListBox,  ShotListImg, ShotListName } from "../styled-components/analysis_list/AnalysisSwingRear";
import * as SecureStore from 'expo-secure-store';
import Loading from "./Laoding";
import { IcoStar, MoreContainer, MorePlus, MoreText } from "../styled-components/analysis_list/AnalysisList";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { procard } from "../api/procard";
import { article } from "../api/article";

const MainPartView = (props) => {
    const navigation = useNavigation();    
    
    const [proCard,  setProCard] = React.useState(false);
    const [proCardBoxList, setProCardBoxList] = React.useState([]);

    const [detailCard, setDetailCard] = React.useState(true);
    const [imagePath, setImagePath] = React.useState(null);
    const [shareImgPath, setShareImgPath] = React.useState(null);
    const [data, setData] = React.useState(props.data);
    const [commentOnOff, setCommnetOnOff] = React.useState([false,false,false,false])
    const [circleComment, setCircleComment] = React.useState(null);

    const [bodyComments, setBodyComments] = React.useState(null);
    const [sceneComments, setSceneComments] = React.useState(null);
    const [totalComments, setTotalComments] = React.useState(null);
    const [circleComments, setCircleComments] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            let userData = await SecureStore.getItemAsync('userData');
            userData = JSON.parse(userData);
            let userId = props.data.id;
            if(userId) {
                const resultData = await article.analysisView(userId)
                .then(res => {
                    const result = res;
                    setData({...result, type: props.data.type}); 
                    setBodyComments(JSON.parse(result.body_score_comment));
                    setSceneComments(JSON.parse(result.scene_score_comment));
                    setTotalComments(JSON.parse(result.total_score_comment));
                    setCircleComments(JSON.parse(result.circle_score_comment));

                    const type = props.type;                
                    const idx = props.idx * 2 < 10 ? "0" + props.idx * 2 : props.idx * 2;
                    const jpg = '/frame_'+idx+'_'+type+".jpg";
                    console.log(jpg);
                
                    let imgPath = result.img_path.replace("/home/dev1/data/screengo_api/", "");
                    
                    imgPath = imgPath.substring(1, imgPath.length -1);
                    imgPath = "/screengo/" + imgPath; 
                    imgPath = imgPath.replace(/\\/g, "/").replace(/\"/gi, "");
                    setShareImgPath(imgPath + jpg); // 공유 동그라미 뺀 이미지로
                    imgPath = imgPath + '/circle/' + jpg; // 0620 이미지경로 수정으로인한 수정     
                    setImagePath(imgPath);
                });
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
        });
    }, [navigation]);


    const pressCommnet = (index, text) => {
        let onOff = [...commentOnOff];
    
        onOff.map((item, idx) => {
            
            if(idx == index){
                onOff[idx] = !onOff[idx]                        
            }else {
                onOff[idx] = false;                
            }
        });
        
        setCircleComment(text);
        setCommnetOnOff(onOff)      
    }


    const shareImage = async () => {
        
        
        let all = '';
        await FileSystem.downloadAsync("http://223.130.132.180:5008" + shareImgPath, FileSystem.cacheDirectory + data.type + '.jpg')
        .then(data => {
            all = data.uri;
            console.log('Finishied all downloading to ', data.uri);
        })
        .catch(error => {
            console.error(error);
        })
        all = await FileSystem.getInfoAsync(all);
        let shareUri = all.uri;   
            
        Sharing.shareAsync(shareUri);

    };
    
    if(imagePath != null) {

        return(
            <BackgroundContainer>
                <BackgroundContainerInner>
                    <ScrollView style={{ paddingBottom: 100}}>
                    <ImageBox style={{marginTop:10}}>
                        <Image source={imagePath != null ?  {uri : "http://223.130.132.180:5008" + imagePath} : null} style={{width:"100%"}}/> 
                        {/*
                        <RearDetailButton onPress={() => setDetailCard(true)}>
                                    <Text style={{color: '#fff', fontSize: 14}}>상세평가보기</Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
                        </RearDetailButton>
                        */}
    
                        {
                            (detailCard)
                            ?
                            <>
                        <RearDetailBox style={{ elevation: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}> 
                        { !commentOnOff[0] && !commentOnOff[1] && !commentOnOff[2] && !commentOnOff[3] ?                                                 
                        null
                        :                         
                        <Text style={{ marginBottom: 18, fontSize: 14, color: '#fff' }}>{circleComment}</Text>
                        }
                        
                            {/* <RearDetailTit>{data.sceneScoresAndComments[data.type][1].substr(0, 4) + ".."}</RearDetailTit> */}
                            
                            <View style={{display:'flex', flexDirection: 'row', marginBottom: 9}}>
                                
                            {
                                    [1,2,3].map( (item, idx) => {
                                        if(item <= sceneComments[props.type][2]){
                                            return <IcoStar key={item + "_" +idx}  source={require('../images/ico-stars-yellow.png')}/>            
                                        }else{                                    
                                            return  <IcoStar key={item + "_" +idx} source={require('../images/ico-stars-gray.png')}/>            
                                        }
                                    })
                            }   
                            </View>
                            <RearDetailText>
                                {sceneComments[props.type][1]}
                            </RearDetailText>
                            {/* <DetailCloseBtn><AntDesign onPress={() => setDetailCard(false)} name="close" size={16} color="#fff" />닫기</DetailCloseBtn> */}
                        </RearDetailBox> 
                        
                        </>
                        :
                        <View />
                        }
                        <DetailCommentWrap>
                            
                            {
                          
                                Object.entries(circleComments[props.type]).map( (body, index) => {  

                                    let alphabetIndex = 'a';
                                    switch(index){
                                        case 1 : alphabetIndex = 'b'; break;
                                        case 2 : alphabetIndex = 'c'; break;
                                        case 3 : alphabetIndex = 'd'; break;
                                        case 4 : alphabetIndex = 'e'; break;
                                        case 5 : alphabetIndex = 'f'; break;
                                    }
                                    return (                                    
                                        <DetailCommentBox key={"comment" + props.type + index } onPress={()=> {pressCommnet(index, body[1].split("/")[0])}}> 
                                            <DetailCommentNum style={{ elevation: 15, shadowColor: "#000", backgroundColor: '#fff', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}><NumCircleOn><Text style={{ fontSize: 14, color: '#fff' }}>{alphabetIndex}</Text></NumCircleOn></DetailCommentNum>
                                            {/* {commentOnOff[index] ? 
                                                <DetailCommentCon style={{ display: 'flex', elevation: 15, shadowColor: "#000", backgroundColor: '#fff', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}><NumCircle style={{ marginBottom: 8 }}><Text style={{ fontSize: 10, color: '#fff' }}>{alphabetIndex}</Text></NumCircle>
                                                    <Text style={{ fontSize: 12, color: '#000' }}>{body[1].split("/")[0]}</Text>
                                                </DetailCommentCon>
                                                :
                                                <DetailCommentCon style={{ elevation: 15, shadowColor: "#000", backgroundColor: '#fff', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}><NumCircle style={{ marginBottom: 8 }}><Text style={{ fontSize: 10, color: '#fff' }}>{alphabetIndex}</Text></NumCircle>
                                                    <Text style={{ fontSize: 12, color: '#000' }}>{body[1].split("/")[0]}</Text>                                                    
                                                </DetailCommentCon>                                            
                                            }                                             */}
                                        </DetailCommentBox>                                    
                                    )
                                })                        
                            } 
                                  
                            <DetailCommentBox onPress={shareImage}> 
                                <DetailCommentNum style={{ elevation: 15, shadowColor: "#000", backgroundColor: '#fff', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}><ShareBox><Image style={{width: '100%', height : '100%'}}source={require("../images/analysis-share.png")}></Image></ShareBox></DetailCommentNum>
                            </DetailCommentBox>      
                        </DetailCommentWrap>
                    </ImageBox>
        </ScrollView>
                </BackgroundContainerInner>
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
                                                onPress={()=> navigation.replace("AnalysisSwingRearProCard", {proInfo : item, proCardBoxList, data : data})}
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
                    <SlideLeftBt onPress={()=> {navigation.navigate("AnalysisSwingDetail")}}><Image style={{ width: '100%' }} source={require('../images/ico-slide-left.png')}/></SlideLeftBt>
                    <SlideRightBt onPress={()=> {navigation.navigate("AnalysisSwingConfirmCard")}}><Image style={{ width: '100%' }} source={require('../images/ico-slide-right.png')}/></SlideRightBt>
            </BackgroundContainer>
        );

    }else {
        return(
            <Loading/>
        )
    }

}

const BackgroundContainer = styled.View`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
`;
const BackgroundContainerInner = styled.ScrollView`
    width: 100%;
`;
const ImageBox = styled.View`
    position : relative;
    margin: 0 20px;
    /*overflow: hidden;*/
`
const Image = styled.Image`
    flex: 1;
    align-items: center;
    width: 350px;
    height: 533px;
    border-radius: 16px;
    overflow: hidden;
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
const CommentTitBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Num = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 27px;
    height: 27px;
    margin-right: 10px;
    border-radius: 14px;
    background: #FF5D02;
`

const DetailCommentWrap = styled.View`
    position: absolute;
    right: 10px;
    bottom: 160px;
`
const DetailCommentBox = styled.TouchableOpacity`
    margin-bottom: 15px;
`
const DetailCommentNum = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background: #fff;
    border-radius: 5px;
`
const DetailCommentCon = styled.View`
    display: none;
    width: 290px;
    margin-top: -55px;
    padding: 15px 15px 28px;
    border-top-left-radius: 10px;
    background: #fff;
`
const NumCircle = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    background: #171C61;
`
const NumCircleOn = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    background: #FF5D02;
`
const SlideLeftBt = styled.TouchableOpacity`
    position: absolute;
    top: 40%;
    left: 10px;
    width: 34px;
    height: 34px;
    margin-top: -17px;
    z-index: 99999;
`
const SlideRightBt = styled.TouchableOpacity`
    position: absolute;
    top: 40%;
    right: 10px;
    width: 34px;
    height: 34px;
    margin-top: -17px;
    z-index: 99999;
`

const ShareBox = styled.View`
    width:30px;
    height: 30px;
`;
export default MainPartView;