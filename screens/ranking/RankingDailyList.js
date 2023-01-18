import { Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';


import { CommonBackground, CommonContainer, PageButton } from '../../styled-components/Common';
import { RankingWrap , RankingHeader , RankingGraph , RankingTab , RankingContent ,RankingPreface, RankingTriangle,PrefaceText,RankingHeaderTitle,RankingHeaderSub, Pentagon,GraphText1,GraphText2,GraphText3,GraphText4,GraphText5,RankingTabList,RankingTabListOn,RankingTabTextOn,RankingTabText,ListSilverTitle,ListBronzeTitle,RankingBasicBox,ListBasicTitle,ListBasicName,ListBasicPercent,ListName,ListPercent,ListGoldTitle, ListOrgTitle, ListRedTitle, ListBlackTitle, ListBrownTitle,ListPercentBox,ListTextBold, RankBoxImg,RankBox, RankBox2,RankTextBox, RankingTabMenu, RankTextBox2, ListName02, ListPercent2,
} from '../../styled-components/ranking/RankingDailyList';
import Plotly from 'react-native-plotly';
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import * as SecureStore from "expo-secure-store";
import Loading from '../../components/Laoding';


const RankingListContainer = styled.View`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 20px 0;
`;
const RankingBadge = styled.Text`
    position: absolute;
    background-color: #E63312;
    border-radius: 18px;
    padding: 8px 22px;
    overflow: hidden;
    color: #fff;
    font-size: 14;
    font-weight: 500;
`;

const RankingDailyList  = (props) => { 

    const navigation = useNavigation();
    const [dailyData, setDailyData] = useState(null);

    const [myData, setMyData] = useState(null);
    const [frontData, setFrontData] = useState([null, [0,0,0,0,0]]); 
    const [rearData, setRearData] = useState([null, [0,0,0,0,0]]);
    const [commentData, setCommentData] = useState(["분석데이터가 없습니다." , "No Result"]);
    const [loaded , setLoaded] = useState(false);

    const [rankingType, setRankingType] = useState("Front");
    const [sortedData, setSortedData] = useState(null)

    let routeName = navigation.getState().routeNames;
    let goScreen = (screenName) => {
        navigation.replace(screenName);
    }   

    React.useEffect( async ()=> {

        let type = props.route.name;
            type = type.toLowerCase();

        let userData = await SecureStore.getItemAsync('userData').then();
            userData = JSON.parse(userData);

        await fetch(`http://223.130.132.180:5008/ranking/one?type=${type}&userNo=${userData.user_no}`, {
            method : 'GET'
        }) 
        .then(res => res.json())
        .then((json) => {

            if(json.frontData.length > 0 ){
                
                setFrontData(json.frontData);   
                setCommentData(json.frontData[0]);                           
            }

            if(json.rearData.length > 0 ){
                setRearData(json.rearData);
            }

            let frontScore = 0;
            let rearScore = 0;
            if(json.frontAffinity[0].point != null) {
                frontScore = JSON.parse(json.frontAffinity[0].point).SUM
            }

            if(json.rearAffinity[0].point != null) {
                rearScore = JSON.parse(json.rearAffinity[0].point).SUM
            }

            if(frontScore >= rearScore) {

                setMyData({nickname : json.frontAffinity[0].nickname, affinity : JSON.parse(json.frontAffinity[0].affinity)})
                
            }else {

                setMyData({nickname : json.rearAffinity[0].nickname, affinity : JSON.parse(json.rearAffinity[0].affinity)})
            }
            
        });    

        //await fetch(`http://223.130.132.180:5008/ranking/list?type=${type}`, {            
        await fetch(`http://223.130.132.180:5008/ranking/list02?type=${type}&userNickname=${userData.nickname}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((json) => {                    
            if(json == null || json.status == 404){
                
            }else {                                                 
                setSortedData(json);
            }
        });

        setLoaded(true);

    }, [])


    if(loaded) {
        return (
            <RankingWrap showsVerticalScrollIndicator={false}>
                {/* ranking 분석도형 Start */} 
                <View style={{ backgroundColor: '#171C61'}}>
                    <RankingHeader>
                    <RankingBadge>{rankingType}</RankingBadge>
                    {/* <RankingPreface>
                        <RankingTriangle source={require("../../images/ico-triangle.png")}/>
                        <PrefaceText>1 Vulnerability</PrefaceText>
                    </RankingPreface> */}
                        <RankingHeaderTitle>
                            {commentData[0]}
                        </RankingHeaderTitle>
                        <RankingHeaderSub>
                            {commentData[1]}
                        </RankingHeaderSub>
                    </RankingHeader>
                    {/* Graph */}
                    <View style={{backgroundColor: '#171C61', height:220, marginTop: 20, marginBottom: 30}}>
                        <View style={{ height: 300}}>
                            <Swiper 
                                autoplay={false}
                                showsPagination={false}
                                showsButtons={true}
                                loop={false}                        
                                height={300}
                                onIndexChanged={(idx)=> {                            
                                    if(idx == 0 && frontData[0] != null ) {  
                                        setCommentData(frontData[0]);
                                    }else if(idx == 1 && rearData[0] != null){                                
                                        setCommentData(rearData[0]);
                                    }else {
                                        setCommentData(["분석데이터가 없습니다." , "No Result"]);
                                    }

                                    if(idx == 0) {
                                        setRankingType("Front");
                                    }else {
                                        setRankingType("Rear");
                                    }
                                }}
                            >
                                <Plotly 
                                data={
                                    [ // 차트에 들어갈 data를 먼저 지정해주고!
                                        {
                                            type: 'scatterpolar',
                                            r: [frontData[1][3], frontData[1][2], frontData[1][1], frontData[1][0], frontData[1][4]], // data
                                            theta: ['척추','팔','어깨', '머리', '골반'], // data category
                                            fill: 'toself', // fill option
                                            mode: 'lines',
                                            line: {
                                                color: '#5CEEA7'
                                            }
                                        }
                                    ]
                                
                                } 
                                config={{displayModeBar: false}}
                                layout = {
                                    {
                                        height: 350, // 원하는 크기로 height를 지정해주었다!
                                        margin: { // chart에는 기본값으로 margin이 적용되어 있는데, 우리가 흔히 아는 top, bottom, left와는 좀 다르다. 0으로 모두 초기화 해주었다.
                                            l: 0,
                                            r: 0,
                                            t: 20,
                                            d: 0,
                                        },
                                        
                                        polar: {
                                            bgcolor: "#171C61",
                                            radialaxis: { // 방사축이라는 의미인데 아래 그림에서 파란색으로 표시된 부분을 말한다!
                                                visible: true,
                                                range: [0, 100], // 0부터 시작해서 200까지 나타내게!
                                                color: '#777',
                                                showticklabels: false, // @1-1
                                                showline: false, // @1-2
                                                ticklen: 0, // @1-3
                                                gridcolor: "white",
                                            },
                                            angularaxis: {
                                                rotation: 210,
                                                color: '#FFFFFF',
                                                ticklen: 0, // @2-1
                                                tickfont: { // @2-2
                                                color: '#FFFFFF',
                                                size: 15,
                                                },
                                            },
                                            gridshape: 'linear', // @3
                                        },
                                        showlegend: false,
                                        paper_bgcolor: '#171C61',
                                    }
                                } 
                                debug enableFullPlotly />
                                <Plotly 
                                data={
                                    [ // 차트에 들어갈 data를 먼저 지정해주고!
                                        {
                                            type: 'scatterpolar',
                                            r: [rearData[1][3], rearData[1][2], rearData[1][1], rearData[1][0], rearData[1][4]], // data
                                            theta: ['골반','팔','어깨', '머리', '다리'], // data category
                                            fill: 'toself', // fill option
                                            mode: 'lines',
                                            line: {
                                                color: '#5CEEA7'
                                            }
                                        }
                                    ]
                                
                                } 
                                config={{displayModeBar: false}}
                                layout = {
                                    {
                                        height: 350, // 원하는 크기로 height를 지정해주었다!
                                        margin: { // chart에는 기본값으로 margin이 적용되어 있는데, 우리가 흔히 아는 top, bottom, left와는 좀 다르다. 0으로 모두 초기화 해주었다.
                                            l: 0,
                                            r: 0,
                                            t: 20,
                                            d: 0,
                                        },
                                        
                                        polar: {
                                            bgcolor: "#171C61",
                                            radialaxis: { // 방사축이라는 의미인데 아래 그림에서 파란색으로 표시된 부분을 말한다!
                                                visible: true,
                                                range: [0, 100], // 0부터 시작해서 200까지 나타내게!
                                                color: '#777',
                                                showticklabels: false, // @1-1
                                                showline: false, // @1-2
                                                ticklen: 0, // @1-3
                                                gridcolor: "white",
                                            },
                                            angularaxis: {
                                                rotation: 210,
                                                color: '#FFFFFF',
                                                ticklen: 0, // @2-1
                                                tickfont: { // @2-2
                                                color: '#FFFFFF',
                                                size: 15,
                                                },
                                            },
                                            gridshape: 'linear', // @3
                                        },
                                        showlegend: false,
                                        paper_bgcolor: '#171C61',
                                    }
                                } 
                                debug enableFullPlotly />
                            </Swiper>
                        </View>
                    </View>
                    {/* Tab */}
                    <RankingTab>
                        <RankingTabMenu onPress={() => goScreen(routeName[0])}>
                            {
                            (props.route.name == 'Daily')
                            ?<RankingTabListOn style={{  borderBottomColor:"#5ceea7",borderBottomWidth:4}}>
                                <RankingTabTextOn style={{color:"#5ceea7"}}>일간</RankingTabTextOn>
                            </RankingTabListOn>
                            :<RankingTabList>
                                <RankingTabText style={{color:"#FFFFFF"}}>일간</RankingTabText>
                            </RankingTabList>
                            }
                        </RankingTabMenu>
                        <RankingTabMenu onPress={() => goScreen(routeName[1])}>
                            {
                            (props.route.name == 'Weekly')
                            ?<RankingTabListOn style={{borderBottomColor:"#5ceea7",borderBottomWidth:4}}>
                                <RankingTabTextOn style={{color:"#5ceea7"}}>주간</RankingTabTextOn>
                            </RankingTabListOn>
                            :<RankingTabList>
                                <RankingTabText style={{color:"#FFFFFF"}}>주간</RankingTabText>
                            </RankingTabList>
                            }
                        </RankingTabMenu>
                        <RankingTabMenu onPress={() => goScreen(routeName[2])}>
                            {
                            (props.route.name == 'Monthly')
                            ?<RankingTabListOn style={{borderBottomColor:"#5ceea7",borderBottomWidth:4}}>
                                <RankingTabTextOn style={{color:"#5ceea7"}}>월간</RankingTabTextOn>
                            </RankingTabListOn>
                            :<RankingTabList>
                                <RankingTabText style={{color:"#FFFFFF"}}>월간</RankingTabText>
                            </RankingTabList> 
                            }
                        </RankingTabMenu>
                    </RankingTab>
                </View>
        {/* ranking 분석도형 End */}   
                <CommonBackground>
                        <RankingListContainer  style={{marginTop: -2}}>
                            <RankingContent style={{marginTop: 20}}> 

                                {                                 
                                    [1].map((test, idx) => {
                                        if(sortedData != null  && rankingType == 'Front' && sortedData.userFrontData != null ) {                                            
                                            const data = sortedData.userFrontData;   
                                            console.log(data.point.SUM);                                                                                     
                                            if(data.ranking == 0) {  
                                                return(
                                                    <View>
                                                        <RankBox bgColor={true} key={"myData" + idx}>
                                                            <RankBoxImg source={require("../../images/ico-gold.png")}/>
                                                            <RankTextBox>                                                                
                                                                <ListGoldTitle>RANK 01</ListGoldTitle>
                                                                <ListName style={{ maxWidth: 200 }} color={true}>{data.nickname}</ListName>
                                                                <ListPercent color={true}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "#fff"}}>{Math.floor(data.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>
                                                )
        
                                            }else if(data.ranking == 1) {
        
                                                return(

                                                    <View>
                                                        <RankBox bgColor={true} key={"myData" + idx}>
                                                            <RankBoxImg source={require("../../images/ico-silver.png")}/>
                                                            <RankTextBox>
                                                                <ListGoldTitle>RANK 02</ListGoldTitle>
                                                                <ListName style={{ maxWidth: 200 }} color={true}>{data.nickname}</ListName>
                                                                <ListPercent color={true}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "#fff"}}>{Math.floor(data.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>

                                                    // <RankBox key={"myData" + idx}>
                                                    //     <RankBoxImg source={require("../../images/ico-silver.png")}/>
                                                    //     <RankTextBox>
                                                    //         <ListSilverTitle>RANK 02</ListSilverTitle>
                                                    //         <ListName color={false}>{data.nickname}</ListName>
                                                    //         <ListPercent color={false}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                    //     </RankTextBox>
                                                    // </RankBox>   
                                                )
        
                                            }else if(data.ranking == 2) {
                                                return(

                                                    <View>
                                                        <RankBox bgColor={true} key={"myData" + idx}>
                                                            <RankBoxImg source={require("../../images/ico-bronze.png")}/>
                                                            <RankTextBox>
                                                                <ListGoldTitle>RANK 03</ListGoldTitle>
                                                                <ListName style={{ maxWidth: 200 }} color={true}>{data.nickname}</ListName>
                                                                <ListPercent color={true}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "#fff"}}>{Math.floor(data.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>

                                                    // <RankBox key={"myData" + idx}>
                                                    //     <RankBoxImg source={require("../../images/ico-bronze.png")}/>
                                                    //     <RankTextBox>
                                                    //         <ListBronzeTitle>RANK 03</ListBronzeTitle>
                                                    //         <ListName color={false}>{data.nickname}</ListName>
                                                    //         <ListPercent color={false}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                    //     </RankTextBox>
                                                    // </RankBox>   
                                                )
        
                                            }else {    
                                                return(
                                                    <View>
                                                        <RankBox2 bgColor={true} key={"myData" + idx}>
                                                            <RankTextBox>
                                                                <ListGoldTitle>RANK { data.ranking + 1  < 10 ? "0" + (data.ranking + 1) : data.ranking +1 }</ListGoldTitle>
                                                                <ListName style={{ maxWidth: 200 }} color={true}>{data.nickname}</ListName>
                                                                <ListPercent color={true}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "#fff"}}>{Math.floor(data.point.SUM)}점</Text></View>
                                                        </RankBox2>  
                                                    </View>
                                                )
                                            }                                                                                                                        
                                        }
                                        
                                        if(sortedData != null  && rankingType == 'Rear' && sortedData.userRearData != null ) {                                            
                                            const data = sortedData.userRearData;                                                                                        
                                            if(data.ranking == 0) {  
                                                return(
                                                    <View>
                                                        <RankBox bgColor={true} key={"myData" + idx}>
                                                            <RankBoxImg source={require("../../images/ico-gold.png")}/>
                                                            <RankTextBox>
                                                                <ListGoldTitle>RANK 01</ListGoldTitle>
                                                                <ListName style={{ maxWidth: 200 }} color={true}>{data.nickname}</ListName>
                                                                <ListPercent color={true}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "#fff" }}>{Math.floor(data.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>
                                                )
        
                                            }else if(data.ranking == 1) {
        
                                                return(
                                                    <View>
                                                        <RankBox bgColor={true} key={"myData" + idx}>
                                                            <RankBoxImg source={require("../../images/ico-silver.png")}/>
                                                            <RankTextBox>
                                                                <ListGoldTitle>RANK 02</ListGoldTitle>
                                                                <ListName style={{ maxWidth: 200 }} color={true}>{data.nickname}</ListName>
                                                                <ListPercent color={true}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "#fff" }}>{Math.floor(data.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>
                                                )
        
                                            }else if(data.ranking == 2) {
                                                return(
                                                    <View>
                                                        <RankBox bgColor={true} key={"myData" + idx}>
                                                            <RankBoxImg source={require("../../images/ico-bronze.png")}/>
                                                            <RankTextBox>
                                                                <ListGoldTitle>RANK 03</ListGoldTitle>
                                                                <ListName style={{ maxWidth: 200 }} color={true}>{data.nickname}</ListName>
                                                                <ListPercent color={true}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "#fff" }}>{Math.floor(data.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>
                                                )
        
                                            }else {    
                                                return(
                                                    <View>
                                                        <RankBox2 bgColor={true} key={"myData" + idx}>
                                                            <RankTextBox>
                                                                <ListGoldTitle>RANK { data.ranking +1 < 10 ? "0" + (data.ranking +1) : data.ranking + 1}</ListGoldTitle>
                                                                <ListName style={{ maxWidth: 200 }} color={true}>{data.nickname}</ListName>
                                                                <ListPercent color={true}>{data.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(data.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "#fff"}}>{Math.floor(data.point.SUM)}점</Text></View>
                                                        </RankBox2>  
                                                    </View>
                                                )
                                            }                                                                                                                        
                                        }
                                             
                                    })                               
                                }

                                {
                                    [1].map((test, test2) => {
                                        if(sortedData != null  && rankingType == 'Front' && sortedData.finalFrontList != null ) {
                                            
                                            const data = sortedData.finalFrontList;
                                            const myNickname = sortedData.userFrontData != null ? sortedData.userFrontData.nickname : null;
                                            
                                            let result = data.map((item, index)=> {
                                                if(index == 0 && item.nickname != myNickname ) {                                                    
                                                    return(
                                                        <View>
                                                            <RankBox bgColor={false} key={"RankingDaily" + index}>
                                                                <RankBoxImg source={require("../../images/ico-gold.png")}/>
                                                                <RankTextBox>
                                                                    <ListOrgTitle>RANK 01</ListOrgTitle>                                                                    
                                                                    <ListName style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName>
                                                                    <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                                </RankTextBox>
                                                                <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "black" }}>{Math.floor(item.point.SUM)}점</Text></View>
                                                            </RankBox> 
                                                        </View>
                                                        // <RankBox bgColor={false} key={"RankingDaily" + index}>
                                                        //     <RankBoxImg source={require("../../images/ico-gold.png")}/>
                                                        //     <RankTextBox>
                                                        //         <ListGoldTitle>RANK 01</ListGoldTitle>
                                                        //         <ListName color={false}>{item.nickname}</ListName>
                                                        //         <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                        //     </RankTextBox>
                                                        // </RankBox>  
                                                    )
            
                                                }else if(index == 1 && item.nickname != myNickname) {
            
                                                    return(


                                                    <View>
                                                        <RankBox bgColor={false} key={"RankingDaily" + index}>
                                                            <RankBoxImg source={require("../../images/ico-silver.png")}/>
                                                            <RankTextBox>
                                                                <ListRedTitle>RANK 02</ListRedTitle>                                                                    
                                                                <ListName style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName>
                                                                <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{ position : "absolute", right: 29, top: 31  }}><Text style={{ fontSize: 28, fontWeight: "600", color: "black"}}>{Math.floor(item.point.SUM)}점</Text></View>
                                                            {/* <View><Text style={{ fontSize: 28, fontWeight: "600", color: "black", position : "absolute", right: -39 }}>{Math.floor(item.point.SUM)}점</Text></View> */}
                                                        </RankBox> 
                                                    </View>
                                                        // <RankBox key={"RankingDaily" + index}>
                                                        //     <RankBoxImg source={require("../../images/ico-silver.png")}/>
                                                        //     <RankTextBox>
                                                        //         <ListSilverTitle>RANK 02</ListSilverTitle>
                                                        //         <ListName color={false}>{item.nickname}</ListName>
                                                        //         <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                        //     </RankTextBox>
                                                        // </RankBox>   
                                                    )
            
                                                }else if(index == 2 && item.nickname != myNickname) {
                                                    return(

                                                        <View>
                                                            <RankBox bgColor={false} key={"RankingDaily" + index}>
                                                                <RankBoxImg source={require("../../images/ico-bronze.png")}/>
                                                                <RankTextBox>
                                                                    <ListBronzeTitle>RANK 03</ListBronzeTitle>                                                                    
                                                                    <ListName style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName>
                                                                    <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                                </RankTextBox>
                                                                <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "black"}}>{Math.floor(item.point.SUM)}점</Text></View>
                                                            </RankBox> 
                                                        </View>
                                                        // <RankBox key={"RankingDaily" + index}>
                                                        //     <RankBoxImg source={require("../../images/ico-bronze.png")}/>
                                                        //     <RankTextBox>
                                                        //         <ListBronzeTitle>RANK 03</ListBronzeTitle>
                                                        //         <ListName color={false}>{item.nickname}</ListName>
                                                        //         <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                        //     </RankTextBox>
                                                        // </RankBox>   
                                                    )
            
                                                }else if(index < 10 && item.nickname != myNickname){    
                                                    return(

                                                        // <View>
                                                        //     <RankBox2 bgColor={false} key={"RankingDaily" + index}>
                                                        //         <RankTextBox>
                                                        //             <ListBasicTitle>RANK { index +1 < 10 ? "0" + (index + 1) : index + 1 }</ListBasicTitle>
                                                        //             <ListName style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName>
                                                        //             <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                        //         </RankTextBox>
                                                        //         <View><Text style={{ fontSize: 28, fontWeight: "600", color: "black", position:"absolute", right:0 }}>{Math.floor(item.point.SUM)}점</Text></View>
                                                        //     </RankBox2>  
                                                        // </View>


                                                        <View>
                                                            <RankBox2 bgColor={false} key={"RankingDaily" + index}>
                                                                <RankTextBox>
                                                                <ListBasicTitle>RANK { index +1 < 10 ? "0" + (index + 1) : index + 1 }</ListBasicTitle>
                                                                    <ListName02 style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName02>                                                                
                                                                    <ListPercent2 color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent2>                                                                                                                                        
                                                                </RankTextBox>
                                                                <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "black" }}>{Math.floor(item.point.SUM)}점</Text></View>
                                                            </RankBox2>  
                                                        </View>
                                                        // <RankingBasicBox key={"RankingDaily" + index}>
                                                        //     <ListBasicTitle>RANK { index +1 < 10 ? "0" + (index + 1) : index + 1 }</ListBasicTitle>
                                                        //     <ListBasicName>{item.nickname}</ListBasicName>
                                                        //     <ListPercentBox>
                                                        //         <ListBasicPercent>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListBasicPercent>                        
                                                        //     </ListPercentBox>    
                                                        // </RankingBasicBox>   
                                                    )
                                                }
                                            })                  

                                            return result;
                                        }                       
                                    })
                                }


{
                                    [1].map((test, test2) => {
                                        if(sortedData != null  && rankingType == 'Rear' && sortedData.finalRearList != null ) {
                                            
                                            const data = sortedData.finalRearList;
                                            const myNickname = sortedData.userRearData != null ? sortedData.userRearData.nickname : null;
                                            
                                            let result = data.map((item, index)=> {
                                                if(index == 0 && item.nickname != myNickname) {                                                    
                                                    return(

                                                        <View>
                                                        <RankBox bgColor={false} key={"RankingDaily" + index}>
                                                            <RankBoxImg source={require("../../images/ico-gold.png")}/>
                                                            <RankTextBox>
                                                                <ListOrgTitle>RANK 01</ListOrgTitle>                                                                    
                                                                <ListName style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName>
                                                                <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "black" }}>{Math.floor(item.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>
                                                        // <RankBox bgColor={false} key={"RankingDaily" + index}>
                                                        //     <RankBoxImg source={require("../../images/ico-gold.png")}/>
                                                        //     <RankTextBox>
                                                        //         <ListGoldTitle>RANK 01</ListGoldTitle>
                                                        //         <ListName color={false}>{item.nickname}</ListName>
                                                        //         <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={true}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                        //     </RankTextBox>
                                                        // </RankBox>  
                                                    )
            
                                                }else if(index == 1 && item.nickname != myNickname) {
            
                                                    return(

                                                        <View>
                                                        <RankBox bgColor={false} key={"RankingDaily" + index}>
                                                            <RankBoxImg source={require("../../images/ico-silver.png")}/>
                                                            <RankTextBox>
                                                                <ListRedTitle>RANK 02</ListRedTitle>                                                                    
                                                                <ListName style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName>
                                                                <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "black" }}>{Math.floor(item.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>
                                                        // <RankBox key={"RankingDaily" + index}>
                                                        //     <RankBoxImg source={require("../../images/ico-silver.png")}/>
                                                        //     <RankTextBox>
                                                        //         <ListSilverTitle>RANK 02</ListSilverTitle>
                                                        //         <ListName color={false}>{item.nickname}</ListName>
                                                        //         <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                        //     </RankTextBox>
                                                        // </RankBox>   
                                                    )
            
                                                }else if(index == 2 && item.nickname != myNickname) {
                                                    return(

                                                        <View>
                                                        <RankBox bgColor={false} key={"RankingDaily" + index}>
                                                            <RankBoxImg source={require("../../images/ico-bronze.png")}/>
                                                            <RankTextBox>
                                                                <ListBronzeTitle>RANK 03</ListBronzeTitle>                                                                    
                                                                <ListName style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName>
                                                                <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                            </RankTextBox>
                                                            <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "black" }}>{Math.floor(item.point.SUM)}점</Text></View>
                                                        </RankBox> 
                                                    </View>
                                                        // <RankBox key={"RankingDaily" + index}>
                                                        //     <RankBoxImg source={require("../../images/ico-bronze.png")}/>
                                                        //     <RankTextBox>
                                                        //         <ListBronzeTitle>RANK 03</ListBronzeTitle>
                                                        //         <ListName color={false}>{item.nickname}</ListName>
                                                        //         <ListPercent color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent>
                                                        //     </RankTextBox>
                                                        // </RankBox>   
                                                    )
            
                                                }else if(index < 10 && item.nickname != myNickname){    
                                                    return(


                                                        <View>
                                                            <RankBox2 bgColor={false} key={"RankingDaily" + index}>
                                                                <RankTextBox>
                                                                <ListBasicTitle>RANK { index +1 < 10 ? "0" + (index + 1) : index + 1 }</ListBasicTitle>
                                                                    <ListName02 style={{ maxWidth: 200 }} color={false}>{item.nickname}</ListName02>                                                                
                                                                    <ListPercent2 color={false}>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold color={false}>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListPercent2>                                                                                                                                        
                                                                </RankTextBox>
                                                                <View style={{position : "absolute", right: 29, top : 31 }}><Text style={{ fontSize: 28, fontWeight: "600", color: "black" }}>{Math.floor(item.point.SUM)}점</Text></View>
                                                            </RankBox2>  
                                                        </View>
                                                        // <RankingBasicBox key={"RankingDaily" + index}>
                                                        //     <ListBasicTitle>RANK { index +1 < 10 ? "0" + (index + 1) : index + 1 }</ListBasicTitle>
                                                        //     <ListBasicName>{item.nickname}</ListBasicName>
                                                        //     <ListPercentBox>
                                                        //         <ListBasicPercent>{item.affinity.nearest_pro_name}과(와) 유사율 <ListTextBold>{Math.floor(item.affinity.near_percentage)}%</ListTextBold></ListBasicPercent>                        
                                                        //     </ListPercentBox>    
                                                        // </RankingBasicBox>   
                                                    )
                                                }
                                            })                  

                                            return result;
                                        } 
                                    })
                                }

                                {
                                    sortedData == null ? 
                                            <Text>랭킹정보가 없습니다.</Text>
                                          :null                     
                                }
                            </RankingContent>
                        </RankingListContainer>                                            
                        
                </CommonBackground>
            </RankingWrap>
        )

    }else {
        return(
            <Loading/>
        )
    }
   
}



export default RankingDailyList; 