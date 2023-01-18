import React from 'react';
import { View, Text, Alert, Platform, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { 
    CommonBackground, 
    CommonContainer2,
    CommonContainer3,
} from '../../styled-components/Common';
import {
    AnalysisContainer,
    AnalysisBoxView,
    BoxTopView,
    BoxBottomView,
    AnalysisTouchView,
    TouchBox,
    ImageBox,
    Border,
    BottomText,
    ScoreBox,
    Score,
    ScoreDate,
    ScoreIcon,
    IcoStar,
    IcoPlus,
    FilterBox,
} from '../../styled-components/analysis_list/AnalysisList';
import {
    BoxShadow
} from '../../styled-components/analysis_list/AnalysisSwingRear';
import styled from "styled-components";
import * as SecureStore from 'expo-secure-store';
import { article } from '../../api/article';
import { useQuery } from 'react-query';
import MainList from '../../components/MainList';
import Config from 'react-native-config';
import Loading from '../../components/Laoding';
const Community = ({navigation}) => {
    const [userData, setUserData] = React.useState(null);
    React.useEffect(() => {
        (async () => {
            const getUserData = await SecureStore.getItemAsync('userData').then();
            setUserData(JSON.parse(getUserData));
    
        })();
    }, [])
    
    //const {isLoading, error, data} = useQuery(["mainList", userData], article.selectList, {enabled : !!userData} );   
    const {isLoading, error, data} = useQuery(["communityList", userData], article.selectCommunityList, {enabled : !!userData} );  

    if(!isLoading && data != null){

        return (
            <CommonBackground>
                <CommonContainer3>
                    {userData != null ? 
                        <>
                        <FlatList  windowSize={1} data={data} keyExtractor={(item) => "Community" + item.articleSeq} 
                            renderItem={
                                ({item}) => 
                                              
                                <>              
                                <BoxShadow style={{ marginLeft: 20, marginRight: 20, marginBottom: 25, borderRadius: 16, background: '#fff', elevation: 5, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 1 }, shadowRadius: 10 }}
                                           onPress={()=> {
                                                navigation.navigate('CommunityView', {
                                                    article : item,
                                                    userData : userData
                                                });
                                           }}
                                >
                                    <CommunityBox>
                                        <ConTit>{item.articleTitle}</ConTit>
                                        <ConWriter>{item.nickname}</ConWriter> 
                                        <ConEtc>
                                            <ConDate>{dateFormat(new Date(item.createDt))}</ConDate>
                                            {/* <Hits>조회수 200명</Hits> */}
                                            <Hits></Hits>
                                        </ConEtc>
                                        <ConIcon><MaterialIcons name="keyboard-arrow-right" size={24} color="black" /></ConIcon>
                                    </CommunityBox>
                                </BoxShadow>
                                </>
                            }
                        />
                        <AnalysisTouchView onPress={() => navigation.navigate("CommunityWrite")} >
                            <IcoPlus source={require('../../images/ico-plus.png')}/>                
                        </AnalysisTouchView>
                        </>
                    :
                        <>
                        </>  
                    }
                </CommonContainer3>
            </CommonBackground>
        )
        
    }else {
        return(
            <Loading/>
        )
    }

}

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



const CommunityBox = styled.View`
    position: relative;
    padding: 28px 28px 15px 30px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #eee;
    overflow: hidden;
`
const ConTit = styled.Text`
    margin-bottom: 14px;
    font-size: 20px;
    font-weight: 700;
    color: #000;
`
const ConWriter = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: #060606;
`
const ConEtc = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 17px;
`
const ConDate = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: #A8A8A8;
`
const Hits = styled.Text`
    margin-left: 50px;
    font-size: 12px;
    font-weight: 400;
    color: #A8A8A8;
`
const ConIcon = styled.View`
    position: absolute;
    top: 51px;
    right: 28px;
`
export default Community;
// 분석결과 이전 더미데이터 
//{userData != null ? <FlatList  windowSize={1} data={data} keyExtractor={(item) => "Analysist" + item.article_no} renderItem={({item}) => <MainList data={item} />}/>  : null}