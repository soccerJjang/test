import React from "react";
import { View } from "react-native";
import { AiText, AnalysisDrawingContainer, AnalysisDrawingLeft, AnalysisDrawingRight, IcoStar, Score, ScoreBox, ScoreDate, ScoreIcon } from "../styled-components/analysis_draw/AnalysisDrawing";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const DrawingList = ({data}) => {
    const [bodyComments, setBodyComments] = React.useState(null);
    const [circleComments, setCircleComments] = React.useState(null);
    const [sceneComments, setSceneComments] = React.useState(null);
    const [totalComments, setTotalComments] = React.useState(null);

    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("AnalysisDrawRearTab", {             
            params : {
              ...data,
            }
        });
    };

    React.useEffect(() => {
        const analysisData = data;
        setBodyComments(JSON.parse(analysisData.body_score_comment));
        setCircleComments(JSON.parse(analysisData.circle_score_comment));
        setSceneComments(JSON.parse(analysisData.scene_score_comment));
        setTotalComments(JSON.parse(analysisData.total_score_comment));
    }, []);

    if(totalComments) {
        return (
            <AnalysisDrawingContainer 
                onPress={goToDetail}  
                style={Platform.OS ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisDrawingLeft>
                <ScoreBox>
                    <Score>{totalComments[1]}점</Score>
                    <View style={{ width: 7 }}></View>
                    <ScoreDate>{dateFormat(new Date(data.date))}</ScoreDate>
                </ScoreBox>
                <ScoreIcon>
                    {
                        [1,2,3,4,5].map( (item, idx) => {
                            if(idx <= totalComments[0]-1) {
                                return <IcoStar key = {item + "_" + idx} source = {require('../images/ico-stars-yellow.png')} />
                            } else {
                                return <IcoStar key={item + "_" + idx} source = {require('../images/ico-stars-gray.png')} />
                            }
                        })
                    }
                    </ScoreIcon>
                </AnalysisDrawingLeft>
                <AnalysisDrawingRight>
                <AiText>
                    AI 분석결과 요청
                    </AiText>
                    <View style={{ marginRight: 10 }}></View>
                <MaterialIcons name="keyboard-arrow-right" size={16} color="#171C61" />
                </AnalysisDrawingRight>
            </AnalysisDrawingContainer> 
        );
    } else {
        return null;
    }
};


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

export default DrawingList;