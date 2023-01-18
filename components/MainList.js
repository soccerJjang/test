import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { article } from "../api/article";
import styled from "styled-components";
import { AnalysisBoxView, Border, BottomText, BoxBottomView, BoxTopView, IcoStar, ImageBox, Score, ScoreBox, ScoreDate, ScoreIcon } from "../styled-components/analysis_list/AnalysisList";

const MainList = ({userId, data, maxLength, proCardBoxList, isChecked}) => {    

    const [bodyComments, setBodyComments] = React.useState(null);
    const [circleComments, setCircleComments] = React.useState(null);
    const [sceneComments, setSceneComments] = React.useState(null);
    const [totalComments, setTotalComments] = React.useState(null);
     
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("AnalysisSwingTab", {userId, data, maxLength});
    };

    const deleteAnalysis = async (analysisId, imagePath) => {        
        const result = await article.deleteAnalysis(analysisId, imagePath);                        
        navigation.reset({routes: [{name: "AnalysisList", params: { isChecked }}]})
    }

    React.useEffect(() => {
        setBodyComments(JSON.parse(data.body_score_comment));
        setCircleComments(JSON.parse(data.circle_score_comment));
        setSceneComments(JSON.parse(data.scene_score_comment));
        setTotalComments(JSON.parse(data.total_score_comment));
    },[data]);
    
    if(data && totalComments) {
        return(
            <AnalysisBoxView
                style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <BoxTopView onPress={ goToDetail }>
                    <View>
                        <ScoreBox>
                            <Score>{totalComments[1]}점</Score>
                            <View style={{ width: 8 }}></View>
                            <ScoreDate>{dateFormat(new Date(data.date))}</ScoreDate>
                        </ScoreBox>
                        <ScoreIcon>
                            {
                                [1,2,3,4,5].map( (item, idx) => {
                                    if(totalComments[0] > idx){
                                        return <IcoStar key={ item + data.date + "_" +idx }  source={require('../images/ico-stars-yellow.png')}/>            
                                    }else{                                    
                                        return  <IcoStar key={item + data.date + "_" +idx} source={require('../images/ico-stars-gray.png')}/>            
                                    }
                                })
                            }    
                            
                        </ScoreIcon>
                    </View>
                    <View>
                        {                           
                            data.img_path == null ? <ImageBox source={require('../images/golf.png')} /> : 
                                <ImageBox source={{uri : "http://223.130.132.180:5008/screengo/" + data.img_path.replace(/\"/gi, "").replace("/home/dev1/data/screengo_api/", "") + "/frame_00_all.jpg"}} />
                        }                    
                    </View>
                </BoxTopView>
                <Border />
                <BoxBottomView>
                    <TouchableOpacity style={{ flex: 1 }} onPress={goToDetail}>
                        <BottomText style={{color:"#060606", fontSize:12 }}>
                            {
                                [1].map((item,idx) => {
                                    if(data.type == 'FD') {
                                        return "Front Driver"
                                    }else if(data.type == 'FI') {
                                        return "Front Iron"
                                    }else if(data.type == 'RD') {
                                        return "Rear Driver"
                                    }else if(data.type == 'RI') {
                                        return "Rear Iron"
                                    }                            
                                })
                            }
                        </BottomText>
                    </TouchableOpacity>
                    <Text style={{ color: "#EEEEEE", marginLeft: 10, marginRight:10}}>|</Text>
                    
                    

                    {/* <TouchableOpacity onPress={()=> {navigation.navigate("AnalysisSwingTab",  {data, maxLength, proCardBoxList, afterAdmob : false})}}> */}
                    <TouchableOpacity onPress={()=> {navigation.navigate("AnalysisSwingTab", { screen: "AIReport", userId, data, maxLength }) }}>
                        <BottomText style={{color:"#060606", fontSize:12}}>AI분석결과요청</BottomText>
                    </TouchableOpacity> 

                    <Text style={{ color: "#EEEEEE", marginLeft: 10, marginRight:10 }}>|</Text>
                

                    
                    <TouchableOpacity  style={{ flex: 1, textAlign : "center"}} 
                        onPress={()=> {
                            Alert.alert("정말 삭제하시겠습니까 ?", '',
                            [
                                {
                                text: "취소",
                                onPress: () => console.log("Cancel Pressed"),                              
                                },
                                { text: "삭제", onPress: () => deleteAnalysis(data.id, data.img_path) }
                            ])                        
                        }}>
                        <BottomText style={{color:"#060606", fontSize:12 }}>삭제</BottomText>
                    </TouchableOpacity>
                </BoxBottomView>
            </AnalysisBoxView>
        );
    } else {
        return null;
    }
};

function dateFormat(date) {
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



export default MainList;

