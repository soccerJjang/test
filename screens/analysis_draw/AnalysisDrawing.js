import React from 'react';
import { View, Platform, FlatList, Image, Text } from 'react-native';
import {
    CommonBackground,
    GettingReady,
    TitLarge
} from '../../styled-components/Common';

import {
    DrawingContainer,
    AnalysisDrawingContainer,
    AnalysisDrawingLeft,
    AnalysisDrawingRight,
    ScoreBox,
    Score,
    ScoreDate,
    ScoreIcon,
    IcoStar,
    AiText,
} from '../../styled-components/analysis_draw/AnalysisDrawing';
import { article } from '../../api/article';
import * as SecureStore from 'expo-secure-store';
import { useQuery } from 'react-query';
import DrawingList from '../../components/DrawingList';
import Loading from '../../components/Laoding';

const AnalysisDrawing = (props) => {

    const [userData, setUserData] = React.useState(null); 
    const {isLoading, error, data} = useQuery(["drawingList", userData], article.analysisList, {enabled : !!userData} );   
    
    (async () => {
        const getUserData = await SecureStore.getItemAsync('userData').then();
        setUserData(JSON.parse(getUserData));

    })();

    if(!isLoading) {
        if(data && Array.isArray(data) && data.length > 0){
            return (
                <CommonBackground>
                    <DrawingContainer>
                        <TitLarge style={{ marginBottom: 24, marginLeft: 20 }}>보조선 그리기</TitLarge>
                        {userData != null ? <FlatList windowSize={1} data={data} keyExtractor={ (item, idx) => {return "DrawList" + item.id + idx} } renderItem={({item}) => <DrawingList key={"drawing" + item.id} data={item} />}/>  : null}            
                    </DrawingContainer>
                </CommonBackground>           
            )
        }else {

            return (
                <CommonBackground>
                    <DrawingContainer>
                        <TitLarge style={{ marginBottom: 24, marginLeft: 20 }}>보조선 그리기</TitLarge>
                        {
                        userData != null && data.success ? <FlatList windowSize={1} data={data} keyExtractor={ (item, idx) => {return "DrawList" + item.id + idx} } renderItem={({item}) => <DrawingList data={item} />}/>  
                        :                         
                        <GettingReady>
                            <Image style={{ width: 89, height: 89 }} source={ require("../../images/img-gettingReady.png")}/>
                            <Text style={{ marginTop: 26 , color: '#777', fontSize: 20, fontWeight: '700' }}>분석된 데이터가 없습니다.</Text>
                        </GettingReady>  
                        }
                    </DrawingContainer>
                </CommonBackground>           
            )
        }


    }else {

        return(
            <Loading/>
        )
    }

}
export default AnalysisDrawing;

/*
퍼블 Ver.
<AnalysisDrawingContainer onPress={() => {props.navigation.navigate('AnalysisDrawTab')}}  style={Platform.OS ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
    <AnalysisDrawingLeft>
    <ScoreBox>
        <Score>80점</Score>
        <View style={{ width: 7 }}></View>
        <ScoreDate>2022.02.13</ScoreDate>
    </ScoreBox>
    <ScoreIcon>
        <IcoStar source={require('../../images/ico-stars-yellow.png')}/>
        <IcoStar source={require('../../images/ico-stars-yellow.png')}/>
        <IcoStar source={require('../../images/ico-stars-yellow.png')}/>
        <IcoStar source={require('../../images/ico-stars-yellow.png')}/>
        <IcoStar source={require('../../images/ico-stars-gray.png')}/>
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

*/